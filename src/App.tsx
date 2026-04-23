import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { Research } from './pages/Research';
import { ResearchArticle } from './pages/ResearchArticle';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { Contact } from './pages/Contact';
import { Valuation } from './pages/Valuation';
export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black-primary font-sans text-white-accent">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:id" element={<ResearchArticle />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/journal" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/valuation" element={<Valuation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>);

}