import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import * as CustomIcons from '../components/CustomIcons';
import { translations, Language } from '../constants';
import { fetchEvents } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface EventsProps {
    lang: Language;
}

export default function Events({ lang }: EventsProps) {
    const t = translations[lang];
    const [eventsList, setEventsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Ongoing' | 'Completed'>('All');

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchEvents();
                setEventsList(data as any[]);
            } catch (error) {
                console.error('Failed to load events:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredEvents = eventsList.filter(event => 
        filter === 'All' || event.status?.toLowerCase() === filter.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-white">
            {/* PREMIUM HERO SECTION */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1540575861501-7ce0e2204919?auto=format&fit=crop&q=80&w=1920" 
                        alt="Events Background" 
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
                            <CustomIcons.BellIcon className="w-4 h-4" />
                            Community Agenda
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            {t.navEvents || "Events"}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Participate in the growth and governance of our community. Explore upcoming meetings, festivals, and official ceremonies.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FILTER SECTION */}
            <section className="py-12 relative z-20 -mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-slate-100 flex flex-wrap items-center justify-center gap-4">
                        {['All', 'Upcoming', 'Ongoing', 'Completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab as any)}
                                className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                                    filter === tab 
                                    ? 'bg-woreda-green text-white shadow-lg shadow-emerald-500/30' 
                                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* EVENTS GRID */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
                        {loading ? (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
                            ))
                        ) : filteredEvents.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                                {filteredEvents.map((event, i) => (
                                    <motion.div
                                        layout
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group"
                                    >
                                        <div className="flex flex-col sm:flex-row bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                                            <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                                                <img
                                                    src={getImageUrl(event.image) || "https://images.unsplash.com/photo-1511578334221-6f173a4da63f?auto=format&fit=crop&q=80&w=800"}
                                                    alt={getLocalized(event, 'title', lang)}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div className={`absolute top-6 left-6 px-4 py-2 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm border border-white/20 ${
                                                    event.status?.toLowerCase() === 'upcoming' 
                                                    ? 'bg-woreda-green/90 text-white' 
                                                    : 'bg-white/90 text-slate-900'
                                                }`}>
                                                    {event.status || "Scheduled"}
                                                </div>
                                            </div>

                                            <div className="sm:w-3/5 p-10 flex flex-col">
                                                <div className="flex flex-wrap items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                    <CustomIcons.CalendarIcon className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <CustomIcons.LocationIcon className="w-4 h-4 text-blue-500" />
                                                    <span className="text-sm font-medium">{getLocalized(event, 'location', lang)}</span>
                                                </div>
                                                </div>

                                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-woreda-green transition-colors leading-tight">
                                                    {getLocalized(event, 'title', lang)}
                                                </h3>

                                                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 line-clamp-3">
                                                    {getLocalized(event, 'description', lang)?.replace(/<[^>]*>?/gm, '')}
                                                </p>

                                                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                                    <Link
                                                        to={`/events/${event.id}`}
                                                        className="text-[10px] font-black text-slate-400 group-hover:text-woreda-green uppercase tracking-[0.3em] transition-all flex items-center gap-2"
                                                    >
                                                        Join Event <ArrowRight className="w-3 h-3" />
                                                    </Link>
                                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-woreda-green group-hover:text-white transition-all transform group-hover:rotate-45">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="col-span-2 text-center py-24">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CustomIcons.CalendarIcon className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.noEventsFound}</h3>
                                <p className="text-slate-500 font-light">Stay tuned for future announcements and community gatherings.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
