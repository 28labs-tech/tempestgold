import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Share,
  Heart,
  Star,
  ChevronLeft,
  MapPin,
  Award,
  Shield } from
'lucide-react';
import { properties } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id) || properties[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
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
            className="inline-flex items-center gap-2 text-gray-light hover:text-gold-primary transition-colors mb-4 text-sm">
            
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
                  className="text-gold-primary fill-gold-primary" />
                {' '}
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
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[1]}
              alt="Gallery 1"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[2]}
              alt="Gallery 2"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[3]}
              alt="Gallery 3"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            
          </div>
          <div className="hidden md:block col-span-1 row-span-1 h-full">
            <img
              src={property.images[4]}
              alt="Gallery 4"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
            
          </div>
          <button className="absolute bottom-6 right-6 bg-white-accent text-black-primary px-4 py-2 rounded-lg font-medium text-sm border border-black shadow-lg hover:bg-gray-200 transition-colors">
            Show all photos
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Host Info */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-dark">
              <div>
                <h2 className="font-serif text-2xl text-white-accent mb-1">
                  Hosted by {property.host.name}
                </h2>
                <p className="text-gray-light text-sm">
                  {property.guests} guests • {property.bedrooms} bedrooms •{' '}
                  {property.beds} beds • {property.baths} baths
                </p>
              </div>
              <img
                src={property.host.image}
                alt={property.host.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-primary" />
              
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
                {property.amenities.map((amenity, index) =>
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-light">
                  
                    <Shield size={20} className="text-gold-primary/70" />
                    <span>{amenity}</span>
                  </div>
                )}
              </div>
              <button className="mt-8 border border-white-accent text-white-accent px-6 py-3 rounded-lg font-medium hover:bg-white-accent hover:text-black-primary transition-colors">
                Show all amenities
              </button>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-32 bg-gray-dark border border-gray-medium rounded-2xl p-6 shadow-2xl">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-semibold text-white-accent">
                    ₽{property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-light"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star
                    size={14}
                    className="text-gold-primary fill-gold-primary" />
                  
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
                    ₽{property.price.toLocaleString()} x 5 nights
                  </span>
                  <span>₽{(property.price * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-light">
                  <span className="underline">Cleaning fee</span>
                  <span>₽250</span>
                </div>
                <div className="flex justify-between text-gray-light">
                  <span className="underline">Service fee</span>
                  <span>₽450</span>
                </div>
              </div>

              <div className="border-t border-gray-medium mt-6 pt-6 flex justify-between font-semibold text-white-accent">
                <span>Total</span>
                <span>
                  ₽{(property.price * 5 + 250 + 450).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}