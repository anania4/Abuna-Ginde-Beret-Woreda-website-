import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import * as CustomIcons from '../components/CustomIcons';
import { translations, Language } from '../constants';
import { fetchEventById } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface EventDetailProps {
    lang: Language;
}

export default function EventDetail({ lang }: EventDetailProps) {
    const t = translations[lang];
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (!id) return;
            try {
                const data = await fetchEventById(id);
                setEvent(data);
            } catch (err) {
                console.error('Failed to load event details:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-woreda-green"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Event Not Found</h2>
                <p className="text-slate-500 mb-8">The event you are looking for does not exist or has been removed.</p>
                <Link to="/events" className="px-6 py-3 bg-woreda-green text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                    Return to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/events" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-woreda-green mb-8 transition-colors uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>

                {event.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden mb-12 shadow-xl"
                    >
                        <img
                            src={getImageUrl(event.image)}
                            alt={getLocalized(event, 'title', lang)}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100"
                >
                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                        {event.event_date && (
                            <div className="flex items-center gap-2 text-woreda-green font-bold bg-emerald-50 px-4 py-2 rounded-lg">
                                <CustomIcons.CalendarIcon className="w-5 h-5" />
                                {new Date(event.event_date).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        )}

                        {event.location && (
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                                <CustomIcons.LocationIcon className="w-5 h-5" />
                                {getLocalized(event, 'location', lang)}
                            </div>
                        )}

                        {event.category && (
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                                <CustomIcons.TagIcon className="w-5 h-5" />
                                {event.category}
                            </div>
                        )}

                        {event.status && (
                            <div className={`px-4 py-2 rounded-lg text-sm font-black uppercase tracking-widest ${event.status === 'upcoming' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                {event.status}
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                        {getLocalized(event, 'title', lang)}
                    </h1>

                    <div
                        className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-woreda-green hover:prose-a:text-emerald-700"
                        dangerouslySetInnerHTML={{ __html: getLocalized(event, 'description', lang) || '' }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
