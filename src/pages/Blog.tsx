import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function Blog() {
  const [activeTab, setActiveTab] = useState('All');
  const categories = [
  'All',
  'Design',
  'Lifestyle',
  'Technology',
  'Architecture'];

  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);
  
  // Filter posts based on active category
  const filteredPosts = activeTab === 'All' 
    ? remainingPosts 
    : blogPosts.filter(post => post.category === activeTab && post.id !== featuredPost.id);
  return (
    <div className="min-h-screen bg-black-primary pt-24 pb-24">
      <SeoHead
        title="The Blog - Luxury Living & Architecture"
        description="Curated perspectives on luxury living, architectural innovation, and the art of the exceptional home. Insights from Tempest Gold's editorial team."
        url="/blog"
      />
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6">
            The Blog
          </h1>
          <p className="text-gray-light text-lg">
            Curated perspectives on luxury living, architectural innovation, and
            the art of the exceptional home.
          </p>
        </header>

        {/* Categories */}
        <div className="flex items-center justify-center gap-6 overflow-x-auto hide-scrollbar mb-16 pb-2">
          {categories.map((category) =>
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`whitespace-nowrap text-sm font-medium transition-colors pb-2 border-b-2 ${activeTab === category ? 'text-gold-primary border-gold-primary' : 'text-gray-light border-transparent hover:text-white-accent'}`}>
            
              {category}
            </button>
          )}
        </div>

        {/* Featured Post */}
        {activeTab === 'All' &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mb-16">
          
            <Link
            to={`/blog/${featuredPost.id}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-dark/30 border border-gray-dark hover:border-gray-medium transition-colors rounded-2xl overflow-hidden">
            
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-gold-primary text-xs font-bold uppercase tracking-widest mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white-accent mb-4 group-hover:text-gold-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-light text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-medium">
                  <span className="text-white-accent">
                    {featuredPost.author}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        }

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(
            (post, index) =>
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
              }}>
              
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                    <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                    <div className="absolute top-4 left-4 bg-black-primary/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gold-primary uppercase tracking-wider rounded-sm">
                      {post.category}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-white-accent mb-3 group-hover:text-gold-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-light text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-medium">
                    <span className="text-white-accent">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              </motion.article>

          )}
        </div>
      </div>
    </div>);

}