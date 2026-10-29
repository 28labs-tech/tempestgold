import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { sendEnquiry } from "../api/enquiries";
import {
  CONSENT_VERSION,
  newsletterConsent,
  marketingConsent,
} from "../data/consent";
export function NewsletterForm() {
  const requestId = useRef(crypto.randomUUID());
  const [state, setState] = useState<"idle" | "sending" | "sent" | "captured">(
    "idle",
  );
  const [error, setError] = useState("");
  return (
    <form
      className="newsletter-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (state !== "idle") return;
        const form = event.currentTarget,
          data = new FormData(form);
        setState("sending");
        setError("");
        try {
          const result = await sendEnquiry({
            requestId: requestId.current,
            name: String(data.get("name")),
            email: String(data.get("email")),
            phone: "",
            service: "Newsletter",
            property: "",
            intent: "Newsletter subscription",
            message:
              "Please add me to the Tempest Gold newsletter mailing list.",
            consent: true,
            consentVersion: CONSENT_VERSION,
            consentTimestamp: new Date().toISOString(),
            marketingConsent: data.get("marketingConsent") === "on",
          });
          setState(result.status);
          form.reset();
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Subscription could not be submitted.",
          );
          setState("idle");
        }
      }}
    >
      <h2>Property intelligence, delivered</h2>
      <p>
        Subscribe for Tempest Gold research, market reports and property
        insights.
      </p>
      <div className="newsletter-fields">
        <label>
          Full name
          <input name="name" autoComplete="name" required minLength={2} />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <button className="button-gold" disabled={state !== "idle"}>
          {state === "sending" ? (
            "Submitting…"
          ) : state === "sent" ? (
            "Request received"
          ) : state === "captured" ? (
            "Test captured"
          ) : (
            <>
              Subscribe <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span>
          <strong>Required.</strong> {newsletterConsent}{" "}
          <Link to="/privacy">Privacy Notice</Link>
        </span>
      </label>
      <label className="consent-label">
        <input name="marketingConsent" type="checkbox" />
        <span>
          <strong>Optional.</strong> {marketingConsent}
        </span>
      </label>
      <p className="muted-small">
        Read the supplied{" "}
        <a
          href="/documents/Botswana-Data-Protection-Act.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Botswana Data Protection Act
        </a>
        .
      </p>
      {error && <p role="alert">{error}</p>}
      {state === "sent" && (
        <p role="status">Your subscription request has been submitted.</p>
      )}
      {state === "captured" && (
        <p role="status">
          Your test subscription was captured in the Mailtrap sandbox. It has
          not joined a live mailing list.
        </p>
      )}
      <p className="muted-small">
        To withdraw consent, email{" "}
        <a href="mailto:info@tempestgold.online?subject=Unsubscribe%20request">
          info@tempestgold.online
        </a>
        .
      </p>
    </form>
  );
}
