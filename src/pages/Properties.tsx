import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  X,
  ChevronDown,
  Plus,
  Minus,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties, botswanaLocations, propertyTypes } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { SeoHead } from '../components/SeoHead';

interface FilterState {
  cities: string[];
  propertyTypes: string[];
  purpose: 'All' | 'For Sale' | 'To Let' | 'Development';
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minSize: string;
  maxSize: string;
  amenities: string[];
  sortBy: 'newest' | 'featured' | 'price-low' | 'price-high' | 'views';
}

const AMENITIES = [
  'Swimming Pool',
  'Garage',
  'Security',
  'Garden',
  'Balcony',
  'Air Conditioning',
  'Furnished',
  'Pets Allowed',
  'Backup Power',
  'Borehole',
  'Staff Quarters',
  'Fiber Internet'
];

const QUICK_PRICE_RANGES_SALE = [
  { label: 'Under P2.5M', min: 0, max: 2500000 },
  { label: 'P2.5M - P5M', min: 2500000, max: 5000000 },
  { label: 'P5M - P10M', min: 5000000, max: 10000000 },
  { label: 'Above P10M', min: 10000000, max: Infinity }
];

const QUICK_PRICE_RANGES_RENT = [
  { label: 'Under P8,500', min: 0, max: 8500 },
  { label: 'P8,500 - P15,000', min: 8500, max: 15000 },
  { label: 'P15,000 - P30,000', min: 15000, max: 30000 },
  { label: 'Above P30,000', min: 30000, max: Infinity }
];

export function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('location');

  const [filters, setFilters] = useState<FilterState>({
    cities: searchParams.getAll('cities') || [],
    propertyTypes: searchParams.getAll('types') || [],
    purpose: (searchParams.get('purpose') as FilterState['purpose']) || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minSize: searchParams.get('minSize') || '',
    maxSize: searchParams.get('maxSize') || '',
    amenities: searchParams.getAll('amenities') || [],
    sortBy: (searchParams.get('sortBy') as FilterState['sortBy']) || 'newest'
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.cities.length) filters.cities.forEach(c => params.append('cities', c));
    if (filters.propertyTypes.length) filters.propertyTypes.forEach(t => params.append('types', t));
    if (filters.purpose !== 'All') params.set('purpose', filters.purpose);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms) params.set('bathrooms', filters.bathrooms);
    if (filters.minSize) params.set('minSize', filters.minSize);
    if (filters.maxSize) params.set('maxSize', filters.maxSize);
    if (filters.amenities.length) filters.amenities.forEach(a => params.append('amenities', a));
    if (filters.sortBy !== 'newest') params.set('sortBy', filters.sortBy);

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleCity = useCallback((city: string) => {
    setFilters(prev => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter(c => c !== city)
        : [...prev.cities, city]
    }));
  }, []);

  const togglePropertyType = useCallback((type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  }, []);

  const toggleAmenity = useCallback((amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      cities: [],
      propertyTypes: [],
      purpose: 'All',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minSize: '',
      maxSize: '',
      amenities: [],
      sortBy: 'newest'
    });
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by cities
    if (filters.cities.length > 0) {
      result = result.filter(p => filters.cities.includes(p.city));
    }

    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      result = result.filter(p => filters.propertyTypes.includes(p.type));
    }

    // Filter by purpose
    if (filters.purpose !== 'All') {
      result = result.filter(p => p.purpose === filters.purpose);
    }

    // Filter by price
    if (filters.minPrice) {
      const min = parseInt(filters.minPrice);
      result = result.filter(p => {
        const price = filters.purpose === 'To Let' ? p.price_monthly || 0 : p.price;
        return price >= min;
      });
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice);
      result = result.filter(p => {
        const price = filters.purpose === 'To Let' ? p.price_monthly || 0 : p.price;
        return price <= max;
      });
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      const minBeds = parseInt(filters.bedrooms);
      result = result.filter(p => p.bedrooms >= minBeds);
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      const minBaths = parseInt(filters.bathrooms);
      result = result.filter(p => p.bathrooms >= minBaths);
    }

    // Filter by size
    if (filters.minSize) {
      const min = parseInt(filters.minSize);
      result = result.filter(p => p.size >= min);
    }

    if (filters.maxSize) {
      const max = parseInt(filters.maxSize);
      result = result.filter(p => p.size <= max);
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter(p =>
        filters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = filters.purpose === 'To Let' ? a.price_monthly || 0 : a.price;
          const priceB = filters.purpose === 'To Let' ? b.price_monthly || 0 : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = filters.purpose === 'To Let' ? a.price_monthly || 0 : a.price;
          const priceB = filters.purpose === 'To Let' ? b.price_monthly || 0 : b.price;
          return priceB - priceA;
        });
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'views':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.cities.length) count += filters.cities.length;
    if (filters.propertyTypes.length) count += filters.propertyTypes.length;
    if (filters.purpose !== 'All') count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.minSize) count++;
    if (filters.maxSize) count++;
    if (filters.amenities.length) count += filters.amenities.length;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-32">
      <SeoHead
        title="Luxury Properties - Botswana"
        description="Explore our exclusive portfolio of residential, commercial, industrial, and land properties across Botswana. Advanced filtering for prime real estate."
        url="/properties"
      />

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block fixed left-0 top-[72px] w-80 h-[calc(100vh-72px)] bg-black-primary border-r border-gray-dark overflow-y-auto z-20 pb-32">
        <div className="p-6 space-y-6 pb-32">
          <div className="flex items-center justify-between">
            <h3 className="text-white-accent font-semibold text-lg">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-gold-primary hover:text-gold-secondary transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Location Filter */}
          <FilterSection title="Location" expanded={true}>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {botswanaLocations.map(loc => (
                <label key={loc.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.cities.includes(loc.name)}
                    onChange={() => toggleCity(loc.name)}
                    className="w-4 h-4 rounded border-gray-medium bg-gray-dark accent-gold-primary cursor-pointer"
                  />
                  <span className="text-sm text-gray-light group-hover:text-white-accent transition-colors">
                    {loc.name}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Purpose Filter */}
          <FilterSection title="Listing Purpose">
            <div className="space-y-2">
              {['All', 'For Sale', 'To Let', 'Development'].map(purpose => (
                <button
                  key={purpose}
                  onClick={() => updateFilter('purpose', purpose as FilterState['purpose'])}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    filters.purpose === purpose
                      ? 'bg-gold-primary/20 text-gold-primary'
                      : 'text-gray-light hover:bg-gray-dark/50'
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Property Type Filter */}
          <FilterSection title="Property Type">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {propertyTypes.map(type => (
                <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.propertyTypes.includes(type.name)}
                    onChange={() => togglePropertyType(type.name)}
                    className="w-4 h-4 rounded border-gray-medium bg-gray-dark accent-gold-primary cursor-pointer"
                  />
                  <span className="text-sm text-gray-light group-hover:text-white-accent transition-colors">
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Filter */}
          <FilterSection title="Budget">
            <div className="space-y-3">
              {filters.purpose === 'To Let' && (
                <>
                  <div className="text-xs text-gray-light mb-2 font-medium">Quick Select (Monthly):</div>
                  {QUICK_PRICE_RANGES_RENT.map(range => (
                    <button
                      key={range.label}
                      onClick={() => {
                        updateFilter('minPrice', range.min.toString());
                        updateFilter('maxPrice', range.max === Infinity ? '' : range.max.toString());
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm text-gray-light hover:bg-gray-dark/50 transition-colors"
                    >
                      {range.label}
                    </button>
                  ))}
                </>
              )}
              {filters.purpose !== 'To Let' && (
                <>
                  <div className="text-xs text-gray-light mb-2 font-medium">Quick Select:</div>
                  {QUICK_PRICE_RANGES_SALE.map(range => (
                    <button
                      key={range.label}
                      onClick={() => {
                        updateFilter('minPrice', range.min.toString());
                        updateFilter('maxPrice', range.max === Infinity ? '' : range.max.toString());
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm text-gray-light hover:bg-gray-dark/50 transition-colors"
                    >
                      {range.label}
                    </button>
                  ))}
                </>
              )}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent placeholder-gray-medium text-sm focus:border-gold-primary outline-none transition-colors"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent placeholder-gray-medium text-sm focus:border-gold-primary outline-none transition-colors"
                />
              </div>
            </div>
          </FilterSection>

          {/* Bedrooms Filter */}
          <FilterSection title="Bedrooms">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateFilter('bedrooms', Math.max(0, parseInt(filters.bedrooms || '0') - 1).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded hover:border-gold-primary transition-colors"
              >
                <Minus size={16} className="text-gray-light" />
              </button>
              <input
                type="number"
                value={filters.bedrooms}
                onChange={(e) => updateFilter('bedrooms', e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent text-center focus:border-gold-primary outline-none transition-colors"
              />
              <button
                onClick={() => updateFilter('bedrooms', (parseInt(filters.bedrooms || '0') + 1).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded hover:border-gold-primary transition-colors"
              >
                <Plus size={16} className="text-gray-light" />
              </button>
            </div>
          </FilterSection>

          {/* Bathrooms Filter */}
          <FilterSection title="Bathrooms">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateFilter('bathrooms', Math.max(0, parseInt(filters.bathrooms || '0') - 1).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded hover:border-gold-primary transition-colors"
              >
                <Minus size={16} className="text-gray-light" />
              </button>
              <input
                type="number"
                value={filters.bathrooms}
                onChange={(e) => updateFilter('bathrooms', e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent text-center focus:border-gold-primary outline-none transition-colors"
              />
              <button
                onClick={() => updateFilter('bathrooms', (parseInt(filters.bathrooms || '0') + 1).toString())}
                className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded hover:border-gold-primary transition-colors"
              >
                <Plus size={16} className="text-gray-light" />
              </button>
            </div>
          </FilterSection>

          {/* Size Filter */}
          <FilterSection title="Property Size (sqm)">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minSize}
                onChange={(e) => updateFilter('minSize', e.target.value)}
                className="px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent placeholder-gray-medium text-sm focus:border-gold-primary outline-none transition-colors"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxSize}
                onChange={(e) => updateFilter('maxSize', e.target.value)}
                className="px-3 py-2 rounded bg-gray-dark border border-gray-medium text-white-accent placeholder-gray-medium text-sm focus:border-gold-primary outline-none transition-colors"
              />
            </div>
          </FilterSection>

          {/* Amenities Filter */}
          <FilterSection title="Features & Amenities">
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                    filters.amenities.includes(amenity)
                      ? 'bg-gold-primary text-black-primary'
                      : 'bg-gray-dark text-gray-light border border-gray-medium hover:border-gold-primary'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Sort Filter */}
          <FilterSection title="Sort By">
            <div className="space-y-2">
              {[
                { value: 'newest' as const, label: 'Newest Listings' },
                { value: 'featured' as const, label: 'Featured Listings' },
                { value: 'price-low' as const, label: 'Price Low → High' },
                { value: 'price-high' as const, label: 'Price High → Low' },
                { value: 'views' as const, label: 'Most Viewed' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateFilter('sortBy', option.value)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-gold-primary/20 text-gold-primary'
                      : 'text-gray-light hover:bg-gray-dark/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Filter Button & Header */}
      <div className="sticky top-[72px] z-30 lg:hidden bg-black-primary/90 backdrop-blur-md border-b border-gray-dark">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-white-accent font-semibold">Properties</h1>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gold-primary text-black-primary rounded-lg font-medium"
          >
            <Filter size={18} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowMobileFilter(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-black-primary overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-black-primary border-b border-gray-dark p-6 flex items-center justify-between">
                <h2 className="text-white-accent font-semibold text-lg">Filters</h2>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 hover:bg-gray-dark rounded transition-colors"
                >
                  <X size={24} className="text-gray-light" />
                </button>
              </div>

              <div className="p-6 space-y-4 pb-32">
                {/* Mobile Filter Sections */}
                <MobileFilterSection
                  title="Location"
                  expanded={expandedSection === 'location'}
                  onToggle={() => setExpandedSection(expandedSection === 'location' ? null : 'location')}
                >
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {botswanaLocations.map(loc => (
                      <label key={loc.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.cities.includes(loc.name)}
                          onChange={() => toggleCity(loc.name)}
                          className="w-4 h-4 rounded accent-gold-primary"
                        />
                        <span className="text-sm text-gray-light">{loc.name}</span>
                      </label>
                    ))}
                  </div>
                </MobileFilterSection>

                <MobileFilterSection
                  title="Purpose"
                  expanded={expandedSection === 'purpose'}
                  onToggle={() => setExpandedSection(expandedSection === 'purpose' ? null : 'purpose')}
                >
                  <div className="space-y-2">
                    {['All', 'For Sale', 'To Let', 'Development'].map(purpose => (
                      <button
                        key={purpose}
                        onClick={() => updateFilter('purpose', purpose as FilterState['purpose'])}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          filters.purpose === purpose
                            ? 'bg-gold-primary/20 text-gold-primary'
                            : 'text-gray-light'
                        }`}
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                </MobileFilterSection>

                <MobileFilterSection
                  title="Property Type"
                  expanded={expandedSection === 'type'}
                  onToggle={() => setExpandedSection(expandedSection === 'type' ? null : 'type')}
                >
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {propertyTypes.map(type => (
                      <label key={type.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.propertyTypes.includes(type.name)}
                          onChange={() => togglePropertyType(type.name)}
                          className="w-4 h-4 rounded accent-gold-primary"
                        />
                        <span className="text-sm text-gray-light">{type.name}</span>
                      </label>
                    ))}
                  </div>
                </MobileFilterSection>

                <MobileFilterSection
                  title="Bedrooms"
                  expanded={expandedSection === 'bedrooms'}
                  onToggle={() => setExpandedSection(expandedSection === 'bedrooms' ? null : 'bedrooms')}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateFilter('bedrooms', Math.max(0, parseInt(filters.bedrooms || '0') - 1).toString())}
                      className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={filters.bedrooms}
                      onChange={(e) => updateFilter('bedrooms', e.target.value)}
                      className="flex-1 px-3 py-2 rounded bg-gray-dark border border-gray-medium text-center"
                    />
                    <button
                      onClick={() => updateFilter('bedrooms', (parseInt(filters.bedrooms || '0') + 1).toString())}
                      className="w-10 h-10 flex items-center justify-center bg-gray-dark border border-gray-medium rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </MobileFilterSection>

                <button
                  onClick={() => {
                    setShowMobileFilter(false);
                  }}
                  className="w-full bg-gold-primary text-black-primary py-3 rounded-lg font-bold mt-6"
                >
                  Apply Filters
                </button>
                
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-dark border border-gray-medium text-gray-light py-3 rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar Spacer */}
        <div className="hidden lg:block w-80 flex-shrink-0"></div>

        {/* Properties Grid */}
        <div className="flex-1 px-6 py-8 pb-32">
          <div className="container mx-auto px-6 md:px-0">
            {/* Results Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-white-accent font-semibold text-xl hidden lg:block">
                  {filteredProperties.length} Properties Found
                </h1>
                <p className="text-gray-light text-sm">
                  {filteredProperties.length} properties match your filters
                </p>
              </div>
              
              {/* Sort Dropdown (Mobile) */}
              <div className="lg:hidden">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
                  className="px-3 py-2 bg-gray-dark border border-gray-medium text-white-accent rounded text-sm focus:border-gold-primary outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price Low</option>
                  <option value="price-high">Price High</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 ? (
              <div className="py-24 text-center">
                <div className="mb-4">
                  <MapPin size={48} className="mx-auto text-gray-dark mb-4" />
                </div>
                <h2 className="text-white-accent text-2xl font-semibold mb-2">
                  No properties match your filters
                </h2>
                <p className="text-gray-light mb-8">
                  Try adjusting your search criteria to find properties
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gold-primary text-black-primary rounded-lg font-bold hover:bg-gold-secondary transition-colors"
                >
                  Clear Filters & View All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Section Component
function FilterSection({
  title,
  expanded = false,
  children
}: {
  title: string;
  expanded?: boolean;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  return (
    <div className="border-b border-gray-dark pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 text-white-accent hover:text-gold-primary transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && <div className="pt-4">{children}</div>}
    </div>
  );
}

// Mobile Filter Section Component
function MobileFilterSection({
  title,
  expanded,
  onToggle,
  children
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-dark pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-white-accent"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pt-4 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}