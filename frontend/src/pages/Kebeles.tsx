import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Building2, Home as HomeIcon } from 'lucide-react';
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

    const filteredKebeles = kebeles.filter(k => filter === 'All' || k.type === filter);

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <section className="py-24 bg-woreda-green text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        {t.navKebeles || "Administrative Divisions"}
                    </motion.h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">Explore the urban and rural kebeles that make up Abuna Ginde Beret Woreda.</p>
                </div>
            </section>

            <section className="py-12 bg-white border-b border-slate-200 sticky top-20 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4">
                        {['All', 'Urban', 'Rural'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type as any)}
                                className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${filter === type
                                        ? 'bg-woreda-green text-white shadow-lg shadow-emerald-500/30'
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                            >
                                {type} Kebeles
                            </button>
                        ))}
                    </div>

                    <div className="text-slate-500 font-medium">
                        Showing <strong className="text-slate-900">{filteredKebeles.length}</strong> Divisions
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 bg-white rounded-3xl animate-pulse shadow-sm border border-slate-100 p-8">
                                    <div className="h-8 bg-slate-200 rounded w-1/2 mb-6"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                                    <div className="h-24 bg-slate-200 rounded w-full"></div>
                                </div>
                            ))
                        ) : filteredKebeles.length > 0 ? (
                            filteredKebeles.map((kebele, i) => (
                                <motion.div
                                    key={kebele.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                                >
                                    {kebele.is_capital && (
                                        <div className="absolute top-0 right-0 py-2 px-10 bg-woreda-blue text-white text-[10px] font-black uppercase tracking-widest rotate-45 translate-x-8 translate-y-3 shadow-md">
                                            Capital
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 rounded-2xl ${kebele.type === 'Urban' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {kebele.type === 'Urban' ? <Building2 className="w-8 h-8" /> : <HomeIcon className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 leading-none mb-2">{getLocalized(kebele, 'name', lang)}</h3>
                                           <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                                                <span className={kebele.type === 'Urban' ? 'text-blue-500' : 'text-emerald-500'}>{kebele.type}</span> Kebele
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8 text-sm">
                                        {kebele.population && (
                                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                                <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Population</span>
                                                <span className="font-bold text-slate-900">{kebele.population}</span>
                                            </div>
                                        )}
                                    </div>

                                    {kebele.description && (
                                        <p className="text-slate-600 line-clamp-3 leading-relaxed">
                                            {getLocalized(kebele, 'description', lang)?.replace(/<[^>]*>?/gm, '')}
                                       </p>
                                    )}

                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
                                <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Divisions Found</h3>
                                <p>There are currently no administrative divisions matching this filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
