import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, Facebook, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Layout({ children, lang, setLang }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleLang = () => {
    const langs: Language[] = ['en', 'om'];
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  const navItems = [
    { name: t.navHome, href: '/' },
    { name: t.navAbout, href: '/about' },
    { name: t.navSectors, href: '/sectors' },
    { name: t.navServices, href: '/services' },
    { name: t.navEvents, href: '/events' },
    { name: t.navKebeles, href: '/kebeles' },
    { name: t.navGallery, href: '/gallery' },
    { name: t.navContact, href: '/contact' },
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'glass py-2 gov-shadow' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-woreda-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <div>
                <h1 className={`text-lg font-bold leading-tight ${scrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'}`}>{t.title}</h1>
                <p className="text-[10px] text-woreda-green font-bold uppercase tracking-widest">{t.subtitle}</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-woreda-green' : 'text-white/80 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-woreda-green" />
                {lang.toUpperCase()}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleLang} className={`p-2 ${scrolled || location.pathname !== '/' ? 'text-slate-600' : 'text-white'}`}>
                <Globe className="w-5 h-5" />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${scrolled || location.pathname !== '/' ? 'text-slate-600' : 'text-white'}`}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-2xl font-bold text-slate-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-woreda-green rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight">{t.title}</h3>
                  <p className="text-[10px] text-woreda-green font-bold uppercase tracking-widest">{t.subtitle}</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                {t.footerTagline}
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-woreda-green transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-400">Quick Links</h4>
              <ul className="space-y-4 text-slate-300">
                {navItems.map(item => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-400">Resources</h4>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors">Public Documents <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors">Tenders <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors">Job Openings <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            {t.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
