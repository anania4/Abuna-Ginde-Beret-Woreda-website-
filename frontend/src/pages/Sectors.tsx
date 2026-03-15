import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Tractor,
  School,
  HeartPulse,
  Building2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Droplets,
  Gavel,
  Newspaper
} from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchSectors } from '../services/api';
import { getLocalized } from '../utils/lang';

interface SectorsProps {
  lang: Language;
}

const iconMap: Record<string, any> = {
  agriculture: Tractor,
  education: School,
  health: HeartPulse,
  administration: Building2,
  finance: Briefcase,
  security: ShieldCheck,
  water: Droplets,
  justice: Gavel,
  trade: Newspaper
};

export default function Sectors({ lang }: SectorsProps) {
  const t = translations[lang];
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSectors();
        setSectors(data as any[]);
      } catch (error) {
        console.error('Failed to load sectors:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
            >
              {t.sectorsTitle}
            </motion.h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t.sectorsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-white rounded-[3rem] animate-pulse border border-slate-100"></div>
              ))
            ) : sectors.length > 0 ? (
              sectors.map((sector, i) => {
                const Icon = iconMap[sector.slug] || iconMap[sector.name.toLowerCase()] || Building2;
                return (
                  <motion.div
                    key={sector.id || i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <Link to={`/sectors/${sector.id}`} className="block h-full p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                        <Icon className="w-32 h-32" />
                      </div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-woreda-green mb-8 group-hover:bg-woreda-green group-hover:text-white transition-colors">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{getLocalized(sector, 'name', lang)}</h3>
                        <div
                          className="text-slate-500 leading-relaxed mb-8 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: getLocalized(sector, 'description', lang) }}
                        />
                        <div className="flex items-center gap-2 text-sm font-black text-woreda-green uppercase tracking-widest">
                          Explore Sector <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <p>No sectors available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
