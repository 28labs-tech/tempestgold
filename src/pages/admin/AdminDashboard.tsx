import { Link } from 'react-router-dom';
import {
  Building2, FileText, BookOpen, Users, Briefcase, Newspaper, TrendingUp, MapPin,
} from 'lucide-react';

const cards = [
  { to: '/admin/properties', label: 'Properties', count: 'Manage', icon: Building2, color: 'text-blue-400' },
  { to: '/admin/research', label: 'Research Articles', count: 'Manage', icon: FileText, color: 'text-purple-400' },
  { to: '/admin/blog', label: 'Blog', count: 'Manage', icon: BookOpen, color: 'text-green-400' },
  { to: '/admin/team', label: 'Team Members', count: 'Manage', icon: Users, color: 'text-amber-400' },
  { to: '/admin/careers', label: 'Career Positions', count: 'Manage', icon: Briefcase, color: 'text-rose-400' },
  { to: '/admin/press', label: 'Press Releases', count: 'Manage', icon: Newspaper, color: 'text-cyan-400' },
  { to: '/admin/market', label: 'Market & Data', count: 'Manage', icon: TrendingUp, color: 'text-emerald-400' },
  { to: '/admin/locations', label: 'Locations & Filters', count: 'Manage', icon: MapPin, color: 'text-orange-400' },
];

export function AdminDashboard() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-white-accent mb-2">Dashboard</h1>
      <p className="text-gray-light text-sm mb-8">Tempest Gold Content Management</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-gray-dark border border-gray-medium rounded-xl p-6 hover:border-gold-primary transition-all group">
            <card.icon className={`mb-3 ${card.color}`} size={28} />
            <h3 className="font-serif text-lg text-white-accent mb-1 group-hover:text-gold-primary transition-colors">{card.label}</h3>
            <span className="text-gray-light text-xs">{card.count} content</span>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-dark border border-gray-medium rounded-xl">
        <h2 className="font-serif text-lg text-white-accent mb-3">API Status</h2>
        <p className="text-gray-light text-sm">
          The admin panel connects to the NestJS API server. Make sure your server is running at the configured API URL.
        </p>
        <p className="text-gray-light text-sm mt-2">
          Login credentials are seeded from the <code className="bg-black-primary px-2 py-0.5 rounded text-gold-primary text-xs">ADMIN_EMAIL</code> and{' '}
          <code className="bg-black-primary px-2 py-0.5 rounded text-gold-primary text-xs">ADMIN_PASSWORD</code> environment variables.
          Changing these in the .env file will automatically update the admin password on server restart.
        </p>
      </div>
    </div>
  );
}
