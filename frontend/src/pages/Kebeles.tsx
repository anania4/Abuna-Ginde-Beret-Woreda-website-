import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, Building2, Home as HomeIcon, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchKebeles } from '../services/api';
import { getLocalized } from '../utils/lang';

interface KebelesProps {
    lang: Language;
}

export default function Kebeles({ lang }: KebelesProps) {
    const t = translations[lang];
    const [kebeles, setKebeles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'All' | 'Urban' | 'Rural'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchKebeles();
                setKebeles(data as any[]);
            } catch (error) {
                console.error('Failed to load kebeles:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredKebeles = kebeles.filter(k => {
        const matchesFilter = filter === 'All' || k.type === filter;
        const matchesSearch = getLocalized(k, 'name', lang).toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white">
            {/* PREMIUM HERO SECTION */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1500382017468-9049fee74982?auto=format&fit=crop&q=80&w=1920" 
                        alt="Kebeles Background" 
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
                            <ShieldCheck className="w-4 h-4" />
                            Administrative Backbone
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            {t.navKebeles || "Administrative Divisions"}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Explore the 44 administrative divisions of Abuna Ginde Beret. From vibrant urban centers to productive rural growth areas.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTROL BAR */}
            <section className="py-12 sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Locate a specific kebele..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-900"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 p-1.5 bg-slate-50 rounded-2xl">
                            {['All', 'Urban', 'Rural'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab as any)}
                                    className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                                        filter === tab 
                                        ? 'bg-white text-woreda-green shadow-sm' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Showing <span className="text-slate-900">{filteredKebeles.length}</span> Territorial Units
                        </div>
                    </div>
                </div>
            </section>

            {/* GRID SECTION */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
                            ))
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredKebeles.map((kebele, i) => (
                                    <motion.div
                                        layout
                                        key={kebele.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="group"
                                    >
                                        <div className="flex flex-col h-full p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-500/10 transition-all duration-500 relative overflow-hidden">
                                            {kebele.is_capital && (
                                                <div className="absolute top-0 right-0 py-2 px-10 bg-woreda-blue text-white text-[10px] font-black uppercase tracking-widest rotate-45 translate-x-8 translate-y-3 shadow-md">
                                                    Zonal Hub
                                                </div>
                                            )}

                                            <div className="flex items-center gap-6 mb-10">
                                                <div className={`p-4 rounded-2xl shadow-inner ${kebele.type === 'Urban' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {kebele.type === 'Urban' ? <Building2 className="w-8 h-8" /> : <HomeIcon className="w-8 h-8" />}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{getLocalized(kebele, 'name', lang)}</h3>
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                                                        <span className={kebele.type === 'Urban' ? 'text-blue-500' : 'text-emerald-500'}>{kebele.type}</span> Administration
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4 mb-10">
                                                {kebele.population && (
                                                    <div className="flex items-center justify-between py-4 border-b border-slate-50">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 flex items-center gap-2">
                                                            <Users className="w-4 h-4" /> Census Data
                                                        </span>
                                                        <span className="font-bold text-slate-900">{kebele.population}</span>
                                                    </div>
                                                )}
                                                
                                                {kebele.description && (
                                                    <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-3">
                                                        {getLocalized(kebele, 'description', lang)?.replace(/<[^>]*>?/gm, '')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                <button className="text-[10px] font-black text-slate-300 group-hover:text-emerald-600 tracking-[0.2em] uppercase transition-colors flex items-center gap-2">
                                                    District Profile <ArrowRight className="w-3 h-3" />
                                                </button>
                                                <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-emerald-500 transition-all group-hover:w-8"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
