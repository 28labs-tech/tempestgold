import { AdminDataTable } from '../../components/AdminDataTable';

const columns = [
  { key: 'headline', label: 'Headline' },
  { key: 'publication', label: 'Publication' },
  { key: 'date', label: 'Date' },
];

const fields = [
  { key: 'headline', label: 'Headline', type: 'text' as const },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' as const },
  { key: 'publication', label: 'Publication', type: 'text' as const },
  { key: 'date', label: 'Date', type: 'text' as const, placeholder: 'e.g. May 12, 2026' },
];

const defaults = {
  headline: '', excerpt: '', publication: '', date: '',
};

export function AdminPress() {
  return <AdminDataTable title="Press Releases" endpoint="/press" columns={columns} formFields={fields} defaultItem={defaults} />;
}
