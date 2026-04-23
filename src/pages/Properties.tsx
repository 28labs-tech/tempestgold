import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Map as MapIcon } from 'lucide-react';
import { properties, priceRanges } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
export function Properties() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  
  const searchLocation = searchParams.get('location');
  const searchType = searchParams.get('type');
  const searchPrice = searchParams.get('price');
  const searchSize = searchParams.get('size');
  
  const tabs = ['All', 'Villas', 'Apartments', 'Penthouses', 'Commercial'];
  
  // Helper function to get price range
  const getPriceRange = (rangeName: string): { min: number; max: number } => {
    const range = priceRanges.find(r => r.name === rangeName);
    if (!range) return { min: 0, max: Infinity };
    
    const [min, max] = range.range.split('-').map(v => v.replace('+', ''));
    return {
      min: parseInt(min),
      max: max ? parseInt(max) : Infinity
    };
  };
  
  // Helper function to map size range to bedrooms
  const getSizeBedroomRange = (sizeName: string): { min: number; max: number } => {
    switch(sizeName) {
      case '0 - 3,000 sqft': return { min: 1, max: 2 };
      case '3,000 - 5,000 sqft': return { min: 3, max: 4 };
      case '5,000 - 10,000 sqft': return { min: 5, max: 7 };
      case '10,000+ sqft': return { min: 8, max: Infinity };
      default: return { min: 0, max: Infinity };
    }
  };
  
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Filter by type
      if (activeTab !== 'All' && property.type !== activeTab) return false;
      
      // Filter by search location (partial match)
      if (searchLocation && !property.location.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }
      
      // Filter by search type
      if (searchType && property.type !== searchType) return false;
      
      // Filter by search price (nightly rate as proxy)
      if (searchPrice) {
        const priceRange = getPriceRange(searchPrice);
        if (property.price < priceRange.min || property.price > priceRange.max) return false;
      }
      
      // Filter by search size (bedrooms as proxy)
      if (searchSize) {
        const sizeRange = getSizeBedroomRange(searchSize);
        if (property.bedrooms < sizeRange.min || property.bedrooms > sizeRange.max) return false;
      }
      
      return true;
    });
  }, [activeTab, searchLocation, searchType, searchPrice, searchSize]);
  
  const hasActiveSearchFilters = !!(searchLocation || searchType || searchPrice || searchSize);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-12">
      {/* Filter Bar */}
      <div className="sticky top-[72px] z-40 bg-black-primary/90 backdrop-blur-md border-b border-gray-dark py-4">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {tabs.map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm font-medium transition-colors pb-2 border-b-2 ${activeTab === tab ? 'text-gold-primary border-gold-primary' : 'text-gray-light border-transparent hover:text-white-accent'}`}>
              
                {tab}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button className="flex items-center gap-2 border border-gray-medium rounded-full py-2 px-4 text-sm text-white-accent hover:border-gold-primary transition-colors">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 border border-gray-medium rounded-full py-2 px-4 text-sm text-white-accent hover:border-gold-primary transition-colors md:hidden">
              <MapIcon size={16} /> Map
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 md:px-12 py-8">
        {hasActiveSearchFilters && (
          <div className="mb-8 p-4 bg-gold-primary/10 border border-gold-primary/30 rounded-lg">
            <h3 className="text-white-accent font-medium mb-3">Active Search Filters:</h3>
            <div className="flex flex-wrap gap-3">
              {searchLocation && <span className="bg-gold-primary/20 text-gold-primary px-3 py-1 rounded-full text-sm">Location: {searchLocation}</span>}
              {searchType && <span className="bg-gold-primary/20 text-gold-primary px-3 py-1 rounded-full text-sm">Type: {searchType}</span>}
              {searchPrice && <span className="bg-gold-primary/20 text-gold-primary px-3 py-1 rounded-full text-sm">Budget: {searchPrice}</span>}
              {searchSize && <span className="bg-gold-primary/20 text-gold-primary px-3 py-1 rounded-full text-sm">Size: {searchSize}</span>}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {filteredProperties.length > 0 ? 
            filteredProperties.map((property, index) =>
            <PropertyCard key={property.id} property={property} index={index} />
            )
          :
            <div className="col-span-full text-center py-12">
              <p className="text-gray-light text-lg">No properties match your search criteria.</p>
            </div>
          }
        </div>
      </div>

      {/* Floating Map Button (Mobile) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <button className="bg-gray-dark text-white-accent px-6 py-3 rounded-full flex items-center gap-2 shadow-xl border border-gray-medium">
          <span>Map</span> <MapIcon size={18} />
        </button>
      </div>
    </div>);

}