import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Building,
  DollarSign,
  Star,
  Users,
  Zap,
  MapPin,
  CheckCircle,
  Mail,
  X } from
'lucide-react';
import { motion } from 'framer-motion';
import { properties, blogPosts, botswanaLocations, propertyTypes, priceRanges, sizeRanges } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { SeoHead } from '../components/SeoHead';

export function Home() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const [openDropdown, setOpenDropdown] = useState<'location' | 'type' | 'price' | 'size' | 'mobile' | null>(null);
  const [alignRight, setAlignRight] = useState<Set<string>>(new Set());

  const searchBarRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  // Check dropdown positioning to prevent overflow
  useEffect(() => {
    const checkDropdownPosition = () => {
      const newAlignRight = new Set<string>();
      const dropdownRefs = [
        { ref: locationRef, key: 'location' },
        { ref: typeRef, key: 'type' },
        { ref: priceRef, key: 'price' },
        { ref: sizeRef, key: 'size' }
      ];

      dropdownRefs.forEach(({ ref, key }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const dropdownWidth = 384;
          const rightEdge = rect.left + dropdownWidth;
          
          if (rightEdge > window.innerWidth - 16) {
            newAlignRight.add(key);
          }
        }
      });

      setAlignRight(newAlignRight);
    };

    checkDropdownPosition();
    window.addEventListener('resize', checkDropdownPosition);
    window.addEventListener('scroll', checkDropdownPosition);
    return () => {
      window.removeEventListener('resize', checkDropdownPosition);
      window.removeEventListener('scroll', checkDropdownPosition);
    };
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.append('location', selectedLocation);
    if (selectedType) params.append('type', selectedType);
    if (selectedPrice) params.append('price', selectedPrice);
    if (selectedSize) params.append('size', selectedSize);
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full min-h-screen bg-black-primary">
      <SeoHead
        title="Tempest Gold - Luxury Property Research Platform"
        description="Discover exceptional luxury properties worldwide. Curated estates, market intelligence, and private advisory for discerning clientele. Where luxury meets legacy."
        url="/"
      />
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center py-24 md:py-0">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Luxury Property"
            className="w-full h-full object-cover opacity-60" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black-primary" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-start sm:items-center text-left sm:text-center mt-12 sm:mt-16 md:mt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold-primary uppercase tracking-[0.2em] text-sm sm:text-sm font-medium mb-4 sm:mb-6">
            The Pinnacle of Living
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white-accent mb-6 sm:mb-8 max-w-5xl leading-tight px-2 sm:px-0">
            Discover{' '}
            <span className="text-transparent bg-clip-text bg-gold-gradient">
              Exceptional
            </span>{' '}
            Properties
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-5xl mx-auto px-0 sm:px-4">
            
            {/* Search Wrapper */}
            <div ref={searchBarRef} className="w-full">
            
            {/* Mobile Search */}
            <div className="sm:hidden flex flex-col">
              {/* Collapsed Bar */}
              <div className="flex items-center bg-white-accent">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'mobile' ? null : 'mobile')}
                  className="bg-gold-primary hover:bg-gold-secondary transition-colors text-black-primary p-4 flex items-center justify-center shrink-0">
                  <Search size={20} />
                </button>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'mobile' ? null : 'mobile')}
                  className="flex-1 px-4 py-3 text-left">
                  <span className="text-sm text-black-primary/50">
                    {selectedLocation || selectedType || selectedPrice || selectedSize
                      ? [selectedLocation, selectedType, selectedPrice, selectedSize].filter(Boolean).join(' · ')
                      : 'Tap to search properties'}
                  </span>
                </button>
              </div>

              {/* Expanded Form Panel */}
              {openDropdown === 'mobile' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/95 backdrop-blur-2xl border border-t-0 border-white/15 z-[100] overflow-hidden">
                  <div className="p-5 space-y-6 max-h-[65vh] overflow-y-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg text-white-accent">Refine Your Search</h3>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(null)}
                        className="text-gray-light hover:text-gold-primary transition-colors">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-gold-primary text-xs font-bold uppercase tracking-wider">
                        <MapPin size={14} /> Location
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {botswanaLocations.map((loc) => (
                          <button
                            key={loc.id}
                            onClick={() => setSelectedLocation(selectedLocation === loc.name ? null : loc.name)}
                            className={`text-left px-3 py-2.5 border text-xs font-medium transition-all ${
                              selectedLocation === loc.name
                                ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                                : 'border-white/10 text-white-accent hover:border-white/25'
                            }`}>
                            {loc.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-gold-primary text-xs font-bold uppercase tracking-wider">
                        <Building size={14} /> Property Type
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(selectedType === type.name ? null : type.name)}
                            className={`px-4 py-2 border text-xs font-medium transition-all ${
                              selectedType === type.name
                                ? 'border-gold-primary bg-gold-primary text-black-primary'
                                : 'border-white/10 text-gray-light hover:border-white/25'
                            }`}>
                            {type.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-gold-primary text-xs font-bold uppercase tracking-wider">
                        <DollarSign size={14} /> Budget
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {priceRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => setSelectedPrice(selectedPrice === range.name ? null : range.name)}
                            className={`px-3 py-2.5 border text-xs font-medium text-left transition-all ${
                              selectedPrice === range.name
                                ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                                : 'border-white/10 text-gray-light hover:border-white/25'
                            }`}>
                            {range.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-gold-primary text-xs font-bold uppercase tracking-wider">
                        <Zap size={14} /> Size
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {sizeRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => setSelectedSize(selectedSize === range.name ? null : range.name)}
                            className={`px-3 py-2.5 border text-xs font-medium text-left transition-all ${
                              selectedSize === range.name
                                ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                                : 'border-white/10 text-gray-light hover:border-white/25'
                            }`}>
                            {range.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => { setSelectedLocation(null); setSelectedType(null); setSelectedPrice(null); setSelectedSize(null); }}
                        className="px-4 py-3 border border-white/15 text-gray-light text-xs font-medium uppercase tracking-wider hover:text-white-accent hover:border-white/30 transition-colors">
                        Clear
                      </button>
                      <button
                        onClick={() => { handleSearch(); setOpenDropdown(null); }}
                        className="flex-1 bg-gold-primary text-black-primary font-bold py-3 text-sm uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                        <Search size={16} /> Search Properties
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden sm:flex bg-white-accent items-center gap-1 pl-2">
              {/* Location Dropdown */}
              <div ref={locationRef} className="flex-1 relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
                  className="w-full flex items-center px-6 py-3 text-black-primary hover:bg-black/5 transition-colors text-left">
                  <MapPin size={16} className="text-black-primary/70 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Location</span>
                    <span className="font-medium truncate">{selectedLocation || 'Select'}</span>
                  </div>
                </button>
                
                {openDropdown === 'location' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full mt-0 w-96 bg-black/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-[100] max-h-80 overflow-y-auto ${alignRight.has('location') ? 'right-0' : 'left-0'}`}>
                    {botswanaLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc.name);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-4 border-b border-white/10 hover:bg-gold-primary/10 transition-colors flex gap-3 ${selectedLocation === loc.name ? 'bg-gold-primary/10 border-l-2 border-l-gold-primary' : ''}`}>
                        <img src={loc.image} alt={loc.name} className="w-12 h-12 object-cover shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-white-accent font-medium text-sm">{loc.name}</h4>
                          <p className="text-gray-light text-xs line-clamp-1">{loc.description}</p>
                        </div>
                        {selectedLocation === loc.name && <CheckCircle size={16} className="text-gold-primary flex-shrink-0 mt-2" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="h-6 w-px bg-black-primary/20"></div>

              {/* Property Type Dropdown */}
              <div ref={typeRef} className="flex-1 relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                  className="w-full flex items-center px-6 py-3 text-black-primary hover:bg-black/5 transition-colors text-left">
                  <Building size={16} className="text-black-primary/70 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Type</span>
                    <span className="font-medium truncate">{selectedType || 'Select'}</span>
                  </div>
                </button>
                
                {openDropdown === 'type' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full mt-0 w-96 bg-black/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-[100] max-h-80 overflow-y-auto ${alignRight.has('type') ? 'right-0' : 'left-0'}`}>
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.name);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-4 border-b border-white/10 hover:bg-gold-primary/10 transition-colors flex items-center gap-3 ${selectedType === type.name ? 'bg-gold-primary/10 border-l-2 border-l-gold-primary' : ''}`}>
                        <Building size={16} className="text-gold-primary shrink-0" />
                        <span className="text-white-accent font-medium flex-1">{type.name}</span>
                        {selectedType === type.name && <CheckCircle size={16} className="text-gold-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="h-6 w-px bg-black-primary/20"></div>

              {/* Price Dropdown */}
              <div ref={priceRef} className="flex-1 relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                  className="w-full flex items-center px-6 py-3 text-black-primary hover:bg-black/5 transition-colors text-left">
                  <DollarSign size={16} className="text-black-primary/70 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Budget</span>
                    <span className="font-medium truncate">{selectedPrice || 'Select'}</span>
                  </div>
                </button>
                
                {openDropdown === 'price' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full mt-0 w-96 bg-black/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-[100] max-h-80 overflow-y-auto ${alignRight.has('price') ? 'right-0' : 'left-0'}`}>
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => {
                          setSelectedPrice(range.name);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-4 border-b border-white/10 hover:bg-gold-primary/10 transition-colors flex items-center gap-3 ${selectedPrice === range.name ? 'bg-gold-primary/10 border-l-2 border-l-gold-primary' : ''}`}>
                        <DollarSign size={16} className="text-gold-primary shrink-0" />
                        <span className="text-white-accent font-medium flex-1">{range.name}</span>
                        {selectedPrice === range.name && <CheckCircle size={16} className="text-gold-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="h-6 w-px bg-black-primary/20"></div>

              {/* Size Dropdown */}
              <div ref={sizeRef} className="flex-1 relative hidden sm:block">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'size' ? null : 'size')}
                  className="w-full flex items-center px-6 py-3 text-black-primary hover:bg-black/5 transition-colors text-left">
                  <Zap size={16} className="text-black-primary/70 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">Size</span>
                    <span className="font-medium truncate">{selectedSize || 'Select'}</span>
                  </div>
                </button>
                
                {openDropdown === 'size' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full mt-0 w-96 bg-black/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-[100] max-h-80 overflow-y-auto ${alignRight.has('size') ? 'right-0' : 'left-0'}`}>
                    {sizeRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => {
                          setSelectedSize(range.name);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left p-4 border-b border-white/10 hover:bg-gold-primary/10 transition-colors flex items-center gap-3 ${selectedSize === range.name ? 'bg-gold-primary/10 border-l-2 border-l-gold-primary' : ''}`}>
                        <Zap size={16} className="text-gold-primary shrink-0" />
                        <span className="text-white-accent font-medium flex-1">{range.name}</span>
                        {selectedSize === range.name && <CheckCircle size={16} className="text-gold-primary flex-shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Search Button */}
              <button 
                onClick={handleSearch}
                aria-label="Search properties" 
                className="bg-gold-primary hover:bg-gold-secondary transition-colors text-black-primary p-4 flex items-center justify-center shrink-0">
                <Search size={20} />
              </button>
            </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROPERTIES (Airbnb Style) */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white-accent mb-4">
              Curated Collection
            </h2>
            <p className="text-gray-light">
              Handpicked estates for the most discerning tastes.
            </p>
          </div>
          <Link
            to="/properties"
            className="hidden md:flex items-center gap-2 text-gold-primary hover:text-gold-light transition-colors">
            
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 4).map((property, index) =>
          <PropertyCard key={property.id} property={property} index={index} />
          )}
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Link
            to="/properties"
            className="border border-gold-primary text-gold-primary px-6 py-3 rounded-full hover:bg-gold-primary hover:text-black-primary transition-colors">
            
            View all properties
          </Link>
        </div>
      </section>

      {/* MARKET INSIGHTS PREVIEW (Bloomberg Style) */}
      <section className="py-24 bg-gray-dark border-y border-gray-medium">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-gold-primary uppercase tracking-widest text-xs font-bold mb-4 block">
                Market Intelligence
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-6 leading-tight">
                Data-Driven Decisions in Luxury Real Estate
              </h2>
              <p className="text-gray-light mb-8 text-lg">
                Access proprietary market data, trend analysis, and expert
                commentary to inform your next acquisition or disposition.
              </p>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 bg-white-accent text-black-primary px-6 py-3 font-medium hover:bg-gray-200 transition-colors">
                
                Explore Research <ArrowRight size={16} />
              </Link>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                className="bg-black-primary p-6 border border-gray-medium">
                
                <DollarSign className="text-gold-primary mb-4" size={24} />
                <h3 className="text-gray-light text-sm uppercase tracking-wider mb-2">
                  Avg Prime Price
                </h3>
                <p className="font-serif text-3xl text-white-accent">
                  $2,450<span className="text-lg text-gray-medium">/sqft</span>
                </p>
                <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={14} /> +4.2% YoY
                </p>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.1
                }}
                className="bg-black-primary p-6 border border-gray-medium">
                
                <Building className="text-gold-primary mb-4" size={24} />
                <h3 className="text-gray-light text-sm uppercase tracking-wider mb-2">
                  Active Listings
                </h3>
                <p className="font-serif text-3xl text-white-accent">1,284</p>
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={14} className="rotate-180" /> -1.5% MoM
                </p>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.2
                }}
                className="bg-black-primary p-6 border border-gray-medium sm:col-span-2">
                
                <h3 className="text-gray-light text-sm uppercase tracking-wider mb-4">
                  Global Market Sentiment
                </h3>
                <div className="w-full bg-gray-dark h-2 rounded-full overflow-hidden">
                  <div className="bg-gold-gradient h-full w-[78%]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-medium">
                  <span>Bearish</span>
                  <span className="text-gold-primary">Bullish (78%)</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST FROM BLOG */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white-accent mb-4">
              The Journal
            </h2>
            <p className="text-gray-light">
              Insights on luxury living, design, and architecture.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-gold-primary hover:text-gold-light transition-colors">
            
            Read all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) =>
          <motion.article
            key={post.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            className="group cursor-pointer">
            
              <div className="relative aspect-[3/2] overflow-hidden mb-6">
                <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute top-4 left-4 bg-black-primary/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gold-primary uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-medium mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-medium"></span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-serif text-xl text-white-accent mb-3 group-hover:text-gold-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-light text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </motion.article>
          )}
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="py-24 bg-gray-dark border-y border-gray-medium">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-primary uppercase tracking-widest text-xs font-bold mb-4 block">
              Expert Services
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-6">
              Comprehensive Luxury Real Estate Solutions
            </h2>
            <p className="text-gray-light max-w-2xl mx-auto text-lg">
              From valuation to acquisition, we provide end-to-end expertise for discerning clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Valuation & Analysis',
                description: 'Proprietary algorithms and expert analysis for accurate property valuations'
              },
              {
                icon: Zap,
                title: 'Market Intelligence',
                description: 'Real-time data, trends, and forecasts for informed decision making'
              },
              {
                icon: Users,
                title: 'Private Advisory',
                description: 'Dedicated advisors for personalized buyer and seller representation'
              },
              {
                icon: Building,
                title: 'Development Consulting',
                description: 'Expert guidance on development opportunities and enhancement strategies'
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black-primary border border-gray-medium p-8 rounded-xl hover:border-gold-primary transition-all group cursor-pointer">
                <service.icon className="text-gold-primary mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-serif text-xl text-white-accent mb-3">{service.title}</h3>
                <p className="text-gray-light text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY CATEGORIES SECTION */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-gold-primary uppercase tracking-widest text-xs font-bold mb-4 block">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-6">
            Explore by Property Type
          </h2>
          <p className="text-gray-light max-w-2xl mx-auto text-lg">
            Discover exceptional properties across our exclusive portfolio categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Penthouses & Conde Nast Featured', count: '142 properties', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
            { name: 'Waterfront Estates', count: '89 properties', image: 'https://images.unsplash.com/photo-1600566753086-b82f5dc8e67a?w=800' },
            { name: 'Historic Manor Houses', count: '67 properties', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' },
            { name: 'Contemporary Villas', count: '156 properties', image: 'https://images.unsplash.com/photo-1600585154245-f5f7c7b2d1c5?w=800' },
            { name: 'Investment Properties', count: '203 properties', image: 'https://images.unsplash.com/photo-1600607687644-c310c327fedb?w=800' },
            { name: 'International Portfolio', count: '234 properties', image: 'https://images.unsplash.com/photo-1600558577882-bbed4ce0e203?w=800' }
          ].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-80">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white-accent">
                <h3 className="font-serif text-2xl mb-2 group-hover:text-gold-primary transition-colors">{category.name}</h3>
                <p className="text-gray-light text-sm">{category.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-gray-dark border-y border-gray-medium">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-gold-primary uppercase tracking-widest text-xs font-bold mb-4 block">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-6">
              Trusted by Elite Clients Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Tempest Gold's market intelligence gave us the competitive edge we needed. Their data-driven approach saved us millions.",
                author: 'Victoria Ashworth',
                title: 'Private Investor',
                rating: 5
              },
              {
                quote: "The advisory team treated our property as if it were their own. Professional, discreet, and results-driven.",
                author: 'James Chen',
                title: 'Luxury Developer',
                rating: 5
              },
              {
                quote: "Their valuation methodology is unmatched in accuracy. We've become their repeat clients across three continents.",
                author: 'Elena Rodriguez',
                title: 'Family Office Director',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black-primary border border-gray-medium p-8 rounded-xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold-primary text-gold-primary" />
                  ))}
                </div>
                <p className="text-white-accent mb-6 text-lg italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-serif text-white-accent font-medium">{testimonial.author}</p>
                  <p className="text-gold-primary text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & CREDENTIALS SECTION */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold-primary uppercase tracking-widest text-xs font-bold mb-4 block">
              Why Choose Tempest Gold
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-8 leading-tight">
              Credibility Built on Expertise & Excellence
            </h2>
            <ul className="space-y-4">
              {[
                '20+ years of experience in luxury real estate',
                '$50B+ in properties valued and transacted',
                '500+ exclusive client relationships',
                'Industry awards from leading institutions',
                'Proprietary valuation technology',
                '24/7 multilingual advisory support'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4">
                  <CheckCircle className="text-gold-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-light text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '20+', label: 'Years Experience' },
              { number: '$50B+', label: 'Assets Valued' },
              { number: '500+', label: 'Elite Clients' },
              { number: '145', label: 'Countries Served' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-dark border border-gray-medium p-8 rounded-xl text-center">
                <p className="font-serif text-4xl text-gold-primary mb-2">{stat.number}</p>
                <p className="text-gray-light text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP SECTION */}
      <section className="py-24 bg-gold-primary text-black-primary">
        <div className="container mx-auto px-6 md:px-12 max-w-2xl">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Insider Market Updates
            </h2>
            <p className="text-black/70 mb-8 text-lg">
              Get curated market insights, property opportunities, and expert analysis delivered to your inbox monthly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-black-primary text-white-accent placeholder-gray-dark focus:outline-none border border-black/20 focus:border-black-primary transition-colors" />
              
              <button
                type="submit"
                className="bg-black-primary text-white-accent px-8 py-4 rounded-lg font-medium hover:bg-gray-dark transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe <Mail size={16} />
              </button>
            </form>
            <p className="text-black/60 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gold-primary text-black-primary text-center px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Ready to find your masterpiece?
          </h2>
          <p className="text-black/70 mb-10 text-lg">
            Connect with our private client advisory team to begin your search
            or discuss listing your property.
          </p>
          <button className="bg-black-primary text-white-accent px-8 py-4 font-medium hover:bg-gray-dark transition-colors inline-flex items-center gap-2">
            Contact Advisory <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>);

}