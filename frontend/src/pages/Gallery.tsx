import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, X, ZoomIn, Camera, History, Target, ArrowRight } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchGalleries } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface GalleryProps {
    lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
    const t = translations[lang];
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchGalleries();
                setGallery(data as any[]);
            } catch (error) {
                console.error('Failed to load gallery:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* IMMERSIVE HERO */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1492691523567-6170f0295dbd?auto=format&fit=crop&q=80&w=1920" 
                        alt="Gallery Background" 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/70 to-white"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-woreda-green/20 border border-woreda-green/30 text-woreda-green text-xs font-black uppercase tracking-[0.2em] mb-8">
                            <Camera className="w-4 h-4" />
                            Visual Archive
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            {t.navGallery || "Community Pulse"}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Documenting the spirit, growth, and development of Abuna Ginde Beret through the lens of our institutional Bureau.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* BENTO GRID GALLERY */}
            <section className="py-24 relative -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className={`bg-slate-50 rounded-[2.5rem] animate-pulse ${i % 3 === 0 ? 'lg:col-span-2' : ''}`}></div>
                            ))
                        ) : (
                            gallery.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedImage(item)}
                                    className={`relative group cursor-zoom-in overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 ${
                                        i % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : i % 3 === 0 ? 'lg:col-span-2' : ''
                                    }`}
                                >
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={getLocalized(item, 'title', lang)}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-woreda-green uppercase tracking-[0.2em] mb-4 bg-white/10 backdrop-blur w-fit px-3 py-1 rounded-lg">
                                            <ZoomIn className="w-3 h-3" /> Press to Expand
                                        </div>
                                        <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-2">
                                            {getLocalized(item, 'title', lang)}
                                        </h3>
                                        <div className="text-xs text-slate-400 font-light line-clamp-2">
                                            {getLocalized(item, 'description', lang)}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {!loading && gallery.length === 0 && (
                        <div className="text-center py-24">
                            <ImageIcon className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Archive Empty</h3>
                            <p className="text-slate-500 font-light">No visual records found in the repository.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-10 h-10" />
                        </button>
                        
                        <div className="max-w-6xl w-full flex flex-col items-center">
                            <motion.img
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                src={getImageUrl(selectedImage.image)}
                                alt={getLocalized(selectedImage, 'title', lang)}
                                className="max-h-[70vh] rounded-[3rem] shadow-2xl object-contain mb-12"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="text-center" onClick={(e) => e.stopPropagation()}>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                                    {getLocalized(selectedImage, 'title', lang)}
                                </h2>
                                <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
                                    {getLocalized(selectedImage, 'description', lang)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
