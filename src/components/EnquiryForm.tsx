import { useId, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../data/consultancy";
import { sendEnquiry } from "../api/enquiries";
import {
  CONSENT_VERSION,
  enquiryConsent,
  marketingConsent,
} from "../data/consent";
export function EnquiryForm({
  property,
  service = "",
  intent = "Request Details",
}: {
  property?: string;
  service?: string;
  intent?: string;
}) {
  const id = useId();
  const [prepared, setPrepared] = useState(false);
  const [reference, setReference] = useState("");
  const [captured, setCaptured] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef(crypto.randomUUID());
  return (
    <form
      className="enquiry-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (sending || prepared) return;
        setSending(true);
        setError("");
        try {
          const result = await sendEnquiry({
            requestId: requestId.current,
            name: String(data.get("name")).trim(),
            email: String(data.get("email")).trim(),
            phone: String(data.get("phone") || ""),
            service: String(data.get("service") || service),
            property: property || "",
            intent,
            message: String(data.get("message") || ""),
            consent: true,
            consentVersion: CONSENT_VERSION,
            consentTimestamp: new Date().toISOString(),
            marketingConsent: data.get("marketingConsent") === "on",
          });
          setReference(result.reference);
          setCaptured(result.status === "captured");
          setPrepared(true);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Unable to send enquiry.",
          );
        } finally {
          setSending(false);
        }
      }}
    >
      <label htmlFor={`${id}-name`}>Full name</label>
      <input id={`${id}-name`} name="name" autoComplete="name" required />
      <label htmlFor={`${id}-email`}>Email address</label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <label htmlFor={`${id}-phone`}>Phone number (optional)</label>
      <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" />
      <label htmlFor={`${id}-service`}>Service</label>
      <select id={`${id}-service`} name="service" defaultValue={service}>
        <option value="">General property enquiry</option>
        {service && !services.some((s) => s.title === service) && (
          <option>{service}</option>
        )}
        {services.map((s) => (
          <option key={s.slug}>{s.title}</option>
        ))}
      </select>
      <label htmlFor={`${id}-message`}>Your property needs</label>
      <textarea
        id={`${id}-message`}
        name="message"
        rows={4}
        required
        defaultValue={
          property
            ? `I would like to ${intent.toLowerCase()} for ${property}.`
            : ""
        }
      />
      <p className="muted-small">
        Your name, contact details and message are used to respond to your
        enquiry. Submit this form to email the property advisory team.
        <Link to="/privacy"> Read the privacy notice.</Link>
      </p>
      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span>
          <strong>Required.</strong> {enquiryConsent}{" "}
          <Link to="/privacy">Privacy Notice</Link>
        </span>
      </label>
      <label className="consent-label">
        <input name="marketingConsent" type="checkbox" />
        <span>
          <strong>Optional.</strong> {marketingConsent}
        </span>
      </label>
      <button
        className="button-gold"
        type="submit"
        disabled={sending || prepared}
      >
        {sending
          ? "Sending…"
          : prepared
            ? "Enquiry sent"
            : intent === "Request Details" && !property
              ? "Request a Consultation"
              : intent}{" "}
        <ArrowRight size={17} />
      </button>
      {error && <p role="alert">{error}</p>}
      {prepared && (
        <div role="status" className="draft-result">
          <strong>
            {captured
              ? "Test enquiry captured in Mailtrap."
              : "Your enquiry was accepted by our email server."}
          </strong>
          <p>
            Reference: {reference}.{" "}
            {captured
              ? "This is sandbox testing; no live mailbox received your enquiry."
              : "An adviser can reply to the email address you provided."}
          </p>
        </div>
      )}
    </form>
  );
}
