import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { Research } from './pages/Research';
import { ResearchArticle } from './pages/ResearchArticle';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';
import { Valuation } from './pages/Valuation';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminResearch } from './pages/admin/AdminResearch';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminTeam } from './pages/admin/AdminTeam';
import { AdminCareers } from './pages/admin/AdminCareers';
import { AdminPress } from './pages/admin/AdminPress';
import { AdminMarket } from './pages/admin/AdminMarket';
import { AdminLocations } from './pages/admin/AdminLocations';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-black-primary flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-col min-h-screen bg-black-primary font-sans text-white-accent">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
            <Route path="/properties/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
            <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
            <Route path="/research/:id" element={<PublicLayout><ResearchArticle /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogPost /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
            <Route path="/press" element={<PublicLayout><Press /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/valuation" element={<PublicLayout><Valuation /></PublicLayout>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="research" element={<AdminResearch />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="press" element={<AdminPress />} />
              <Route path="market" element={<AdminMarket />} />
              <Route path="locations" element={<AdminLocations />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
