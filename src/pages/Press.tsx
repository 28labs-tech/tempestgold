import { ExternalLink, Download } from 'lucide-react';
import { pressReleases } from '../data/mockData';
import { SeoHead } from '../components/SeoHead';
export function Press() {
  const featuredPress = pressReleases[0];
  const remainingPress = pressReleases.slice(1);
  return (
    <div className="min-h-screen bg-black-primary pt-32 pb-24">
      <SeoHead
        title="Press & Media - Tempest Gold Newsroom"
        description="Latest press releases, media coverage, and news from Tempest Gold Estates. Featured in Financial Times, Bloomberg, Wall Street Journal, and Forbes."
        url="/press"
      />
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 border-b border-gray-dark pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-gold-primary text-sm font-bold uppercase tracking-widest mb-4 block">
              Newsroom
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-white-accent">
              Press & Media
            </h1>
          </div>
          <button className="inline-flex items-center gap-2 bg-gray-dark border border-gray-medium text-white-accent px-6 py-3 rounded-lg hover:border-gold-primary transition-colors text-sm font-medium">
            <Download size={16} /> Download Media Kit
          </button>
        </header>

        {/* Featured Press */}
        <section className="mb-16">
          <a
            href="#"
            className="group block bg-gray-dark border border-gray-medium p-8 md:p-12 rounded-xl hover:border-gold-primary transition-colors relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="text-gold-primary" size={24} />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-black-primary px-3 py-1 text-xs font-bold text-white-accent border border-gray-medium rounded uppercase tracking-wider">
                {featuredPress.publication}
              </span>
              <span className="text-gray-light text-sm">
                {featuredPress.date}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-6 group-hover:text-gold-primary transition-colors leading-tight max-w-4xl">
              {featuredPress.headline}
            </h2>
            <p className="text-gray-light text-lg max-w-3xl">
              {featuredPress.excerpt}
            </p>
          </a>
        </section>

        {/* Press Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {remainingPress.map((press) =>
          <a
            href="#"
            key={press.id}
            className="group bg-black-primary border border-gray-medium p-6 rounded-xl hover:bg-gray-dark transition-colors flex flex-col">
            
              <div className="flex items-center justify-between mb-4">
                <span className="text-gold-primary text-xs font-bold uppercase tracking-wider">
                  {press.publication}
                </span>
                <ExternalLink
                className="text-gray-medium group-hover:text-white-accent transition-colors"
                size={16} />
              
              </div>
              <h3 className="font-serif text-xl text-white-accent mb-3 group-hover:text-gold-primary transition-colors">
                {press.headline}
              </h3>
              <p className="text-gray-light text-sm mb-6 flex-grow">
                {press.excerpt}
              </p>
              <div className="text-xs text-gray-medium mt-auto pt-4 border-t border-gray-dark">
                {press.date}
              </div>
            </a>
          )}
        </section>

        {/* Press Contact */}
        <section className="bg-gold-primary rounded-xl p-8 md:p-12 text-black-primary flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl mb-2">Media Inquiries</h2>
            <p className="text-black/80 max-w-xl">
              For press inquiries, interview requests, or additional media
              assets, please contact our global communications team.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
            <a
              href="mailto:press@Tempest Goldestates.com"
              className="bg-black-primary text-white-accent px-8 py-4 rounded-lg font-medium text-center hover:bg-gray-dark transition-colors">
              
              press@tempestgoldestates.com
            </a>
            <p className="text-xs text-center text-black/60 font-medium">
              +1 (212) 555-0199
            </p>
          </div>
        </section>
      </div>
    </div>);

}