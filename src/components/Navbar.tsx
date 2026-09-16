import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Properties", "/properties"],
  ["Research & Insights", "/research"],
  ["Projects / Case Studies", "/projects"],
  ["Contact", "/contact"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.current?.querySelector<HTMLElement>("a")?.focus();
    function keydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const elements = [
          toggle.current,
          ...Array.from(
            drawer.current?.querySelectorAll<HTMLElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = elements[0],
          last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [open]);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Tempest Gold Property home">
          <img src="/images/logo.png" alt="" width="34" height="34" />
          <span>
            TEMPEST GOLD<small>PROPERTY</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {links.map(([name, path]) => (
            <Link
              key={path}
              to={path}
              aria-current={
                (path === "/" ? pathname === path : pathname.startsWith(path))
                  ? "page"
                  : undefined
              }
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="header-cta">
          Speak to a Property Adviser{" "}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          ref={drawer}
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([name, path]) => (
            <Link
              key={path}
              to={path}
              aria-current={pathname === path ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
          <Link to="/contact" className="button-gold">
            Speak to a Property Adviser <ArrowUpRight size={18} />
          </Link>
          <Link to="/admin/login" className="mobile-admin">
            Admin login
          </Link>
        </nav>
      )}
    </header>
  );
}
