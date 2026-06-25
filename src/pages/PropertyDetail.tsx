import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Share,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
  Shield,
  X,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id) || properties[0];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isRental = property.purpose === 'To Let';
  const isSale = property.purpose === 'For Sale' || property.purpose === 'Development';
  const displayPrice = isRental ? property.price_monthly : property.price;
  const hostName = isSale ? 'Tempest Gold Private Clients' : property.host.name;
  const hostImage = isSale ? '/images/logo.png' : property.host.image;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);

  const openCarousel = (index: number) => {
    setActiveImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
      <SeoHead
        title={`${property.title} in ${property.location}`}
        description={property.description.substring(0, 160)}
        image={property.images[0]}
        url={`/properties/${property.id}`}
      />
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold-primary transition-colors mb-4 text-sm"
          >
            <ChevronLeft size={16} /> Back to properties
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl text-white-accent mb-2">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 font-medium text-white-accent">
                <Star
                  size={16}
                  className="text-gold-primary fill-gold-primary"
                />{' '}
                {property.rating}
              </span>
              <span className="text-gray-medium">•</span>
              <span className="underline text-white-accent cursor-pointer">
                {property.reviews} reviews
              </span>
              <span className="text-gray-medium">•</span>
              <span className="flex items-center gap-1 text-gray-light">
                <MapPin size={16} /> {property.location}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-2 text-white-accent hover:text-gold-primary transition-colors underline">
                <Share size={16} /> Share
              </button>
              <button className="flex items-center gap-2 text-white-accent hover:text-gold-primary transition-colors underline">
                <Heart size={16} /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12 relative group">
          <div className="col-span-1 md:col-span-2 row-span-2 h-full">
            <img
              src={property.images[0]}
              alt="Main"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => openCarousel(0)}
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[1]}
              alt="Gallery 1"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => openCarousel(1)}
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[2]}
              alt="Gallery 2"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => openCarousel(2)}
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[3]}
              alt="Gallery 3"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => openCarousel(3)}
            />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[4]}
              alt="Gallery 4"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => openCarousel(4)}
            />
          </div>
          <button 
            onClick={() => openCarousel(0)}
            className="absolute bottom-6 right-6 bg-white-accent text-black-primary px-4 py-2 rounded-lg font-medium text-sm border border-black shadow-lg hover:bg-gray-200 transition-colors"
          >
            Show all photos
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-grow">
            {/* Host Info */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-dark">
              <div>
                <h2 className="font-serif text-2xl text-white-accent mb-1">
                  Hosted by {hostName}
                </h2>
                <p className="text-gray-light text-sm">
                  {property.guests} guests • {property.bedrooms} bedrooms •{' '}
                  {property.beds} beds • {property.baths} baths
                </p>
              </div>
              <img
                src={hostImage}
                alt={hostName}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-primary bg-black-primary p-0.5"
              />
            </div>

            {/* Features */}
            <div className="py-6 border-b border-gray-dark space-y-6">
              <div className="flex gap-4">
                <Award className="text-gold-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-medium text-white-accent mb-1">
                    Premium Host
                  </h3>
                  <p className="text-gray-light text-sm">
                    Highly rated host committed to providing great stays.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="text-gold-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-medium text-white-accent mb-1">
                    Exceptional Location
                  </h3>
                  <p className="text-gray-light text-sm">
                    100% of recent guests gave the location a 5-star rating.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-8 border-b border-gray-dark">
              <h2 className="font-serif text-2xl text-white-accent mb-4">
                About this space
              </h2>
              <p className="text-gray-light leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              <button className="mt-4 font-medium text-white-accent underline hover:text-gold-primary transition-colors">
                Show more
              </button>
            </div>

            {/* Amenities */}
            <div className="py-8 border-b border-gray-dark">
              <h2 className="font-serif text-2xl text-white-accent mb-6">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-light"
                  >
                    <Shield size={20} className="text-gold-primary/70" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsAmenitiesModalOpen(true)}
                className="mt-8 border border-white-accent text-white-accent px-6 py-3 rounded-lg font-medium hover:bg-white-accent hover:text-black-primary transition-colors"
              >
                Show all amenities
              </button>
            </div>
          </div>

          {/* Sidebar Booking / Inquiry Card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-32 bg-gray-dark border border-gray-medium rounded-2xl p-8 shadow-2xl">
              {isSale ? (
                // Private Inquiry Form for Sale Properties (Larger and More Premium)
                <div className="flex flex-col gap-6">
                  <div className="border-b border-gray-medium/30 pb-5">
                    <span className="font-serif text-2xl text-gold-primary tracking-wider uppercase font-bold block mb-1.5">
                      Price Upon Request
                    </span>
                    <span className="text-gray-light text-sm">
                      Exclusive Private Collection
                    </span>
                  </div>
                  
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest. A Tempest Gold Private Client Advisor will contact you shortly.'); }}>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-light block mb-2 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-black-primary border border-gray-medium text-white-accent text-sm focus:border-gold-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-light block mb-2 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-black-primary border border-gray-medium text-white-accent text-sm focus:border-gold-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-light block mb-2 tracking-wider">Phone Number</label>
                      <input
                        type="text"
                        required
                        placeholder="+267 71 234 567"
                        className="w-full px-4 py-3 rounded-lg bg-black-primary border border-gray-medium text-white-accent text-sm focus:border-gold-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-gray-light block mb-2 tracking-wider">Inquiry Details</label>
                      <textarea
                        rows={4}
                        defaultValue={`I am interested in requesting more details or a private viewing for ${property.title} in ${property.location}.`}
                        className="w-full px-4 py-3 rounded-lg bg-black-primary border border-gray-medium text-white-accent text-sm focus:border-gold-primary outline-none transition-colors resize-none leading-relaxed"
                      />
                    </div>
                    
                    <button type="submit" className="w-full bg-gold-primary hover:bg-gold-secondary text-black-primary font-bold py-4.5 rounded-xl transition-all duration-300 shadow-lg shadow-gold-primary/10 hover:shadow-gold-primary/20 mt-2 text-sm uppercase tracking-widest">
                      Request Private Viewing
                    </button>
                  </form>
                  
                  <div className="text-center text-xs text-gray-light border-t border-gray-medium/30 pt-5 leading-relaxed">
                    A Tempest Gold Private Client Advisor will contact you within 24 hours.
                  </div>
                </div>
              ) : (
                // Original Booking Form for Rentals
                <>
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <span className="text-2xl font-semibold text-white-accent">
                        P{(displayPrice || 0).toLocaleString()}
                      </span>
                      <span className="text-gray-light"> / month</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={14}
                        className="text-gold-primary fill-gold-primary"
                      />
                      <span className="font-medium text-white-accent">
                        {property.rating}
                      </span>
                      <span className="text-gray-light">
                        · {property.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="border border-gray-medium rounded-xl overflow-hidden mb-4">
                    <div className="flex border-b border-gray-medium">
                      <div className="flex-1 p-3 border-r border-gray-medium">
                        <div className="text-[10px] font-bold uppercase text-gray-light">
                          Check-in
                        </div>
                        <div className="text-sm text-white-accent">Add date</div>
                      </div>
                      <div className="flex-1 p-3">
                        <div className="text-[10px] font-bold uppercase text-gray-light">
                          Check-out
                        </div>
                        <div className="text-sm text-white-accent">Add date</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[10px] font-bold uppercase text-gray-light">
                        Guests
                      </div>
                      <div className="text-sm text-white-accent">1 guest</div>
                    </div>
                  </div>

                  <button className="w-full bg-gold-primary hover:bg-gold-secondary text-black-primary font-bold py-4 rounded-xl transition-colors mb-4">
                    Reserve
                  </button>
                  <p className="text-center text-gray-light text-sm mb-6">
                    You won't be charged yet
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-gray-light">
                      <span className="underline">
                        P{(displayPrice || 0).toLocaleString()} x 5 months
                      </span>
                      <span>P{((displayPrice || 0) * 5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-light">
                      <span className="underline">Cleaning fee</span>
                      <span>P250</span>
                    </div>
                    <div className="flex justify-between text-gray-light">
                      <span className="underline">Service fee</span>
                      <span>P450</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-medium mt-6 pt-6 flex justify-between font-semibold text-white-accent">
                    <span>Total</span>
                    <span>
                      P{((displayPrice || 0) * 5 + 250 + 450).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE CAROUSEL MODAL */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full text-white-accent z-10">
              <span className="font-serif text-sm tracking-wider uppercase">
                {property.title} — Image {activeImageIndex + 1} of {property.images.length}
              </span>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white-accent transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Carousel viewport */}
            <div className="relative flex-grow flex items-center justify-center max-w-6xl w-full mx-auto my-4 px-12">
              <button
                onClick={prevImage}
                className="absolute left-0 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-primary text-white-accent transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="w-full h-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl relative bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={property.images[activeImageIndex]}
                    alt={`Property image ${activeImageIndex + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-full object-contain"
                  />
                </AnimatePresence>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-0 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-primary text-white-accent transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Thumbnails */}
            <div className="w-full max-w-4xl mx-auto z-10">
              <div className="flex justify-center gap-3 overflow-x-auto py-4 hide-scrollbar">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-gold-primary scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMENITIES MODAL */}
      <AnimatePresence>
        {isAmenitiesModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            onClick={() => setIsAmenitiesModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-gray-dark border border-gray-medium max-w-2xl w-full max-h-[80vh] rounded-2xl overflow-hidden flex flex-col p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-medium/30 pb-4 mb-6">
                <h3 className="font-serif text-2xl text-white-accent">
                  Property Amenities
                </h3>
                <button
                  onClick={() => setIsAmenitiesModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white-accent transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Grid content */}
              <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2 mb-6">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-4 rounded-xl bg-black-primary/40 border border-gray-medium/10 text-white-accent hover:border-gold-primary/20 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-gold-primary" />
                    </div>
                    <span className="text-sm text-gray-light">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Close Button / Collapse All */}
              <button
                onClick={() => setIsAmenitiesModalOpen(false)}
                className="w-full bg-gold-primary hover:bg-gold-secondary text-black-primary font-bold py-4 rounded-xl transition-all duration-300 shadow-lg text-sm uppercase tracking-widest"
              >
                Close Amenities
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}