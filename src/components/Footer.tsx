import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-black-primary border-t border-gray-dark pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/images/logo.png" 
                alt="Tempest Gold" 
                className="w-8 h-8"
              />
              <span className="font-serif font-bold text-xl tracking-widest text-gold-primary uppercase">
                Tempest Gold
              </span>
            </Link>
            <p className="text-gray-light text-sm leading-relaxed mb-6">
              Curating the world's most exceptional properties for the most
              discerning clientele. Where luxury meets legacy.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-light hover:text-gold-primary transition-colors">
                
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-light hover:text-gold-primary transition-colors">
                
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-light hover:text-gold-primary transition-colors">
                
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white-accent mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/properties"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?type=Residential for sale"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Residential for Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?type=Residential to let"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Residential to Let
                </Link>
              </li>
              <li>
                <Link
                  to="/research"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Market Research
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg text-white-accent mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-light hover:text-gold-primary transition-colors text-sm">
                  
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-white-accent mb-6">
              The Briefing
            </h4>
            <p className="text-gray-light text-sm mb-4">
              Subscribe to receive exclusive property previews and market
              insights.
            </p>
            <form className="flex flex-col gap-3">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-light"
                  size={16} />
                
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-gray-dark border border-gray-medium rounded-sm py-3 pl-10 pr-4 text-sm text-white-accent focus:outline-none focus:border-gold-primary transition-colors" />
                
              </div>
              <button
                type="button"
                className="bg-gold-primary text-black-primary font-medium text-sm py-3 px-4 rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-dark pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-medium text-xs">
            © {new Date().getFullYear()} Tempest Gold. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-medium">
            <Link to="#" className="hover:text-gray-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-light transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-gray-light transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}