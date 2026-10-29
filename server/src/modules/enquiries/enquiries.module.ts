import {
  Module,
  Controller,
  Post,
  Body,
  Req,
  HttpException,
  Injectable,
  Inject,
  ServiceUnavailableException,
  ConflictException,
  OnModuleDestroy,
} from "@nestjs/common";
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  Equals,
  IsBoolean,
  IsISO8601,
} from "class-validator";
import { MongooseModule, InjectModel } from "@nestjs/mongoose";
import { Schema, Model } from "mongoose";
import nodemailer from "nodemailer";
import { createHash } from "node:crypto";
import type { Request } from "express";

export class EnquiryDto {
  @IsUUID() requestId: string;
  @IsString() @MinLength(2) @MaxLength(120) name: string;
  @IsEmail() @MaxLength(254) email: string;
  @IsString() @MaxLength(60) phone: string;
  @IsString() @MaxLength(160) service: string;
  @IsString() @MaxLength(240) property: string;
  @IsString() @MaxLength(120) intent: string;
  @IsString() @MinLength(3) @MaxLength(10000) message: string;
  @Equals(true) consent: boolean;
  @IsString() @MaxLength(80) consentVersion: string;
  @IsISO8601() consentTimestamp: string;
  @IsBoolean() marketingConsent: boolean;
}
const receiptSchema = new Schema({
  requestId: { type: String, unique: true, required: true },
  fingerprint: String,
  status: String,
  // Keep only delivery metadata, never the enquiry body, in the database.
  expiresAt: { type: Date, expires: 0 },
});
interface EmailReceipt {
  requestId: string;
  fingerprint: string;
  status: string;
  expiresAt: Date;
}
interface EnquiryConfig {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser?: string;
  smtpPassword?: string;
  emailFrom: string;
  enquiryTo: string;
}

function errorCode(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error
    ? (error as { code?: string | number }).code
    : undefined;
}

@Injectable()
export class EnquiriesService implements OnModuleDestroy {
  private transport: ReturnType<typeof nodemailer.createTransport>;
  constructor(
    @Inject("ENV_CONFIG") private config: EnquiryConfig,
    @InjectModel("EmailReceipt") private receipts: Model<EmailReceipt>,
  ) {
    const local = ["localhost", "127.0.0.1", "::1"].includes(config.smtpHost);
    this.transport = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      requireTLS: !local && !config.smtpSecure,
      auth: config.smtpUser
        ? { user: config.smtpUser, pass: config.smtpPassword }
        : undefined,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
  }
  onModuleDestroy() {
    this.transport.close();
  }
  async submit(data: EnquiryDto) {
    const status =
      this.config.smtpHost === "sandbox.smtp.mailtrap.io" ? "captured" : "sent";
    const local = ["localhost", "127.0.0.1", "::1"].includes(
      this.config.smtpHost,
    );
    if (
      !this.config.smtpHost ||
      !this.config.emailFrom ||
      !this.config.enquiryTo ||
      (!local && (!this.config.smtpUser || !this.config.smtpPassword))
    ) {
      throw new ServiceUnavailableException(
        "Email delivery is not configured yet. Please try again later.",
      );
    }
    const { requestId, ...payload } = data;
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex");
    try {
      await this.receipts.create({
        requestId,
        fingerprint,
        status: "sending",
        expiresAt: new Date(Date.now() + 86400000),
      });
    } catch (error: unknown) {
      if (errorCode(error) !== 11000) throw error;
      const previous = await this.receipts.findOne({ requestId }).lean();
      if (previous?.fingerprint !== fingerprint)
        throw new ConflictException(
          "This request reference was already used. Please refresh and submit again.",
        );
      if (previous?.status === "sent") return { status, reference: requestId };
      throw new ConflictException(
        "This enquiry is already being processed. Wait before trying again.",
      );
    }
    let accepted = false;
    try {
      const result = await this.transport.sendMail({
        from: this.config.emailFrom,
        to: this.config.enquiryTo,
        replyTo: { name: data.name, address: data.email },
        subject: `Website enquiry: ${data.intent.replace(/[\r\n]/g, " ")}${data.property ? ` — ${data.property.replace(/[\r\n]/g, " ")}` : ""}`,
        messageId: `<${requestId}@${this.config.emailFrom.split("@").pop()}>`,
        text: `Reference: ${requestId}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nService: ${data.service || "General enquiry"}\nProperty: ${data.property || "Not specified"}\nConsent version: ${data.consentVersion}\nConsent time: ${data.consentTimestamp}\nOptional marketing consent: ${data.marketingConsent ? "Yes" : "No"}\n\n${data.message}`,
      });
      if (!result.accepted?.length || result.rejected?.length)
        throw new Error("Recipient rejected");
      accepted = true;
      await this.receipts.updateOne({ requestId }, { status: "sent" });
      return { status, reference: requestId };
    } catch (error: unknown) {
      // Retain an uncertain receipt after SMTP acceptance to avoid duplicate mail.
      const uncertain =
        accepted ||
        ["ETIMEDOUT", "ESOCKET", "ECONNRESET"].includes(
          String(errorCode(error)),
        );
      if (!uncertain) await this.receipts.deleteOne({ requestId });
      throw new ServiceUnavailableException(
        uncertain
          ? "Delivery confirmation is uncertain. Please avoid resubmitting immediately and contact the team to check receipt."
          : "Email could not be sent. Your details are still in the form; please try again shortly.",
      );
    }
  }
}

@Controller("enquiries")
class EnquiriesController {
  private submissions = new Map<string, { count: number; until: number }>();
  constructor(private readonly enquiries: EnquiriesService) {}
  @Post() submit(@Body() data: EnquiryDto, @Req() request: Request) {
    const now = Date.now();
    for (const [key, value] of this.submissions)
      if (value.until < now) this.submissions.delete(key);
    const key = request.ip || "unknown";
    const bucket = this.submissions.get(key) || {
      count: 0,
      until: now + 600000,
    };
    if (bucket.count >= 5 || this.submissions.size >= 10000)
      throw new HttpException(
        "Too many enquiries. Please try again in ten minutes.",
        429,
      );
    bucket.count++;
    this.submissions.set(key, bucket);
    return this.enquiries.submit(data);
  }
}
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "EmailReceipt", schema: receiptSchema },
    ]),
  ],
  controllers: [EnquiriesController],
  providers: [EnquiriesService],
})
export class EnquiriesModule {}
