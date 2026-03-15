import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ExternalLink, Search, ShieldCheck, Briefcase, FileText, ArrowRight, Zap, Phone } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchServices } from '../services/api';
import { getLocalized } from '../utils/lang';

interface ServicesProps {
    lang: Language;
}

export default function Services({ lang }: ServicesProps) {
    const t = translations[lang];
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchServices();
                setServices(data as any[]);
            } catch (error) {
                console.error('Failed to load services:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredServices = services.filter(service => 
        getLocalized(service, 'title', lang).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getLocalized(service, 'description', lang).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const iconMap: { [key: string]: any } = {
        'default': <FileText className="w-8 h-8" />,
        'licensing': <ShieldCheck className="w-8 h-8" />,
        'business': <Briefcase className="w-8 h-8" />,
        'rapid': <Zap className="w-8 h-8" />,
    };

    return (
        <div className="min-h-screen bg-white">
            {/* PREMIUM HERO SECTION */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
                        alt="Services Background" 
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-woreda-blue/20 border border-woreda-blue/30 text-woreda-blue text-xs font-black uppercase tracking-[0.2em] mb-8">
                            <ShieldCheck className="w-4 h-4" />
                            Public Service Charter
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            {t.navServices || "E-Services"}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Access official government services, permits, and documentation. Streamlining governance for every citizen.
                        </p>
                    </motion.div>

                    {/* SEARCHBAR */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 max-w-xl mx-auto"
                    >
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-woreda-blue transition-colors" />
                            <input 
                                type="text"
                                placeholder="What service are you looking for?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 bg-white rounded-2xl shadow-2xl border-none text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-woreda-blue/20 transition-all text-lg"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-24 relative -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-80 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
                            ))
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredServices.map((service, i) => (
                                    <motion.div
                                        layout
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group"
                                    >
                                        <div className="h-full p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-woreda-blue/10 transition-all duration-500 flex flex-col relative overflow-hidden">
                                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-woreda-blue/5 transition-colors duration-500"></div>
                                            
                                            <div className="mb-10 relative">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-woreda-blue group-hover:text-white transition-all duration-500 shadow-inner">
                                                    {iconMap[service.icon_name] || iconMap.default}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-woreda-blue transition-colors leading-[1.1]">
                                                {getLocalized(service, 'title', lang)}
                                            </h3>

                                            <p className="text-sm text-slate-500 font-light leading-relaxed mb-10 line-clamp-3">
                                                {getLocalized(service, 'description', lang)}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                                {service.external_link ? (
                                                    <a
                                                        href={service.external_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[10px] font-black text-slate-400 group-hover:text-woreda-blue uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                                                    >
                                                        Access Portal <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                ) : (
                                                    <button className="text-[10px] font-black text-slate-400 group-hover:text-woreda-blue uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                                                        Service Details <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-woreda-blue group-hover:text-white transition-all group-hover:rotate-[-45deg]">
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {!loading && filteredServices.length === 0 && (
                        <div className="text-center py-24">
                            <Search className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No services found</h3>
                            <p className="text-slate-500 font-light">Try searching with a different term.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* HELP SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex p-4 bg-woreda-green/10 text-woreda-green rounded-full mb-8">
                        <Phone className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Need Assistance?</h2>
                    <p className="text-xl text-slate-500 mb-12 font-light">Our help desk is available during office hours to guide you through any application process.</p>
                    <Link to="/contact" className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 uppercase tracking-widest text-xs">
                        Contact Support
                    </Link>
                </div>
            </section>
        </div>
    );
}
