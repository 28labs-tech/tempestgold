import { AdminDataTable } from '../../components/AdminDataTable';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'location', label: 'Location' },
  { key: 'price', label: 'Price/Night', render: (v: unknown) => `$${(v as number)?.toLocaleString() || 0}` },
  { key: 'type', label: 'Type' },
  { key: 'rating', label: 'Rating' },
];

const fields = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'location', label: 'Location', type: 'text' as const },
  { key: 'price', label: 'Price per Night ($)', type: 'number' as const },
  { key: 'rating', label: 'Rating (0-5)', type: 'number' as const },
  { key: 'reviews', label: 'Review Count', type: 'number' as const },
  { key: 'guests', label: 'Max Guests', type: 'number' as const },
  { key: 'bedrooms', label: 'Bedrooms', type: 'number' as const },
  { key: 'beds', label: 'Beds', type: 'number' as const },
  { key: 'baths', label: 'Baths', type: 'number' as const },
  { key: 'type', label: 'Property Type', type: 'text' as const },
  { key: 'description', label: 'Description', type: 'textarea' as const },
  { key: 'host.name', label: 'Host Name', type: 'text' as const },
  { key: 'host.image', label: 'Host Image URL', type: 'url' as const },
  { key: 'host.joined', label: 'Host Joined Year', type: 'text' as const },
  { key: 'images', label: 'Image URLs (comma-separated)', type: 'textarea' as const },
  { key: 'amenities', label: 'Amenities (comma-separated)', type: 'textarea' as const },
];

const defaults = {
  title: '', location: '', price: 1000, rating: 5, reviews: 0,
  guests: 2, bedrooms: 1, beds: 1, baths: 1, type: 'Villas',
  description: '', images: '', amenities: '',
  host: { name: '', image: '', joined: '' },
};

export function AdminProperties() {
  return <AdminDataTable title="Properties" endpoint="/properties" columns={columns} formFields={fields} defaultItem={defaults} />;
}
