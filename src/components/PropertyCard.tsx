import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  Property,
  categoryFor,
  isResidential,
  priceFor,
  statusFor,
} from "../data/property";
export function PropertyCard({
  property,
}: {
  property: Property;
  index?: number;
}) {
  return (
    <article className="property-card">
      <Link to={`/properties/${property.id}`} className="property-image">
        {property.images[0] ? (
          <img
            src={property.images[0]}
            alt={`${property.title} — ${property.location}${property.sample ? " (illustrative sample photography)" : ""}`}
            loading="lazy"
            width="600"
            height="450"
          />
        ) : (
          <span>Photography to be added</span>
        )}
        <span className="property-status">{statusFor(property)}</span>
        {property.featured && <span className="featured-tag">Featured</span>}
      </Link>
      <div className="property-card-body">
        <p className="eyebrow">{categoryFor(property.type)}</p>
        <h3>
          <Link to={`/properties/${property.id}`}>{property.title}</Link>
        </h3>
        <p className="property-location">
          <MapPin size={14} aria-hidden="true" />
          {property.location}
        </p>
        <div className="property-facts">
          {property.size ? (
            <span>{property.size.toLocaleString()} m²</span>
          ) : (
            <span>Area on request</span>
          )}
          {isResidential(property) && !!property.bedrooms && (
            <span>{property.bedrooms} bedrooms</span>
          )}
          {isResidential(property) &&
            !!(property.bathrooms || property.baths) && (
              <span>{property.bathrooms || property.baths} bathrooms</span>
            )}
        </div>
        <div className="property-card-bottom">
          <strong>{priceFor(property)}</strong>
          <Link to={`/properties/${property.id}`} className="text-link">
            View Property <ArrowUpRight size={15} />
          </Link>
        </div>
        {property.sample && (
          <p className="sample-label">Sample listing · details unverified</p>
        )}
      </div>
    </article>
  );
}
