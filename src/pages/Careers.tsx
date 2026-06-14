import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Laptop, ArrowRight, MapPin } from 'lucide-react';
import { careerPositions } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function Careers() {
  const [activeTab, setActiveTab] = useState('All');
  const departments = [
  'All',
  ...Array.from(new Set(careerPositions.map((p) => p.department)))];

  const filteredPositions =
  activeTab === 'All' ?
  careerPositions :
  careerPositions.filter((p) => p.department === activeTab);
  return (
    <div className="min-h-screen bg-black-primary pt-32 pb-24">
      <SeoHead
        title="Careers - Join Tempest Gold"
        description="Build the future of luxury real estate with a global team of innovators, advisors, and creators. Explore open positions at Tempest Gold Estates."
        url="/careers"
      />
      <div className="container mx-auto px-6 md:px-12">
        {/* Hero */}
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
            Careers
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6">
            Join Our Team
          </h1>
          <p className="text-gray-light text-lg">
            Build the future of luxury real estate with a global team of
            innovators, advisors, and creators.
          </p>
        </header>

        {/* Culture / Benefits */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="bg-gray-dark p-8 rounded-xl border border-gray-medium">
              
              <Laptop className="text-gold-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-white-accent mb-3">
                Remote Flexibility
              </h3>
              <p className="text-gray-light text-sm leading-relaxed">
                Work from anywhere or join us in one of our 28 global offices.
                We value output and excellence over location.
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
              className="bg-gray-dark p-8 rounded-xl border border-gray-medium">
              
              <TrendingUp className="text-gold-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-white-accent mb-3">
                Accelerated Growth
              </h3>
              <p className="text-gray-light text-sm leading-relaxed">
                Access unparalleled resources, mentorship, and opportunities to
                advance your career in the ultra-luxury sector.
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
              className="bg-gray-dark p-8 rounded-xl border border-gray-medium">
              
              <Globe className="text-gold-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-white-accent mb-3">
                Global Network
              </h3>
              <p className="text-gray-light text-sm leading-relaxed">
                Collaborate with top-tier professionals across continents and
                build relationships with the world's most influential clients.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <h2 className="font-serif text-3xl text-white-accent mb-8">
            Open Positions
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar mb-8 pb-2">
            {departments.map((dept) =>
            <button
              key={dept}
              onClick={() => setActiveTab(dept)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeTab === dept ? 'bg-gold-primary text-black-primary border-gold-primary' : 'bg-transparent text-gray-light border-gray-medium hover:border-white-accent hover:text-white-accent'}`}>
              
                {dept}
              </button>
            )}
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {filteredPositions.map((position, index) =>
            <motion.div
              key={position.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.05
              }}
              className="group bg-black-primary border border-gray-medium rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-light transition-colors relative overflow-hidden">
              
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-gold-primary text-xs font-bold uppercase tracking-wider">
                      {position.department}
                    </span>
                    <span className="text-gray-medium text-xs">•</span>
                    <span className="flex items-center gap-1 text-gray-light text-xs">
                      <MapPin size={12} /> {position.location}
                    </span>
                    <span className="text-gray-medium text-xs">•</span>
                    <span className="text-gray-light text-xs">
                      {position.type}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white-accent mb-2">
                    {position.title}
                  </h3>
                  <p className="text-gray-light text-sm max-w-2xl">
                    {position.description}
                  </p>
                </div>

                <Link
                to="/contact"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-white-accent text-black-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                
                  Apply Now <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>);

}