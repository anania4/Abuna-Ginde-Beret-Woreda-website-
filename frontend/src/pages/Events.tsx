import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Calendar, MapPin } from 'lucide-react';
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

    return (
        <div className="pt-24">
            <section className="py-24 bg-slate-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
                    >
                        {t.navEvents || "Events"}
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">Stay informed about upcoming and past events in our Woreda.</p>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {loading ? (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-64 bg-slate-50 rounded-3xl animate-pulse border border-slate-100 p-8 flex flex-col justify-between">
                                    <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                                    <div className="h-24 bg-slate-200 rounded w-full"></div>
                                </div>
                            ))
                        ) : eventsList.length > 0 ? (
                            eventsList.map((event, i) => (
                                <motion.div
                                    key={event.id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 group flex flex-col sm:flex-row h-full"
                                >
                                    <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                                        {event.image ? (
                                            <img
                                                src={getImageUrl(event.image)}
                                                alt={getLocalized(event, 'title', lang)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                                <Calendar className="w-12 h-12 text-slate-300" />
                                            </div>
                                        )}

                                        {event.status && (
                                            <div className={`absolute top-6 left-6 px-3 py-1 backdrop-blur text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-sm ${event.status === 'upcoming' ? 'bg-emerald-500/90 text-white' : 'bg-white/90 text-slate-900'}`}>
                                                {event.status}
                                            </div>
                                        )}
                                    </div>
                                    <div className="sm:w-3/5 p-8 flex flex-col flex-grow">
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                                            {event.event_date && (
                                                <span className="flex items-center gap-1 text-woreda-green">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(event.event_date).toLocaleDateString()}
                                                </span>
                                            )}
                                            {event.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {getLocalized(event, 'location', lang)}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-woreda-green transition-colors leading-tight">
                                            {getLocalized(event, 'title', lang)}
                                        </h3>
                                        <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                                            {getLocalized(event, 'description', lang)?.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100">
                                            <Link
                                                to={`/events/${event.id}`}
                                                className="inline-flex items-center text-sm font-black text-woreda-green uppercase tracking-widest hover:gap-3 transition-all"
                                            >
                                                Event Details <ChevronRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-12 text-slate-400">
                                <p>No upcoming events found at this time.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
