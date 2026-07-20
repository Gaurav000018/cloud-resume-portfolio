import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { FaChevronUp, FaTerminal } from 'react-icons/fa';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [path, setPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Router listener
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Loading animation boot simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600); // 1.6s boot screen
    return () => clearTimeout(timer);
  }, []);

  // Scrollspy and Scroll-to-top handler
  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top visibility
      setShowScrollTop(window.scrollY > 400);

      // Section tracking for Scrollspy
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    setPath('/');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Loading boot screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center font-mono text-xs text-blue-400 p-6">
        <div className="max-w-md w-full space-y-3 glass-panel p-6 rounded-xl border-slate-800 shadow-2xl">
          <div className="flex items-center space-x-2 border-b border-slate-900 pb-3 mb-4 text-slate-500">
            <FaTerminal className="text-blue-500" />
            <span>sys-boot-sequence.sh</span>
          </div>
          <p className="text-slate-500">[2026-07-19T01:34:45] Booting portfolio cluster...</p>
          <p className="text-green-500">✔ Loading core assets (images, stylesheets)</p>
          <p className="text-green-500">✔ Initializing docker-container service</p>
          <p className="text-green-500">✔ Connecting AWS S3 assets registry</p>
          <p className="text-blue-500 animate-pulse mt-4">Initializing connection, please wait...</p>
        </div>
      </div>
    );
  }

  // 2. 404 Route Handler
  if (path !== '/' && path !== '' && path !== '/index.html') {
    return <NotFound onBackToHome={handleBackToHome} />;
  }

  // 3. Main Single Page Layout
  return (
    <div className="min-h-screen bg-slate-950 transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-base" />
        </button>
      )}
    </div>
  );
}
