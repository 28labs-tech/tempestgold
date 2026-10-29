import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Check,
} from "lucide-react";
import {
  useProperties,
  isResidential,
  priceFor,
  statusFor,
  categoryFor,
} from "../data/property";
import { SeoHead } from "../components/SeoHead";
import { EmptyState } from "../components/Consultancy";
import { EnquiryForm } from "../components/EnquiryForm";
export function PropertyDetail() {
  const { id } = useParams();
  const collection = useProperties();
  const property = collection.items.find((p) => p.id === id);
  const [image, setImage] = useState<number | null>(null);
  const [intent, setIntent] = useState("Request Details");
  const dialog = useRef<HTMLDivElement>(null);
  const galleryTrigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    setImage(null);
  }, [id]);
  useEffect(() => {
    if (image === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("button")?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImage(null);
      if (e.key === "ArrowRight" && property?.images.length)
        setImage((i) => (i === null ? null : (i + 1) % property.images.length));
      if (e.key === "ArrowLeft" && property?.images.length)
        setImage((i) =>
          i === null
            ? null
            : (i - 1 + property.images.length) % property.images.length,
        );
      if (e.key === "Tab") {
        const buttons = dialog.current?.querySelectorAll<HTMLElement>("button");
        if (!buttons?.length) return;
        if (e.shiftKey && document.activeElement === buttons[0]) {
          e.preventDefault();
          buttons[buttons.length - 1].focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === buttons[buttons.length - 1]
        ) {
          e.preventDefault();
          buttons[0].focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
      galleryTrigger.current?.focus();
    };
  }, [image !== null, property]);
  if (collection.loading)
    return (
      <div className="page-intro site-container" role="status">
        Loading property…
      </div>
    );
  if (!property)
    return (
      <div className="page-intro site-container">
        <SeoHead
          title="Property not found | Tempest Gold Property"
          description="Explore other Botswana properties or discuss your requirements with an adviser."
          noIndex
        />
        <EmptyState
          title="Property not found"
          text="This listing may have been removed or is not available."
        />
        <Link to="/properties" className="text-link">
          Explore Properties →
        </Link>
      </div>
    );
  const details: [string, string | number | undefined][] = [
    ["Property type", categoryFor(property.type)],
    ["Status", statusFor(property)],
    ["Property size (m²)", property.size],
    ["Land area (m²)", property.landArea],
    ["Building area (m²)", property.buildingArea],
    ["Tenure", property.tenure],
  ];
  if (isResidential(property))
    details.push(
      ["Bedrooms", property.bedrooms],
      ["Bathrooms", property.bathrooms || property.baths],
    );
  else
    details.push(
      ["Lettable area (m²)", property.lettableArea],
      ["Intended use", property.intendedUse],
      ["Parking", property.parking],
      ["Access", property.access],
      ["Verified zoning / land use", property.zoning],
      ["Investment characteristics", property.investment],
    );
  const enquire = (next: string) => {
    setIntent(next);
    document
      .getElementById("property-enquiry")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <SeoHead
        title={`${property.title} | ${property.location} | Tempest Gold Property`}
        description={
          property.description.slice(0, 160) ||
          `Explore ${property.title} in ${property.location}. Request details or arrange a viewing.`
        }
        image={property.images[0]}
        url={`/properties/${id}`}
        noIndex={property.sample}
      />
      <section className="property-detail site-container">
        <Link to="/properties" className="text-link">
          <ArrowLeft size={16} />
          Back to Properties
        </Link>
        <div className="detail-heading">
          <div>
            <p className="eyebrow">{categoryFor(property.type)}</p>
            <h1>{property.title}</h1>
            <p className="property-location">
              <MapPin size={16} />
              {property.location}
            </p>
          </div>
          <div>
            <p className="property-status-inline">
              {statusFor(property).toUpperCase()}
            </p>
            <strong className="detail-price">{priceFor(property)}</strong>
          </div>
        </div>
        <div
          className={`detail-gallery ${property.images.length <= 1 ? "single-image" : ""}`}
        >
          {property.images.length ? (
            property.images.slice(0, 3).map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={(e) => {
                  galleryTrigger.current = e.currentTarget;
                  setImage(i);
                }}
                aria-label={`Open photo ${i + 1} of ${property.title}`}
              >
                <img
                  src={src}
                  alt={`${property.title}, photo ${i + 1}${property.sample ? " — illustrative sample" : ""}`}
                  loading={i ? "lazy" : "eager"}
                  width="1000"
                  height="700"
                />
              </button>
            ))
          ) : (
            <div className="empty-state">No photography is available for this property.</div>
          )}
        </div>
        {property.images.length > 0 && (
          <button
            className="text-link gallery-count"
            onClick={(e) => {
              galleryTrigger.current = e.currentTarget;
              setImage(0);
            }}
          >
            View all {property.images.length} photos →
          </button>
        )}
        <div className="detail-layout">
          <div>
            <h2>Property overview</h2>
            <dl className="property-specifications">
              {details
                .filter(([, v]) => v !== undefined && v !== "")
                .map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
            </dl>
            {!isResidential(property) && (
              <p className="muted-small">
                Only supplied details are shown. Ask an adviser to confirm
                lettable area, use, access, tenure, zoning and investment
                information before proceeding.
              </p>
            )}
            <h2>Property description</h2>
            <p className="property-description">
              {property.description ||
                "A detailed property description is available on request."}
            </p>
            <h2>Key features</h2>
            {property.amenities.length ? (
              <ul className="property-features">
                {property.amenities.map((a) => (
                  <li key={a}>
                    <Check size={16} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Request the full specification from an adviser.</p>
            )}
            <div className="button-row">
              <button
                onClick={() => enquire("Request Details")}
                className="button-outline"
              >
                Request Details
              </button>
              <button
                onClick={() => enquire("Arrange a Viewing")}
                className="button-outline"
              >
                Arrange a Viewing
              </button>
              <Link
                to={`/contact?property=${encodeURIComponent(property.title)}&intent=Speak%20to%20an%20Adviser`}
                className="text-link"
              >
                Speak to an Adviser <ArrowRight size={16} />
              </Link>
            </div>
            <p className="muted-small">
              Prices, availability, measurements and listing information require
              confirmation.{" "}
              <Link to="/property-disclaimer">
                Read the property disclaimer.
              </Link>
            </p>
          </div>
          <aside className="info-panel detail-enquiry" id="property-enquiry">
            <p className="eyebrow">Your next step</p>
            <h2>{intent}</h2>
            <p>
              {priceFor(property) === "POA"
                ? "Price on application. You can still request details or arrange a viewing."
                : "Discuss availability and the details that matter to your decision."}
            </p>
            <EnquiryForm
              key={intent}
              property={`${property.title}, ${property.location}`}
              intent={intent}
            />
          </aside>
        </div>
      </section>
      <div className="mobile-enquiry-bar">
        <button
          className="button-gold"
          onClick={() => enquire("Request Details")}
        >
          Request Details <ArrowRight size={16} />
        </button>
        <button
          className="button-outline"
          onClick={() => enquire("Arrange a Viewing")}
        >
          Arrange a Viewing
        </button>
      </div>
      {image !== null && (
        <div
          className="gallery-modal"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`Photos of ${property.title}`}
        >
          <button
            className="gallery-close"
            aria-label="Close gallery"
            onClick={() => setImage(null)}
          >
            <X />
          </button>
          <p aria-live="polite">
            {image + 1} / {property.images.length}
          </p>
          <div className="gallery-stage">
            <button
              aria-label="Previous photo"
              onClick={() =>
                setImage(
                  (image - 1 + property.images.length) % property.images.length,
                )
              }
            >
              <ChevronLeft />
            </button>
            <img
              src={property.images[image]}
              alt={`${property.title}, photo ${image + 1}`}
            />
            <button
              aria-label="Next photo"
              onClick={() => setImage((image + 1) % property.images.length)}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="gallery-thumbnails">
            {property.images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={image === i}
                onClick={() => setImage(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
