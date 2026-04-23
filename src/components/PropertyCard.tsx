import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    images: string[];
  };
  index?: number;
}
export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
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

        {/* Pagination Dots (Visual only for mock) */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-white-accent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
        </div>
      </Link>

      <button className="absolute top-3 right-3 p-2 text-white-accent hover:text-gold-primary transition-colors z-10">
        <Heart size={24} className="drop-shadow-md" />
      </button>

      <Link to={`/properties/${property.id}`} className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-white-accent truncate pr-4">
            {property.location}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} className="text-gold-primary fill-gold-primary" />
            <span>{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-light text-sm truncate">{property.title}</p>
        <div className="mt-1 flex items-center gap-1">
          <span className="font-semibold text-white-accent">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-gray-light text-sm">night</span>
        </div>
      </Link>
    </motion.div>);

}