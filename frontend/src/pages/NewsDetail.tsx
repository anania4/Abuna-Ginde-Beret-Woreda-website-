import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Share2, Printer } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchNewsById } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface NewsDetailProps {
  lang: Language;
}

export default function NewsDetail({ lang }: NewsDetailProps) {
  const { id } = useParams();
  const t = translations[lang];
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const data = await fetchNewsById(id);
        setNews(data);
      } catch (error) {
        console.error('Failed to load news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-48 pb-24 text-center">
        <div className="w-16 h-16 border-4 border-woreda-green border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <p className="text-slate-500">Loading article...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
        <Link to="/news" className="text-woreda-green font-bold hover:underline">Back to News</Link>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-woreda-green transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-woreda-green/10 text-woreda-green text-[10px] font-black uppercase tracking-widest rounded">
              {news.category || "General"}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <Calendar className="w-3 h-3" /> {new Date(news.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
            {getLocalized(news, 'title', lang)}
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16">
            <img
              src={getImageUrl(news.image)}
              alt={getLocalized(news, 'title', lang)}
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="prose prose-lg prose-slate max-w-none">
                <div
                  className="text-lg text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: getLocalized(news, 'content', lang) }}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Actions</h4>
                <div className="flex flex-col gap-4">
                  <button className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-woreda-green transition-colors">
                    <Share2 className="w-4 h-4" /> Share Article
                  </button>
                  <button className="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-woreda-green transition-colors">
                    <Printer className="w-4 h-4" /> Print Page
                  </button>
                </div>
              </div>

              <div className="p-8 bg-woreda-green/5 rounded-3xl border border-woreda-green/10">
                <h4 className="text-xs font-black text-woreda-green uppercase tracking-[0.2em] mb-4">Official Notice</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This is an official announcement from the Abuna Ginde Beret Woreda Communication Office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
