import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import api from '../api/client';
import { MilkdownEditor } from './MilkdownEditor';

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface Props {
  title: string;
  endpoint: string;
  columns: Column[];
  formFields: { key: string; label: string; type: 'text' | 'textarea' | 'number' | 'url' | 'markdown'; placeholder?: string }[];
  defaultItem: Record<string, unknown>;
  backTo?: string;
}

export function AdminDataTable({ title, endpoint, columns, formFields, defaultItem, backTo }: Props) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const handleCreate = () => {
    setForm({ ...defaultItem });
    setCreating(true);
    setEditing(null);
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setForm({ ...item });
    setEditing(item);
    setCreating(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await api.put(`${endpoint}/${editing._id}`, form);
      } else {
        await api.post(endpoint, form);
      }
      setCreating(false);
      setEditing(null);
      fetchItems();
    } catch {
      // silently fail
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      fetchItems();
    } catch {
      // silently fail
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          {backTo && (
            <a href={backTo} className="text-xs text-gray-light hover:text-gold-primary flex items-center gap-1 mb-2">
              <ArrowLeft size={12} /> Back
            </a>
          )}
          <h1 className="font-serif text-3xl text-white-accent">{title}</h1>
        </div>
        <button
          onClick={handleCreate}
          className="bg-gold-primary text-black-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gold-light transition-colors text-sm">
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Create/Edit Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className={`bg-gray-dark border border-gray-medium rounded-2xl p-8 w-full overflow-y-auto ${formFields.some(f => f.type === 'markdown') ? 'max-w-4xl max-h-[90vh]' : 'max-w-2xl max-h-[80vh]'}`}>
            <h2 className="font-serif text-xl text-white-accent mb-6">
              {editing ? 'Edit' : 'Create'} {title}
            </h2>
            <div className="space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light block mb-2">
                    {field.label}
                  </label>
                  {field.type === 'markdown' ? (
                    <div className="max-h-[400px] overflow-y-auto">
                      <MilkdownEditor
                        value={(form[field.key] as string) || ''}
                        onChange={(val) => setForm({ ...form, [field.key]: val })}
                      />
                    </div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={(form[field.key] as string) || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      rows={4}
                      className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors resize-none"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={(form[field.key] as string) || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => { setCreating(false); setEditing(null); }}
                className="px-6 py-2.5 rounded-lg border border-gray-medium text-gray-light hover:text-white-accent transition-colors text-sm">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-gold-primary text-black-primary font-medium hover:bg-gold-light transition-colors text-sm disabled:opacity-50 flex items-center gap-2">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-dark border border-gray-medium rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="text-gold-primary animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-light">No items yet. Create one to get started.</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-light uppercase bg-black-primary border-b border-gray-medium">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-medium">{col.label}</th>
                ))}
                <th className="px-4 py-3 font-medium text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id as string} className="border-b border-gray-medium hover:bg-black-primary/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-white-accent">
                      {col.render ? col.render(item[col.key], item) : String(item[col.key] || '').substring(0, 80)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-gray-light hover:text-gold-primary transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id as string)}
                        className="p-1.5 text-gray-light hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
