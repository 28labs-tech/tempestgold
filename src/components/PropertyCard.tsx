import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    city: string;
    price: number;
    price_monthly?: number;
    purpose: string;
    type: string;
    rating: number;
    reviews: number;
    images: string[];
    featured?: boolean;
    bedrooms: number;
    bathrooms: number;
    size: number;
  };
  index?: number;
}
export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const isRental = property.purpose === 'To Let';
  const displayPrice = isRental ? property.price_monthly : property.price;

  return (
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
        duration: 0.5,
        delay: index * 0.1
      }}
      className="group relative flex flex-col gap-3">
      
      <Link
        to={`/properties/${property.id}`}
        className="block relative aspect-[4/3] overflow-hidden rounded-xl">
        
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-gold-primary text-black-primary px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}

        {/* Purpose Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white-accent px-2 py-1 rounded text-xs font-medium">
          {property.purpose}
        </div>
      </Link>

      <button className="absolute top-3 right-3 p-2 text-white-accent hover:text-gold-primary transition-colors z-10">
        <Heart size={24} className="drop-shadow-md" />
      </button>

      <Link to={`/properties/${property.id}`} className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-white-accent truncate pr-4">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="text-gold-primary fill-gold-primary" />
            <span>{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-light text-xs truncate">{property.location}</p>
        
        {/* Property Details */}
        <div className="flex gap-3 text-xs text-gray-light mt-2">
          <span>{property.bedrooms} bed</span>
          <span>•</span>
          <span>{property.bathrooms} bath</span>
          <span>•</span>
          <span>{property.size} sqm</span>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-dark flex items-center justify-between">
          <span className="font-semibold text-white-accent">
            P{displayPrice?.toLocaleString() || 'N/A'}
          </span>
          <span className="text-gray-light text-xs">
            {isRental ? '/month' : ''}
          </span>
        </div>
      </Link>
    </motion.div>);

}