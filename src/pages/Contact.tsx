import React from 'react';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
export function Contact() {
  return (
    <div className="min-h-screen bg-black-primary pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Info */}
          <div>
            <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6">
              Contact Us
            </h1>
            <p className="text-gray-light text-lg mb-12 max-w-md">
              Connect with our advisory team to discuss your real estate
              portfolio, request a private viewing, or inquire about our
              services.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-dark rounded-full flex items-center justify-center shrink-0 border border-gray-medium text-gold-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-white-accent font-medium mb-1">
                    Global Headquarters
                  </h3>
                  <p className="text-gray-light text-sm">
                    100 Park Avenue, 45th Floor
                    <br />
                    New York, NY 10017
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-dark rounded-full flex items-center justify-center shrink-0 border border-gray-medium text-gold-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-white-accent font-medium mb-1">Phone</h3>
                  <p className="text-gray-light text-sm">
                    +1 (212) 555-0198
                    <br />
                    Mon-Fri, 9am - 6pm EST
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-dark rounded-full flex items-center justify-center shrink-0 border border-gray-medium text-gold-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-white-accent font-medium mb-1">Email</h3>
                  <p className="text-gray-light text-sm">
                    advisory@Tempest Goldestates.com
                    <br />
                    press@Tempest Goldestates.com
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-dark rounded-full flex items-center justify-center text-white-accent hover:bg-gold-primary hover:text-black-primary transition-colors">
                
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-dark rounded-full flex items-center justify-center text-white-accent hover:bg-gold-primary hover:text-black-primary transition-colors">
                
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-dark rounded-full flex items-center justify-center text-white-accent hover:bg-gold-primary hover:text-black-primary transition-colors">
                
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-gray-dark border border-gray-medium p-8 md:p-10 rounded-2xl">
            <h2 className="font-serif text-2xl text-white-accent mb-6">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors" />
                  
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors" />
                  
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors" />
                  
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors" />
                  
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                  Subject
                </label>
                <select className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors appearance-none">
                  <option>Property Inquiry</option>
                  <option>Valuation Request</option>
                  <option>General Advisory</option>
                  <option>Press/Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-light">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-black-primary border border-gray-medium rounded-lg px-4 py-3 text-white-accent focus:outline-none focus:border-gold-primary transition-colors resize-none">
                </textarea>
              </div>
              <button
                type="button"
                className="w-full bg-gold-primary text-black-primary font-bold py-4 rounded-lg hover:bg-gold-light transition-colors">
                
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Global Offices */}
        <section>
          <h2 className="font-serif text-3xl text-white-accent mb-8 border-b border-gray-dark pb-4">
            Global Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black-primary border border-gray-medium p-6 rounded-xl">
              <h3 className="font-serif text-xl text-gold-primary mb-4">
                New York
              </h3>
              <p className="text-gray-light text-sm leading-relaxed mb-4">
                100 Park Avenue, 45th Floor
                <br />
                New York, NY 10017
                <br />
                United States
              </p>
              <a
                href="#"
                className="text-white-accent text-sm font-medium hover:text-gold-primary transition-colors underline">
                
                Get Directions
              </a>
            </div>
            <div className="bg-black-primary border border-gray-medium p-6 rounded-xl">
              <h3 className="font-serif text-xl text-gold-primary mb-4">
                London
              </h3>
              <p className="text-gray-light text-sm leading-relaxed mb-4">
                15 Berkeley Square
                <br />
                Mayfair, London W1J 6EG
                <br />
                United Kingdom
              </p>
              <a
                href="#"
                className="text-white-accent text-sm font-medium hover:text-gold-primary transition-colors underline">
                
                Get Directions
              </a>
            </div>
            <div className="bg-black-primary border border-gray-medium p-6 rounded-xl">
              <h3 className="font-serif text-xl text-gold-primary mb-4">
                Dubai
              </h3>
              <p className="text-gray-light text-sm leading-relaxed mb-4">
                Boulevard Plaza Tower 1, Level 33
                <br />
                Downtown Dubai
                <br />
                United Arab Emirates
              </p>
              <a
                href="#"
                className="text-white-accent text-sm font-medium hover:text-gold-primary transition-colors underline">
                
                Get Directions
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>);

}