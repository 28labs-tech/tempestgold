import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Award, Lightbulb, ArrowRight } from 'lucide-react';
import { companyStats } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function About() {
  return (
    <div className="min-h-screen bg-black-primary">
      <SeoHead
        title="About Tempest Gold Estates - Luxury Real Estate Excellence"
        description="Tempest Gold Estates curates the world's most exceptional properties. 20+ years of experience, $50B+ in assets valued. Integrity, excellence, and innovation."
        url="/about"
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Tempest Gold Estates Building"
            className="w-full h-full object-cover opacity-40" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black-primary" />
        </div>
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.span
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-gold-primary uppercase tracking-[0.2em] text-sm font-bold mb-4 block">
            
            Our Story
          </motion.span>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="font-serif text-5xl md:text-7xl text-white-accent">
            
            About Tempest Gold Estates
          </motion.h1>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24">
        {/* Mission Statement */}
        <section className="max-w-4xl mx-auto text-center mb-32">
          <motion.p
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
            className="font-serif text-2xl md:text-4xl text-white-accent leading-relaxed">
            
            "We believe that true luxury is found at the intersection of
            exceptional architecture, uncompromising privacy, and anticipatory
            service."
          </motion.p>
          <div className="w-24 h-1 bg-gold-primary mx-auto mt-12"></div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-gray-dark py-16">
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-gold-primary mb-2">
              {companyStats.yearsInBusiness}
            </div>
            <div className="text-gray-light text-sm uppercase tracking-wider">
              Years in Business
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-gold-primary mb-2">
              {companyStats.propertiesSold}
            </div>
            <div className="text-gray-light text-sm uppercase tracking-wider">
              Properties Sold
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-gold-primary mb-2">
              {companyStats.globalMarkets}
            </div>
            <div className="text-gray-light text-sm uppercase tracking-wider">
              Global Markets
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl text-gold-primary mb-2">
              {companyStats.clientSatisfaction}
            </div>
            <div className="text-gray-light text-sm uppercase tracking-wider">
              Client Satisfaction
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white-accent mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-light">
              The principles that guide every transaction and interaction.
            </p>
          </div>
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
              className="bg-gray-dark p-10 border border-gray-medium rounded-xl text-center hover:border-gold-primary transition-colors">
              
              <Shield className="text-gold-primary mx-auto mb-6" size={40} />
              <h3 className="font-serif text-2xl text-white-accent mb-4">
                Integrity
              </h3>
              <p className="text-gray-light">
                Absolute discretion and unwavering ethical standards in managing
                our clients' most valuable assets.
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
              className="bg-gray-dark p-10 border border-gray-medium rounded-xl text-center hover:border-gold-primary transition-colors">
              
              <Award className="text-gold-primary mx-auto mb-6" size={40} />
              <h3 className="font-serif text-2xl text-white-accent mb-4">
                Excellence
              </h3>
              <p className="text-gray-light">
                A commitment to curating only the most exceptional properties
                and delivering white-glove service.
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
              className="bg-gray-dark p-10 border border-gray-medium rounded-xl text-center hover:border-gold-primary transition-colors">
              
              <Lightbulb className="text-gold-primary mx-auto mb-6" size={40} />
              <h3 className="font-serif text-2xl text-white-accent mb-4">
                Innovation
              </h3>
              <p className="text-gray-light">
                Leveraging proprietary data and cutting-edge technology to
                provide unmatched market intelligence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto mb-32">
          <h2 className="font-serif text-3xl md:text-4xl text-white-accent mb-12 text-center">
            Our Journey
          </h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-medium before:to-transparent">
            {[
            {
              year: '2011',
              title: 'The Foundation',
              desc: 'Tempest Gold Estates is founded in London with a focus on historic Mayfair properties.'
            },
            {
              year: '2015',
              title: 'Global Expansion',
              desc: 'Opening of the New York and Dubai offices, establishing a truly international presence.'
            },
            {
              year: '2020',
              title: 'Tempest Gold Intelligence',
              desc: 'Launch of our proprietary research division, setting new standards for market data.'
            },
            {
              year: '2026',
              title: 'The Future',
              desc: 'Expanding into emerging luxury markets across Asia Pacific and pioneering sustainable luxury.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black-primary bg-gold-primary text-black-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-gray-dark bg-gray-dark/50 hover:border-gold-primary transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-white-accent">
                      {item.title}
                    </h3>
                    <span className="text-gold-primary font-mono text-sm">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-gray-light text-sm">{item.desc}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-primary rounded-2xl p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-black-primary mb-6">
            Experience the Tempest Gold Standard
          </h2>
          <p className="text-black/80 mb-8 max-w-2xl mx-auto">
            Whether you are acquiring a new asset or seeking to list an
            exceptional property, our advisory team is at your service.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-black-primary text-white-accent px-8 py-4 font-medium hover:bg-gray-dark transition-colors rounded-lg">
            
            Contact Us <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>);

}