import { AdminDataTable } from '../../components/AdminDataTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'bio', label: 'Bio', render: (v: unknown) => String(v || '').substring(0, 60) },
];

const fields = [
  { key: 'name', label: 'Full Name', type: 'text' as const },
  { key: 'title', label: 'Job Title', type: 'text' as const },
  { key: 'bio', label: 'Bio', type: 'textarea' as const },
  { key: 'image', label: 'Image URL', type: 'url' as const },
  { key: 'social.linkedin', label: 'LinkedIn URL', type: 'text' as const },
  { key: 'social.twitter', label: 'Twitter URL', type: 'text' as const },
];

const defaults = {
  name: '', title: '', bio: '', image: '',
  social: { linkedin: '#', twitter: '#' },
};

export function AdminTeam() {
  return <AdminDataTable title="Team Members" endpoint="/team" columns={columns} formFields={fields} defaultItem={defaults} />;
}
