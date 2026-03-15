import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Calendar } from 'lucide-react';
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

  return (
    <div className="pt-24">
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
          >
            {t.latestNews}
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Stay informed about the latest developments and official announcements from our Woreda.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-50 rounded-3xl animate-pulse border border-slate-100"></div>
              ))
            ) : newsList.length > 0 ? (
              newsList.map((news, i) => (
                <motion.div
                  key={news.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 group flex flex-col h-full"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={getImageUrl(news.image)}
                      alt={getLocalized(news, 'title', lang)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-sm">
                      {news.category || "General"}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(news.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 line-clamp-2 group-hover:text-woreda-green transition-colors leading-tight">
                      {getLocalized(news, 'title', lang)}
                    </h3>
                    <div className="mt-auto">
                      <Link
                        to={`/news/${news.id}`}
                        className="inline-flex items-center text-sm font-black text-woreda-green uppercase tracking-widest hover:gap-3 transition-all"
                      >
                        Read Full Article <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <p>No news articles found at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
