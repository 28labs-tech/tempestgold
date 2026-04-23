import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import { teamMembers } from '../data/mockData';
export function Team() {
  return (
    <div className="min-h-screen bg-black-primary pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
            Our People
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6">
            Our Leadership
          </h1>
          <p className="text-gray-light text-lg">
            The visionaries, strategists, and experts driving the future of
            global luxury real estate.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) =>
          <motion.div
            key={member.id}
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
            className="group relative bg-gray-dark border border-gray-medium rounded-lg overflow-hidden hover:border-gold-primary transition-colors">
            
              <div className="aspect-[4/5] overflow-hidden">
                <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
              
              </div>
              <div className="p-4 relative">
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-serif text-lg text-white-accent mb-1">
                  {member.name}
                </h3>
                <p className="text-gold-primary text-xs font-medium mb-2">
                  {member.title}
                </p>
                <p className="text-gray-light text-xs mb-4 line-clamp-2">
                  {member.bio}
                </p>
                <div className="flex items-center gap-3">
                  <a
                  href={member.social.linkedin}
                  className="text-gray-medium hover:text-white-accent transition-colors">
                  
                    <Linkedin size={16} />
                  </a>
                  <a
                  href={member.social.twitter}
                  className="text-gray-medium hover:text-white-accent transition-colors">
                  
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}