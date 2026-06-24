import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import api from '../../api/client';

type EntityType = 'data' | 'ticker' | 'stats' | 'locations' | 'filters';

interface EntityConfig {
  key: EntityType;
  label: string;
  endpoint: string;
  columns: { key: string; label: string; render?: (v: unknown) => React.ReactNode }[];
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'number' }[];
  defaultItem: Record<string, unknown>;
}

const entityConfigs: EntityConfig[] = [
  {
    key: 'data', label: 'Market Data', endpoint: '/market/data',
    columns: [
      { key: 'city', label: 'City' },
      { key: 'price', label: 'Avg Price' },
      { key: 'change', label: 'Change' },
      { key: 'volume', label: 'Volume' },
      { key: 'trend', label: 'Trend' },
    ],
    fields: [
      { key: 'city', label: 'City', type: 'text' },
      { key: 'price', label: 'Avg Price', type: 'text' },
      { key: 'change', label: 'Change', type: 'text' },
      { key: 'volume', label: 'Volume', type: 'text' },
      { key: 'trend', label: 'Trend (up/down)', type: 'text' },
    ],
    defaultItem: { city: '', price: '', change: '', volume: '', trend: 'up' },
  },
  {
    key: 'ticker', label: 'Ticker Data', endpoint: '/market/ticker',
    columns: [{ key: 'text', label: 'Text' }],
    fields: [{ key: 'text', label: 'Ticker Text', type: 'text' }],
    defaultItem: { text: '' },
  },
  {
    key: 'stats', label: 'Company Stats', endpoint: '/market/stats',
    columns: [
      { key: 'key', label: 'Key' },
      { key: 'value', label: 'Value' },
    ],
    fields: [
      { key: 'key', label: 'Stat Key', type: 'text' },
      { key: 'value', label: 'Stat Value', type: 'text' },
    ],
    defaultItem: { key: '', value: '' },
  },
  {
    key: 'locations', label: 'Locations', endpoint: '/market/locations',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description', render: (v: unknown) => String(v || '').substring(0, 60) },
    ],
    fields: [
      { key: 'name', label: 'Location Name', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image URL', type: 'text' },
    ],
    defaultItem: { name: '', description: '', image: '' },
  },
  {
    key: 'filters', label: 'Filter Options', endpoint: '/market/filters',
    columns: [
      { key: 'category', label: 'Category' },
      { key: 'name', label: 'Name' },
      { key: 'icon', label: 'Icon' },
      { key: 'range', label: 'Range' },
    ],
    fields: [
      { key: 'category', label: 'Category (propertyTypes/priceRanges/sizeRanges)', type: 'text' },
      { key: 'name', label: 'Display Name', type: 'text' },
      { key: 'icon', label: 'Lucide Icon Name', type: 'text' },
      { key: 'range', label: 'Range (e.g. 0-1000000)', type: 'text' },
      { key: 'order', label: 'Display Order', type: 'number' },
    ],
    defaultItem: { category: '', name: '', icon: '', range: '', order: 0 },
  },
];

export function AdminMarket() {
  const [activeTab, setActiveTab] = useState<EntityType>('data');
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const current = entityConfigs.find((c) => c.key === activeTab)!;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(current.endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const handleCreate = () => {
    setForm({ ...current.defaultItem });
    setEditing(null);
    setCreating(true);
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
        await api.put(`${current.endpoint}/${editing._id}`, form);
      } else {
        await api.post(current.endpoint, form);
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
      await api.delete(`${current.endpoint}/${id}`);
      fetchItems();
    } catch {
      // silently fail
    }
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-white-accent mb-8">Market Data Settings</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2">
        {entityConfigs.map((ec) => (
          <button
            key={ec.key}
            onClick={() => { setActiveTab(ec.key); setCreating(false); setEditing(null); }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeTab === ec.key
                ? 'bg-gold-primary text-black-primary border-gold-primary'
                : 'bg-transparent text-gray-light border-gray-medium hover:border-white-accent hover:text-white-accent'
            }`}>
            {ec.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-white-accent">{current.label}</h2>
        <button
          onClick={handleCreate}
          className="bg-gold-primary text-black-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gold-light transition-colors text-sm">
          <Plus size={16} /> Add {current.label}
        </button>
      </div>

      {/* Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-gray-dark border border-gray-medium rounded-2xl p-8 w-full max-w-2xl">
            <h2 className="font-serif text-xl text-white-accent mb-6">
              {editing ? 'Edit' : 'Create'} {current.label}
            </h2>
            <div className="space-y-4">
              {current.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light block mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={(form[field.key] as string) || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      rows={3}
                      className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={(form[field.key] as string) || ''}
                      onChange={(e) => setForm({ ...form, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                      className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => { setCreating(false); setEditing(null); }} className="px-6 py-2.5 rounded-lg border border-gray-medium text-gray-light hover:text-white-accent text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-lg bg-gold-primary text-black-primary font-medium hover:bg-gold-light text-sm disabled:opacity-50 flex items-center gap-2">
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
          <div className="flex items-center justify-center py-20"><Loader2 size={32} className="text-gold-primary animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-light">No {current.label.toLowerCase()} yet.</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-light uppercase bg-black-primary border-b border-gray-medium">
              <tr>
                {current.columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-medium">{col.label}</th>
                ))}
                <th className="px-4 py-3 font-medium text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id as string} className="border-b border-gray-medium hover:bg-black-primary/30">
                  {current.columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-white-accent">
                      {col.render ? col.render(item[col.key]) : String(item[col.key] || '').substring(0, 80)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-light hover:text-gold-primary"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(item._id as string)} className="p-1.5 text-gray-light hover:text-red-400"><Trash2 size={16} /></button>
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
