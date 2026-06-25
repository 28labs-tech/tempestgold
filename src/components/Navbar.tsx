import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Properties',
    path: '/properties'
  },
  {
    name: 'Research',
    path: '/research'
  },
  {
    name: 'Blog',
    path: '/blog'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Valuation',
    path: '/valuation'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/10 backdrop-blur-2xl border-b border-white/15 py-4' : 'bg-white/5 backdrop-blur-xl border-b border-white/10 py-6'}`}>
      
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <img 
            src="/images/logo.png" 
            alt="Tempest Gold" 
            className="w-8 h-8"
          />
          <span className="font-serif font-bold text-xl tracking-widest text-gold-primary uppercase">
            Tempest Gold
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-medium tracking-wide transition-colors hover:text-gold-primary ${location.pathname.startsWith(link.path) ? 'text-gold-primary' : 'text-white-accent'}`}>
            
              {link.name}
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-white-accent hover:text-gold-primary transition-colors">
            <Search size={20} />
          </button>
          <Link
            to="/admin/login"
            className="flex items-center gap-2 bg-gray-dark border border-gray-medium rounded-full py-2 px-4 hover:border-gold-primary transition-colors">
            <Menu size={16} className="text-gray-light" />
            <div className="w-6 h-6 rounded-full bg-gray-medium flex items-center justify-center overflow-hidden">
              <User size={14} className="text-gray-light" />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-white-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'tween',
            duration: 0.3
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-40 flex flex-col pt-24 px-6">
          
            <nav className="flex flex-col gap-6 text-2xl font-serif">
              <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={
              location.pathname === '/' ?
              'text-gold-primary' :
              'text-white-accent'
              }>
              
                Home
              </Link>
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={
              location.pathname.startsWith(link.path) ?
              'text-gold-primary' :
              'text-white-accent'
              }>
              
                  {link.name}
                </Link>
            )}
            </nav>
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <button className="flex items-center gap-3 text-lg text-white-accent py-3 border-b border-gray-dark">
                <Search size={20} /> Search
              </button>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-lg text-white-accent py-3 border-b border-gray-dark hover:text-gold-primary transition-colors">
                <User size={20} /> Admin
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}