import { useCollection } from "../hooks/useCollection";
import { useMemo } from "react";

export const botswanaLocations = [
  "Gaborone",
  "Francistown",
  "Maun",
  "Kasane",
  "Mogoditshane",
  "Tlokweng",
  "Molepolole",
  "Serowe",
  "Palapye",
  "Kanye",
  "Ramotswa",
  "Letlhakane",
  "Orapa",
  "Mahalapye",
  "Mmopane",
  "Gabane",
  "Thamaga",
];

export interface Property {
  id: string;
  _id?: string;
  title: string;
  city: string;
  location: string;
  type: string;
  price?: number | null;
  price_monthly?: number | null;
  purpose: string;
  status?: string;
  size?: number;
  landArea?: number;
  buildingArea?: number;
  lettableArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  baths?: number;
  tenure?: string;
  intendedUse?: string;
  parking?: string;
  access?: string;
  zoning?: string;
  investment?: string;
  description: string;
  images: string[];
  amenities: string[];
  featured?: boolean;
  uses?: string[];
  createdAt?: string;
  views?: number;
  sample?: boolean;
}
export function categoryFor(type: string) {
  const value = type.toLowerCase();
  if (/mixed/.test(value)) return "Mixed-Use";
  if (/warehouse/.test(value)) return "Warehouse / Industrial";
  if (/industrial/.test(value)) return "Industrial";
  if (/office/.test(value)) return "Office";
  if (/retail/.test(value)) return "Retail";
  if (/commercial/.test(value)) return "Commercial";
  if (/land|plot/.test(value)) return "Development Land / Plots";
  if (/agricultural|farm/.test(value)) return "Agricultural";
  if (/hospitality|hotel|lodge/.test(value)) return "Hospitality";
  if (/residential|studio|villa|apartment|house/.test(value))
    return "Residential";
  return "Other";
}
export const isResidential = (p: Property) =>
  categoryFor(p.type) === "Residential";
export const isRental = (p: Property) => /to let|lease|rent/i.test(p.purpose);
export const amountFor = (p: Property) =>
  isRental(p) ? p.price_monthly : p.price;
export const priceFor = (p: Property) => {
  const amount = amountFor(p);
  return typeof amount === "number" && Number.isFinite(amount) && amount > 0
    ? `P ${amount.toLocaleString("en-BW")}${isRental(p) ? " / month" : ""}`
    : "POA";
};
export const statusFor = (p: Property) =>
  p.status ||
  (isRental(p)
    ? "To Let / For Lease"
    : p.purpose === "Development"
      ? "For Sale"
      : p.purpose);
export function useProperties() {
  const collection = useCollection<Property>("/properties");
  const items = useMemo(
    () =>
      collection.items.map((p) => ({
        ...p,
        id: p._id || p.id,
        city: p.city || p.location.split(",")[0].trim(),
        images: Array.isArray(p.images) ? p.images : [],
        amenities: Array.isArray(p.amenities) ? p.amenities : [],
        uses: Array.isArray(p.uses) ? p.uses : [],
        description: p.description || "",
      })),
    [collection.items],
  );
  return { ...collection, items, sample: false };
}
