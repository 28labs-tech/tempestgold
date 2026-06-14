import { AdminDataTable } from '../../components/AdminDataTable';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'department', label: 'Department' },
  { key: 'location', label: 'Location' },
  { key: 'type', label: 'Type' },
];

const fields = [
  { key: 'title', label: 'Job Title', type: 'text' as const },
  { key: 'department', label: 'Department', type: 'text' as const },
  { key: 'location', label: 'Location', type: 'text' as const },
  { key: 'type', label: 'Employment Type', type: 'text' as const, placeholder: 'Full-time / Contract' },
  { key: 'description', label: 'Description', type: 'textarea' as const },
];

const defaults = {
  title: '', department: '', location: '', type: 'Full-time', description: '',
};

export function AdminCareers() {
  return <AdminDataTable title="Career Positions" endpoint="/careers" columns={columns} formFields={fields} defaultItem={defaults} />;
}
