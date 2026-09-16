import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { PropertyCard } from "../components/PropertyCard";
import { SampleNotice, EmptyState } from "../components/Consultancy";
import { propertyCategories, uses } from "../data/consultancy";
import { botswanaLocations } from "../data/mockData";
import {
  useProperties,
  amountFor,
  categoryFor,
  isRental,
  isResidential,
  statusFor,
} from "../data/property";
const statuses = [
  "For Sale",
  "To Let / For Lease",
  "Sold / Leased",
  "Sold",
  "Leased",
  "New Listing",
  "Featured",
];
export function Properties() {
  const [params, setParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const filterDialog = useRef<HTMLDivElement>(null);
  const filterTrigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
      if (e.key !== "Tab") return;
      const controls = filterDialog.current?.querySelectorAll<HTMLElement>(
        "button, a, input, select, summary",
      );
      const visible = Array.from(controls || []).filter(
        (el) => el.getClientRects().length > 0,
      );
      const first = visible[0],
        last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", listener);
      filterTrigger.current?.focus();
    };
  }, [mobileOpen]);
  const collection = useProperties();
  const value = (key: string) => params.get(key) || "";
  const change = (key: string, next: string) => {
    const updated = new URLSearchParams(params);
    if (next) updated.set(key, next);
    else updated.delete(key);
    setParams(updated, { replace: true });
  };
  const selectedTypes = params.getAll("types");
  const type = value("type") || selectedTypes[0] || "";
  const purpose = value("purpose");
  const location = value("location") || value("cities");
  const residentialOnly =
    type === "Residential" || /residential|studio/i.test(type);
  const locations = botswanaLocations.map(location => location.name).sort();
  const amenities = [
    ...new Set(collection.items.flatMap((p) => p.amenities)),
  ].sort();
  const selectedAmenities = params.getAll("amenities");
  const result = useMemo(() => {
    const number = (key: string) => {
      const raw = params.get(key);
      return raw && Number.isFinite(Number(raw)) ? Number(raw) : undefined;
    };
    const q = (params.get("q") || "").toLowerCase().trim();
    const cities = params.getAll("cities");
    const types = params.getAll("types");
    const status = params.get("status");
    const use = params.get("use");
    const minPrice = number("minPrice"),
      maxPrice = number("maxPrice"),
      minSize = number("minSize"),
      maxSize = number("maxSize");
    let items = collection.items.filter((p) => {
      const category = categoryFor(p.type);
      const actualPrice = amountFor(p);
      const area = p.size || p.lettableArea || p.buildingArea || p.landArea;
      if (
        q &&
        ![p.title, p.location, p.description, p.type, ...p.amenities]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (
        location === "Other"
          ? locations.includes(p.city)
          : (params.get("location") || cities.length <= 1) &&
            location &&
            !p.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (cities.length > 1 && !cities.includes(p.city)) return false;
      if (
        (params.get("type") || types.length <= 1) &&
        type &&
        type !== category &&
        type !== p.type
      )
        return false;
      if (
        types.length > 1 &&
        !types.includes(p.type) &&
        !types.includes(category)
      )
        return false;
      if (
        purpose &&
        (purpose === "To Let" ? !isRental(p) : p.purpose !== purpose)
      )
        return false;
      if (
        status === "Featured"
          ? !p.featured
          : status === "Sold / Leased"
            ? !/sold|leased/i.test(statusFor(p))
            : status && statusFor(p) !== status
      )
        return false;
      if (
        use &&
        !(p.uses || []).includes(use) &&
        !(use === "Sale" && p.purpose === "For Sale") &&
        !(use === "Rent / Lease" && isRental(p)) &&
        !(use === "Development" && p.purpose === "Development")
      )
        return false;
      if (
        (minPrice !== undefined || maxPrice !== undefined) &&
        (actualPrice == null ||
          actualPrice <= 0 ||
          (minPrice !== undefined && actualPrice < minPrice) ||
          (maxPrice !== undefined && actualPrice > maxPrice))
      )
        return false;
      if (
        (minSize !== undefined || maxSize !== undefined) &&
        (area == null ||
          (minSize !== undefined && area < minSize) ||
          (maxSize !== undefined && area > maxSize))
      )
        return false;
      if (
        residentialOnly &&
        isResidential(p) &&
        ((number("bedrooms") !== undefined &&
          (p.bedrooms || 0) < number("bedrooms")!) ||
          (number("bathrooms") !== undefined &&
            (p.bathrooms || p.baths || 0) < number("bathrooms")!))
      )
        return false;
      if (!params.getAll("amenities").every((a) => p.amenities.includes(a)))
        return false;
      return true;
    });
    const sort = params.get("sortBy") || "newest";
    items = items.sort((a, b) => {
      if (sort === "price-low" || sort === "price-high") {
        const av = amountFor(a),
          bv = amountFor(b);
        if (!av) return bv ? 1 : 0;
        if (!bv) return -1;
        return sort === "price-low" ? av - bv : bv - av;
      }
      if (sort === "featured")
        return Number(!!b.featured) - Number(!!a.featured);
      if (sort === "views") return (b.views || 0) - (a.views || 0);
      return a.createdAt && b.createdAt
        ? b.createdAt.localeCompare(a.createdAt)
        : Number(b.id) - Number(a.id);
    });
    return items;
  }, [
    collection.items,
    params,
    location,
    locations,
    purpose,
    residentialOnly,
    type,
  ]);
  const field = (
    key: string,
    label: string,
    options: string[],
    selected = value(key),
  ) => (
    <label className="filter-field">
      {label}
      <select
        value={selected}
        onChange={(e) => {
          if (key === "type") {
            const updated = new URLSearchParams(params);
            updated.delete("types");
            updated.delete("bedrooms");
            updated.delete("bathrooms");
            if (e.target.value) updated.set("type", e.target.value);
            else updated.delete("type");
            setParams(updated, { replace: true });
          } else if (key === "location") {
            const updated = new URLSearchParams(params);
            updated.delete("cities");
            if (e.target.value) updated.set(key, e.target.value);
            else updated.delete(key);
            setParams(updated, { replace: true });
          } else change(key, e.target.value);
        }}
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
  const filters = (
    <>
      <div className="filter-heading">
        <h2>Property filters</h2>
        <button
          onClick={() => setParams(new URLSearchParams(), { replace: true })}
          className="text-link"
        >
          Reset
        </button>
      </div>
      <label className="filter-field">
        Currency
        <select value="BWP" onChange={() => {}}>
          <option value="BWP">BWP / P — Botswana Pula</option>
        </select>
      </label>
      {field("location", "Location", [...locations, "Other"], location)}
      <label className="filter-field">
        Search another location
        <input
          value={location === "Other" ? "" : location}
          onChange={(e) => {
            const updated = new URLSearchParams(params);
            updated.delete("cities");
            if (e.target.value) updated.set("location", e.target.value);
            else updated.delete("location");
            setParams(updated, { replace: true });
          }}
          placeholder="Area or location"
        />
      </label>
      {field("type", "Property type", propertyCategories, type)}
      {field("use", "Purpose / Use", uses)}
      <label className="filter-field">
        Transaction
        <select
          value={purpose}
          onChange={(e) => change("purpose", e.target.value)}
        >
          <option value="">Sale & lease</option>
          <option value="For Sale">For Sale</option>
          <option value="To Let">Rent / Lease</option>
          <option value="Development">Development</option>
        </select>
      </label>
      {field("status", "Status", statuses)}
      <fieldset>
        <legend>Price range (P)</legend>
        <div className="range-fields">
          {["minPrice", "maxPrice"].map((k, i) => (
            <label key={k}>
              {i ? "Maximum" : "Minimum"}
              <input
                type="number"
                min="0"
                value={value(k)}
                onChange={(e) => change(k, e.target.value)}
                placeholder="Any"
              />
            </label>
          ))}
        </div>
        <p className="muted-small">
          Rental prices are monthly. POA listings remain available without price
          filters.
        </p>
      </fieldset>
      <fieldset>
        <legend>Area (m²)</legend>
        <div className="range-fields">
          {["minSize", "maxSize"].map((k, i) => (
            <label key={k}>
              {i ? "Maximum" : "Minimum"}
              <input
                type="number"
                min="0"
                value={value(k)}
                onChange={(e) => change(k, e.target.value)}
                placeholder="Any"
              />
            </label>
          ))}
        </div>
      </fieldset>
      {residentialOnly && (
        <fieldset>
          <legend>Residential details</legend>
          <div className="range-fields">
            {["bedrooms", "bathrooms"].map((k) => (
              <label key={k}>
                Minimum {k}
                <input
                  type="number"
                  min="0"
                  value={value(k)}
                  onChange={(e) => change(k, e.target.value)}
                />
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <details className="amenity-filters">
        <summary>Features & amenities</summary>
        {amenities.map((a) => (
          <label key={a}>
            <input
              type="checkbox"
              checked={selectedAmenities.includes(a)}
              onChange={() => {
                const updated = new URLSearchParams(params);
                updated.delete("amenities");
                const next = selectedAmenities.includes(a)
                  ? selectedAmenities.filter((v) => v !== a)
                  : [...selectedAmenities, a];
                next.forEach((v) => updated.append("amenities", v));
                setParams(updated, { replace: true });
              }}
            />
            {a}
          </label>
        ))}
      </details>
      <Link to="/contact" className="text-link">
        Speak to an Adviser →
      </Link>
    </>
  );
  return (
    <>
      <SeoHead
        title="Properties Botswana | Residential & Commercial | Tempest Gold Property"
        description="Explore residential, commercial, industrial and other Botswana property assets. Filter by location, type, purpose, status, Pula price and area."
        url="/properties"
      />
      <section className="page-intro site-container compact-intro">
        <p className="eyebrow">Properties</p>
        <h1>
          Your next
          <br />
          <em>property opportunity.</em>
        </h1>
        <p>
          Explore property assets across Botswana. Find the details that matter,
          and speak to an adviser about your next step.
        </p>
      </section>
      <section className="site-container property-browser">
        {collection.sample && <SampleNotice />}
        <div className="property-browser-layout">
          <aside className="desktop-filters">{filters}</aside>
          <div className="property-results">
            <div className="results-toolbar">
              <label>
                Keyword search
                <input
                  value={value("q")}
                  onChange={(e) => change("q", e.target.value)}
                  placeholder="Area, property name, development or feature"
                />
              </label>
              <label>
                Sort by
                <select
                  value={value("sortBy") || "newest"}
                  onChange={(e) => change("sortBy", e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="featured">Featured first</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="views">Most viewed</option>
                </select>
              </label>
              <button
                className="button-outline mobile-filter-toggle"
                onClick={(e) => {
                  filterTrigger.current = e.currentTarget;
                  setMobileOpen(true);
                }}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
            <p className="result-count" aria-live="polite">
              {collection.loading
                ? "Loading properties…"
                : `${result.length} ${collection.sample ? "sample listings" : "properties"}`}
            </p>
            {!collection.loading &&
              (result.length ? (
                <div className="property-grid results-grid">
                  {result.map((p) => (
                    <PropertyCard property={p} key={p.id} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No properties match these filters"
                  text="Adjust your filters or discuss your requirements with an adviser. Availability and property details should be confirmed before a decision."
                />
              ))}
          </div>
        </div>
      </section>
      {mobileOpen && (
        <div
          ref={filterDialog}
          className="filter-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Property filters"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
        >
          <div>
            <button
              autoFocus
              className="filter-close"
              aria-label="Close filters"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
            {filters}
            <button
              className="button-gold"
              onClick={() => setMobileOpen(false)}
            >
              Show {result.length} {result.length === 1 ? "result" : "results"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
