import { Module, Global } from "@nestjs/common";

@Global()
@Module({
  providers: [
    {
      provide: "ENV_CONFIG",
      useFactory: () => {
        const emailAddress = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
        for (const key of ["EMAIL_FROM", "ENQUIRY_TO"]) {
          if (process.env[key] && !emailAddress.test(process.env[key]!))
            throw new Error(`${key} must be a single plain email address.`);
        }
        if (
          process.env.SMTP_PORT &&
          (!Number.isInteger(Number(process.env.SMTP_PORT)) ||
            Number(process.env.SMTP_PORT) < 1 ||
            Number(process.env.SMTP_PORT) > 65535)
        )
          throw new Error("SMTP_PORT is invalid.");
        if (
          !process.env.JWT_SECRET ||
          process.env.JWT_SECRET.length < 32 ||
          !process.env.ADMIN_EMAIL ||
          !process.env.ADMIN_PASSWORD ||
          process.env.ADMIN_PASSWORD.length < 16
        ) {
          throw new Error(
            "Configure JWT_SECRET (32+ characters), ADMIN_EMAIL and ADMIN_PASSWORD (16+ characters) in server/.env.",
          );
        }
        return {
          mongoUri:
            process.env.MONGO_URI || "mongodb://localhost:27017/tempestgold",
          jwtSecret: process.env.JWT_SECRET,
          adminEmail: process.env.ADMIN_EMAIL,
          adminPassword: process.env.ADMIN_PASSWORD,
          smtpHost: process.env.SMTP_HOST || "",
          smtpPort: Number(process.env.SMTP_PORT || 587),
          smtpSecure: process.env.SMTP_SECURE === "true",
          smtpUser: process.env.SMTP_USER || "",
          smtpPassword: process.env.SMTP_PASSWORD || "",
          emailFrom: process.env.EMAIL_FROM || "",
          enquiryTo: process.env.ENQUIRY_TO || "",
          cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
          cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
          cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
          cloudinaryFolder: process.env.CLOUDINARY_FOLDER || "tempestgold",
        };
      },
    },
  ],
  exports: ["ENV_CONFIG"],
})
export class ConfigModule {}
