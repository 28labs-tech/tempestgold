import { AdminDataTable } from '../../components/AdminDataTable';

const locations = {
  title: 'Botswana Locations',
  endpoint: '/market/locations',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description', render: (v: unknown) => String(v || '').substring(0, 60) },
  ],
  formFields: [
    { key: 'name', label: 'Location Name', type: 'text' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'image', label: 'Image URL', type: 'url' as const },
  ],
  defaultItem: { name: '', description: '', image: '' },
};

const filters = {
  title: 'Filter Options',
  endpoint: '/market/filters',
  columns: [
    { key: 'category', label: 'Category' },
    { key: 'name', label: 'Name' },
    { key: 'range', label: 'Range' },
  ],
  formFields: [
    { key: 'category', label: 'Category', type: 'text' as const, placeholder: 'propertyTypes / priceRanges / sizeRanges' },
    { key: 'name', label: 'Display Name', type: 'text' as const },
    { key: 'icon', label: 'Lucide Icon', type: 'text' as const },
    { key: 'range', label: 'Range Value', type: 'text' as const, placeholder: 'e.g. 0-1000000' },
    { key: 'order', label: 'Order', type: 'number' as const },
  ],
  defaultItem: { category: '', name: '', icon: '', range: '', order: 0 },
};

export function AdminLocations() {
  return (
    <div className="space-y-16">
      <AdminDataTable {...locations} />
      <AdminDataTable {...filters} />
    </div>
  );
}
