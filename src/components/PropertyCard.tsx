import { Link } from 'react-router-dom';
import { Heart, Star, Building } from 'lucide-react';
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
  const isSale = property.purpose === 'For Sale' || property.purpose === 'Development';
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
      className={`group relative flex flex-col gap-3 p-3 rounded-2xl transition-all duration-500 bg-gray-dark/20 border ${
        isSale
          ? 'border-gold-primary/10 hover:border-gold-primary/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]'
          : 'border-transparent hover:border-gray-medium/50'
      }`}
    >
      <Link
        to={`/properties/${property.id}`}
        className="block relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-dark"
      >
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-gold-primary text-black-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Featured
          </div>
        )}

        {/* Purpose Badge */}
        <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
          isSale
            ? 'bg-gold-primary text-black-primary'
            : 'bg-black/75 text-white-accent'
        }`}>
          {property.purpose}
        </div>
      </Link>

      <button className="absolute top-6 right-6 p-2 text-white-accent hover:text-gold-primary transition-colors z-10">
        <Heart size={20} className="drop-shadow-md" />
      </button>

      <Link to={`/properties/${property.id}`} className="flex flex-col gap-1 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-lg text-white-accent truncate pr-4 group-hover:text-gold-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-light bg-gray-dark/40 px-1.5 py-0.5 rounded">
            <Star size={12} className="text-gold-primary fill-gold-primary" />
            <span className="text-white-accent font-semibold">{property.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-light text-xs truncate">{property.location}</p>
        
        {/* Property Details */}
        <div className="flex gap-3 text-xs text-gray-medium mt-2">
          <span>{property.bedrooms} bed</span>
          <span>•</span>
          <span>{property.bathrooms} bath</span>
          <span>•</span>
          <span>{property.size} sqm</span>
        </div>

        {/* Price or Call to Action */}
        <div className="mt-auto pt-3 border-t border-gray-dark/50 flex items-center justify-between">
          {isSale ? (
            <span className="font-serif text-xs text-gold-primary tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Building size={12} />
              Price Upon Request
            </span>
          ) : (
            <>
              <span className="font-semibold text-white-accent">
                P{displayPrice?.toLocaleString() || 'N/A'}
              </span>
              <span className="text-gray-medium text-xs">
                /month
              </span>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}