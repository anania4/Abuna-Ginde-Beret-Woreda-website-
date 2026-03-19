import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight } from 'lucide-react';
import * as CustomIcons from '../components/CustomIcons';
import { translations, Language } from '../constants';
import { fetchSectors } from '../services/api';
import { getLocalized } from '../utils/lang';

interface SectorsProps {
  lang: Language;
}

const iconMap: { [key: string]: any } = {
    'administration office': CustomIcons.AdminBuildingIcon,
    'the house office': CustomIcons.CouncilIcon,
    'agriculture and land': CustomIcons.AgriIcon,
    'road and logistics': CustomIcons.LogisticsIcon,
    'busa gonofa': CustomIcons.ReliefIcon,
    'finance office': CustomIcons.TreasuryIcon,
    'peace and militia': CustomIcons.SecurityIcon,
    'health office': CustomIcons.HealthIcon,
    'people\'s issues': CustomIcons.PublicDialogueIcon,
    'education office': CustomIcons.EducationIcon,
    'trade': CustomIcons.TradeIcon,
    'revenues office': CustomIcons.RevenueIcon,
    'water': CustomIcons.WaterIcon,
    'municipality': CustomIcons.CityIcon,
    'growth': CustomIcons.GrowthIcon,
    'strategic': CustomIcons.StrategicPlanIcon,
    'attorney': CustomIcons.JusticeIcon,
    'agriculture': CustomIcons.AgriIcon,
    'education': CustomIcons.EducationIcon,
    'health': CustomIcons.HealthIcon,
    'administration': CustomIcons.AdminBuildingIcon,
    'finance': CustomIcons.TreasuryIcon,
    'security': CustomIcons.SecurityIcon,
    'justice': CustomIcons.JusticeIcon,
};

export default function Sectors({ lang }: SectorsProps) {
  const t = translations[lang];
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredSectors = sectors.filter(sector => {
    const name = getLocalized(sector, 'name', lang).toLowerCase();
    const desc = getLocalized(sector, 'description', lang).toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white">
      {/* PREMIUM HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Hero Background" 
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-woreda-gold/20 border border-woreda-gold/30 text-woreda-gold text-xs font-black uppercase tracking-[0.2em] mb-8">
              <CustomIcons.LayoutIcon className="w-4 h-4" />
              Institutional Framework
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              {t.sectorsTitle}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Discover the specialized administrative offices driving sustainable development and community services across Abuna Ginde Beret.
            </p>
          </motion.div>

          {/* SEARCH BAR */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-woreda-green transition-colors" />
              <input 
                type="text"
                placeholder="Search sectors and departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white rounded-2xl shadow-2xl border-none text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-woreda-green/20 transition-all text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTORS GRID */}
      <section className="py-24 relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
              ))
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredSectors.map((sector, i) => {
                  const sectorName = sector.name_en?.toLowerCase() || "";
                  const searchKey = sector.icon_name?.toLowerCase() || sectorName;
                  let Icon = CustomIcons.AdminBuildingIcon;

                  // Try exact match first, then partial matches
                  if (iconMap[searchKey]) {
                      Icon = iconMap[searchKey];
                  } else {
                      const foundKey = Object.keys(iconMap).find(key => searchKey.includes(key));
                      if (foundKey) Icon = iconMap[foundKey];
                  }
                  
                  return (
                    <motion.div
                      layout
                      key={sector.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      className="group"
                    >
                      <Link 
                        to={`/sectors/${sector.id}`} 
                        className="flex flex-col h-full p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-woreda-green/10 transition-all duration-500 overflow-hidden relative"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Icon className="w-40 h-40 -rotate-12 translate-x-12" />
                        </div>

                        <div className="relative z-10">
                          <div className="w-16 h-16 rounded-[2rem] bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                  <CustomIcons.LayoutIcon className="w-8 h-8" />
                </div>
          

                          <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-woreda-green transition-colors">
                            {getLocalized(sector, 'name', lang)}
                          </h3>

                          <div 
                            className="text-slate-500 line-clamp-3 text-sm leading-relaxed mb-10"
                            dangerouslySetInnerHTML={{ __html: getLocalized(sector, 'description', lang) }}
                          />

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-woreda-green/40 group-hover:text-woreda-green transition-colors">
                              View Mandate <ArrowRight className="w-3 h-3" />
                            </div>
                            <div className="w-10 h-1 rounded-full bg-slate-100 group-hover:bg-woreda-green group-hover:w-20 transition-all duration-500"></div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {!loading && filteredSectors.length === 0 && (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No match found</h3>
              <p className="text-slate-500">We couldn't find any sector matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
