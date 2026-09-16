import { AdminDataTable } from "../../components/AdminDataTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  { key: "date", label: "Date" },
];

const fields = [
  { key: "title", label: "Title", type: "text" as const },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const },
  { key: "category", label: "Category", type: "text" as const },
  { key: "author", label: "Author", type: "text" as const },
  {
    key: "date",
    label: "Date",
    type: "text" as const,
    placeholder: "e.g. Apr 15, 2026",
  },
  {
    key: "readTime",
    label: "Read Time",
    type: "text" as const,
    placeholder: "e.g. 8 min read",
  },
  { key: "image", label: "Image URL", type: "url" as const },
  {
    key: "location",
    label: "Botswana location / market covered",
    type: "text" as const,
  },
  {
    key: "source",
    label: "Source (required for market statistics)",
    type: "text" as const,
  },
  {
    key: "reportUrl",
    label: "Verified report download URL",
    type: "url" as const,
  },
  { key: "content", label: "Content (Markdown)", type: "markdown" as const },
];

const defaults = {
  title: "",
  excerpt: "",
  category: "",
  author: "",
  date: "",
  readTime: "",
  image: "",
  content: "",
};

export function AdminResearch() {
  return (
    <AdminDataTable
      title="Research Articles"
      endpoint="/research"
      columns={columns}
      formFields={fields}
      defaultItem={defaults}
    />
  );
}
