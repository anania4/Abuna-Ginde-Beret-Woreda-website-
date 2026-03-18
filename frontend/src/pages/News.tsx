import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import * as CustomIcons from '../components/CustomIcons';
import { translations, Language } from '../constants';
import { fetchNews } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface NewsProps {
  lang: Language;
}

export default function News({ lang }: NewsProps) {
  const t = translations[lang];
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchNews();
        setNewsList(data as any[]);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredNews = newsList.filter(news => {
    const title = getLocalized(news, 'title', lang).toLowerCase();
    const content = getLocalized(news, 'content', lang).toLowerCase();
    return title.includes(searchTerm.toLowerCase()) || content.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white">
      {/* PREMIUM HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504711432869-5d39a160f647?auto=format&fit=crop&q=80&w=1920" 
            alt="News Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
              <CustomIcons.NewsIcon className="w-64 h-64 text-white" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md border border-white/10">
                <CustomIcons.NewsIcon className="w-3 h-3" />
                Official Press
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                {t.latestNews}
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                Stay connected with verified news, official bulletins, and development updates from the Abuna Ginde Beret administration.
              </p>
            </motion.div>
          </motion.div>

          {/* SEARCH BAR */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="relative">
              <CustomIcons.SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.searchNews}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white border-2 border-slate-100 rounded-3xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all font-light shadow-2xl shadow-slate-200/50"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="py-24 relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[450px] bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredNews.map((news, i) => (
                  <motion.div
                    layout
                    key={news.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <div className="flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          src={getImageUrl(news.image)}
                          alt={getLocalized(news, 'title', lang)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm text-slate-900 border border-white/20">
                          {news.category || "Bulletin"}
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-slate-400 mb-4 px-2">
                          <CustomIcons.CalendarIcon className="w-3.5 h-3.5 text-blue-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{new Date(news.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET')}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 line-clamp-2 leading-[1.1] tracking-tight group-hover:text-woreda-green transition-colors">
                          {getLocalized(news, 'title', lang)}
                        </h3>
                        
                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                          <Link
                            to={`/news/${news.id}`}
                            className="inline-flex items-center text-[10px] font-black text-slate-400 group-hover:text-woreda-green uppercase tracking-[0.2em] transition-all"
                          >
                            Read Report <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-woreda-green group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {!loading && filteredNews.length === 0 && (
            <div className="text-center py-20">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CustomIcons.SearchIcon className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.noNewsFound}</h3>
          <p className="text-slate-500 font-light">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  </section>
    </div>
  );
}
