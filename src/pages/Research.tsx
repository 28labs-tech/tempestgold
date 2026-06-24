import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import {
  researchArticles,
  marketData,
  tickerData } from
'../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function Research() {
  return (
    <div className="min-h-screen bg-black-primary pt-20">
      <SeoHead
        title="Market Intelligence - Global Prime Property Research"
        description="Proprietary data, analysis, and insights on global prime residential markets. Expert commentary and trend forecasts for luxury real estate investors."
        url="/research"
      />
      {/* Ticker */}
      <div className="bg-gold-primary text-black-primary py-2 overflow-hidden flex whitespace-nowrap border-b border-gold-secondary">
        <div className="animate-ticker flex gap-8 font-mono text-sm font-bold">
          {tickerData.map((item, i) =>
          <span key={i}>{item}</span>
          )}
          {tickerData.map((item, i) =>
          <span key={`dup-${i}`}>{item}</span>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <header className="mb-12 border-b border-gray-dark pb-8">
          <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-4">
            Market Intelligence
          </h1>
          <p className="text-gray-light text-lg max-w-2xl">
            Proprietary data, analysis, and insights on global prime residential
            markets.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Articles Grid */}
            <section>
              <h2 className="font-serif text-2xl text-white-accent mb-6 border-b border-gray-dark pb-2">
                Latest Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {researchArticles.map((article) =>
                <Link
                  to={`/research/${article.id}`}
                  key={article.id}
                  className="group flex flex-col gap-3">
                  
                    <div className="relative aspect-video overflow-hidden bg-gray-dark">
                      <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    </div>
                    <span className="text-gold-primary text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl text-white-accent group-hover:text-gold-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-light text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-medium mt-auto pt-2">
                      <Clock size={12} />
                      <span>{article.date}</span>
                    </div>
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Data Table Widget */}
            <div className="bg-black-primary border border-gray-medium">
              <div className="bg-gray-dark p-4 border-b border-gray-medium">
                <h3 className="font-serif text-lg text-white-accent">
                  Market Movers
                </h3>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-light uppercase bg-black-primary border-b border-gray-medium">
                    <tr>
                      <th className="px-4 py-3 font-normal">City</th>
                      <th className="px-4 py-3 font-normal text-right">
                        Avg Price
                      </th>
                      <th className="px-4 py-3 font-normal text-right">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((data, idx) =>
                    <tr
                      key={idx}
                      className="border-b border-gray-dark hover:bg-gray-dark/50 transition-colors">
                      
                        <td className="px-4 py-3 font-medium text-white-accent">
                          {data.city}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-light">
                          {data.price}
                        </td>
                        <td
                        className={`px-4 py-3 text-right flex items-center justify-end gap-1 ${data.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        
                          {data.trend === 'up' ?
                        <ArrowUpRight size={14} /> :

                        <ArrowDownRight size={14} />
                        }
                          {data.change}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Read Widget */}
            <div>
              <h3 className="font-serif text-lg text-white-accent mb-4 border-b border-gray-dark pb-2">
                Most Read
              </h3>
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((num) =>
                <Link
                  to="#"
                  key={num}
                  className="group flex gap-4 items-start">
                  
                    <span className="text-gold-primary font-serif text-2xl leading-none opacity-50 group-hover:opacity-100 transition-opacity">
                      {num}
                    </span>
                    <div>
                      <h4 className="text-white-accent text-sm font-medium group-hover:text-gold-primary transition-colors line-clamp-2">
                        {researchArticles[num - 1]?.title ||
                      'The Future of Branded Residences in Emerging Markets'}
                      </h4>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Newsletter Promo */}
            <div className="bg-gold-primary p-6 text-black-primary">
              <h3 className="font-serif text-xl mb-2">Daily Briefing</h3>
              <p className="text-sm mb-4 opacity-80">
                Get the latest market intelligence delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-black-primary/10 border border-black-primary/20 p-2 mb-3 placeholder-black-primary/50 outline-none focus:border-black-primary" />
              
              <button className="w-full bg-black-primary text-white-accent py-2 text-sm font-medium hover:bg-gray-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}