import { AdminDataTable } from '../../components/AdminDataTable';

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'date', label: 'Date' },
];

const fields = [
  { key: 'title', label: 'Title', type: 'text' as const },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' as const },
  { key: 'category', label: 'Category', type: 'text' as const },
  { key: 'author', label: 'Author', type: 'text' as const },
  { key: 'date', label: 'Date', type: 'text' as const, placeholder: 'e.g. Mar 28, 2026' },
  { key: 'readTime', label: 'Read Time', type: 'text' as const, placeholder: 'e.g. 5 min read' },
  { key: 'image', label: 'Image URL', type: 'url' as const },
  { key: 'content', label: 'Content (Markdown)', type: 'markdown' as const },
];

const defaults = {
  title: '', excerpt: '', category: '', author: '', date: '',
  readTime: '', image: '', content: '',
};

export function AdminBlog() {
  return <AdminDataTable title="Blog Posts" endpoint="/blog" columns={columns} formFields={fields} defaultItem={defaults} />;
}
