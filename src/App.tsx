import { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SplashScreen } from "./components/SplashScreen";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Research } from "./pages/Research";
import { ResearchArticle } from "./pages/ResearchArticle";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { About } from "./pages/About";
import { Team } from "./pages/Team";
import { Careers } from "./pages/Careers";
import { Press } from "./pages/Press";
import { Contact } from "./pages/Contact";
import { Valuation } from "./pages/Valuation";
const AdminLogin = lazy(() =>
  import("./pages/admin/AdminLogin").then((module) => ({
    default: module.AdminLogin,
  })),
);
const AdminLayout = lazy(() =>
  import("./pages/admin/AdminLayout").then((module) => ({
    default: module.AdminLayout,
  })),
);
const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  })),
);
const AdminProperties = lazy(() =>
  import("./pages/admin/AdminProperties").then((module) => ({
    default: module.AdminProperties,
  })),
);
const AdminResearch = lazy(() =>
  import("./pages/admin/AdminResearch").then((module) => ({
    default: module.AdminResearch,
  })),
);
const AdminBlog = lazy(() =>
  import("./pages/admin/AdminBlog").then((module) => ({
    default: module.AdminBlog,
  })),
);
const AdminTeam = lazy(() =>
  import("./pages/admin/AdminTeam").then((module) => ({
    default: module.AdminTeam,
  })),
);
const AdminCareers = lazy(() =>
  import("./pages/admin/AdminCareers").then((module) => ({
    default: module.AdminCareers,
  })),
);
const AdminPress = lazy(() =>
  import("./pages/admin/AdminPress").then((module) => ({
    default: module.AdminPress,
  })),
);
const AdminMarket = lazy(() =>
  import("./pages/admin/AdminMarket").then((module) => ({
    default: module.AdminMarket,
  })),
);
const AdminLocations = lazy(() =>
  import("./pages/admin/AdminLocations").then((module) => ({
    default: module.AdminLocations,
  })),
);
import { Services, ServiceDetail } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { Legal } from "./pages/Legal";
import { SeoHead } from "./components/SeoHead";
import { EmptyState } from "./components/Consultancy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="min-h-screen bg-black-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-col min-h-screen bg-black-primary font-sans text-white-accent">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
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
          <ScrollToTop />
          <Suspense
            fallback={
              <div role="status" className="site-container page-intro">
                Loading…
              </div>
            }
          >
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/properties"
                element={
                  <PublicLayout>
                    <Properties />
                  </PublicLayout>
                }
              />
              <Route
                path="/properties/:id"
                element={
                  <PublicLayout>
                    <PropertyDetail />
                  </PublicLayout>
                }
              />
              <Route
                path="/research"
                element={
                  <PublicLayout>
                    <Research />
                  </PublicLayout>
                }
              />
              <Route
                path="/research/:id"
                element={
                  <PublicLayout>
                    <ResearchArticle />
                  </PublicLayout>
                }
              />
              <Route
                path="/blog"
                element={
                  <PublicLayout>
                    <Blog />
                  </PublicLayout>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <PublicLayout>
                    <BlogPost />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/services"
                element={
                  <PublicLayout>
                    <Services />
                  </PublicLayout>
                }
              />
              <Route
                path="/services/:slug"
                element={
                  <PublicLayout>
                    <ServiceDetail />
                  </PublicLayout>
                }
              />
              <Route
                path="/projects"
                element={
                  <PublicLayout>
                    <Projects />
                  </PublicLayout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <PublicLayout>
                    <Legal />
                  </PublicLayout>
                }
              />
              <Route
                path="/terms"
                element={
                  <PublicLayout>
                    <Legal />
                  </PublicLayout>
                }
              />
              <Route
                path="/property-disclaimer"
                element={
                  <PublicLayout>
                    <Legal />
                  </PublicLayout>
                }
              />
              <Route
                path="/team"
                element={
                  <PublicLayout>
                    <Team />
                  </PublicLayout>
                }
              />
              <Route
                path="/careers"
                element={
                  <PublicLayout>
                    <Careers />
                  </PublicLayout>
                }
              />
              <Route
                path="/press"
                element={
                  <PublicLayout>
                    <Press />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                }
              />
              <Route
                path="/valuation"
                element={
                  <PublicLayout>
                    <Valuation />
                  </PublicLayout>
                }
              />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
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
              <Route
                path="*"
                element={
                  <PublicLayout>
                    <div className="page-intro site-container">
                      <SeoHead
                        title="Page not found | Tempest Gold Property"
                        description="Explore Tempest Gold Property services and Botswana properties."
                        noIndex
                      />
                      <EmptyState
                        title="Page not found"
                        text="Use the navigation to explore our services, properties and insights."
                      />
                    </div>
                  </PublicLayout>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
