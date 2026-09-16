import { AdminDataTable } from "../../components/AdminDataTable";
const columns = [
  { key: "title", label: "Title" },
  { key: "location", label: "Location" },
  {
    key: "price",
    label: "Sale price (P)",
    render: (v: unknown) =>
      Number(v) > 0 ? `P ${Number(v).toLocaleString()}` : "POA",
  },
  {
    key: "price_monthly",
    label: "Monthly rent (P)",
    render: (v: unknown) =>
      Number(v) > 0 ? `P ${Number(v).toLocaleString()}` : "POA",
  },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
];
const fields = [
  { key: "title", label: "Title", type: "text" as const },
  { key: "location", label: "Location", type: "text" as const },
  { key: "city", label: "City / Area", type: "text" as const },
  {
    key: "price",
    label: "Sale price (P) — leave empty for POA",
    type: "number" as const,
  },
  {
    key: "price_monthly",
    label: "Monthly rental price (P) — leave empty for POA",
    type: "number" as const,
  },
  {
    key: "type",
    label: "Property type",
    type: "text" as const,
    placeholder:
      "Residential, Commercial, Industrial, Agricultural, Hospitality, Mixed-Use, Development Land / Plots, Office, Retail, Warehouse / Industrial, Other",
  },
  {
    key: "purpose",
    label: "Transaction",
    type: "text" as const,
    placeholder: "For Sale, To Let, Development",
  },
  {
    key: "uses",
    label: "Purpose / Use (comma-separated)",
    type: "textarea" as const,
    placeholder:
      "Sale, Rent / Lease, Investment, Development, Owner Occupation, Commercial Use, Other",
  },
  {
    key: "status",
    label: "Status",
    type: "text" as const,
    placeholder: "For Sale, To Let / For Lease, Sold, Leased, New Listing",
  },
  { key: "featured", label: "Featured (true or false)", type: "text" as const },
  { key: "size", label: "Property size (m²)", type: "number" as const },
  { key: "landArea", label: "Land area (m²)", type: "number" as const },
  { key: "buildingArea", label: "Building area (m²)", type: "number" as const },
  { key: "lettableArea", label: "Lettable area (m²)", type: "number" as const },
  { key: "tenure", label: "Verified tenure", type: "text" as const },
  { key: "intendedUse", label: "Intended use", type: "text" as const },
  { key: "parking", label: "Parking", type: "text" as const },
  { key: "access", label: "Access", type: "text" as const },
  { key: "zoning", label: "Verified zoning / land use", type: "text" as const },
  {
    key: "investment",
    label: "Verified investment characteristics",
    type: "textarea" as const,
  },
  {
    key: "bedrooms",
    label: "Bedrooms (residential only)",
    type: "number" as const,
  },
  {
    key: "bathrooms",
    label: "Bathrooms (residential only)",
    type: "number" as const,
  },
  { key: "description", label: "Description", type: "textarea" as const },
  {
    key: "images",
    label: "Image URLs (comma-separated)",
    type: "textarea" as const,
  },
  {
    key: "amenities",
    label: "Key features (comma-separated)",
    type: "textarea" as const,
  },
];
const defaults = {
  title: "",
  location: "",
  city: "",
  price: "",
  price_monthly: "",
  type: "",
  purpose: "For Sale",
  status: "For Sale",
  uses: "",
  featured: "false",
  description: "",
  images: "",
  amenities: "",
};
export function AdminProperties() {
  return (
    <AdminDataTable
      title="Properties"
      endpoint="/properties"
      columns={columns}
      formFields={fields}
      defaultItem={defaults}
    />
  );
}
