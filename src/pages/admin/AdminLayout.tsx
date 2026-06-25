import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  FileText,
  BookOpen,
  Users,
  Briefcase,
  Newspaper,
  TrendingUp,
  MapPin,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/properties', label: 'Properties', icon: Building2 },
  { path: '/admin/research', label: 'Research', icon: FileText },
  { path: '/admin/blog', label: 'Blog', icon: BookOpen },
  { path: '/admin/team', label: 'Team', icon: Users },
  { path: '/admin/careers', label: 'Careers', icon: Briefcase },
  { path: '/admin/press', label: 'Press', icon: Newspaper },
  { path: '/admin/market', label: 'Market Data', icon: TrendingUp },
  { path: '/admin/locations', label: 'Locations & Filters', icon: MapPin },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-black-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-dark border-r border-gray-medium flex flex-col shrink-0">
        <Link to="/admin" className="p-6 border-b border-gray-medium flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="Tempest Gold" 
            className="w-8 h-8 shrink-0"
          />
          <span className="font-serif font-bold text-sm tracking-widest text-gold-primary uppercase">Admin</span>
        </Link>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-primary/10 text-gold-primary'
                    : 'text-gray-light hover:text-white-accent hover:bg-gray-dark/50'
                }`}>
                <item.icon size={18} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-medium">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-light hover:text-red-400 hover:bg-gray-dark/50 transition-colors w-full">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
