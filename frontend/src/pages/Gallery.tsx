import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../constants';
import { fetchGalleries } from '../services/api';
import { getImageUrl } from '../config';

interface GalleryProps {
  lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
  const t = translations[lang];
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchGalleries();
        setGalleries(data as any[]);
      } catch (error) {
        console.error('Failed to load gallery data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-24">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
            >
              {t.galleryTitle}
            </motion.h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t.gallerySubtitle}</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-slate-50 rounded-[2rem] animate-pulse"></div>
              ))
            ) : galleries.length > 0 ? (
              galleries.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.1 }}
                  className="relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all break-inside-avoid mb-8"
                >
                  <img
                    src={getImageUrl(img.img)}
                    alt={img.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                    <span className="text-xs font-black text-woreda-green uppercase tracking-widest mb-2">{img.category || "General"}</span>
                    <h3 className="text-2xl font-bold text-white">{img.title}</h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 col-span-3">
                <p>No images in the gallery yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
