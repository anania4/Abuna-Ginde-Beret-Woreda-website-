import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations, Language } from '../constants';
import {
  fetchNews,
  fetchEvents,
  fetchAdminMessage,
  fetchGlobalSettings,
  fetchSectors,
  fetchProjects,
  fetchGalleries
} from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';
import * as CustomIcons from '../components/CustomIcons';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  lang: Language;
}

export default function Home({ lang }: HomeProps) {
  const t = translations[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [adminMessage, setAdminMessage] = useState<any>(null);
  const [globalSettings, setGlobalSettings] = useState<any>(null);
  const [sectors, setSectors] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [galleries, setGalleries] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fetch all data from API
  useEffect(() => {
    async function loadData() {
      try {
        const [newsData, eventsData, adminData, settingsData, sectorsData, projectsData, galleryData] = await Promise.all([
          fetchNews(),
          fetchEvents(),
          fetchAdminMessage(),
          fetchGlobalSettings(),
          fetchSectors(),
          fetchProjects(),
          fetchGalleries()
        ]);

        setNews((newsData as any).slice(0, 3));
        setEvents((eventsData as any).slice(0, 3));
        setAdminMessage(adminData);
        setGlobalSettings(settingsData);
        setSectors((sectorsData as any).slice(0, 9));
        setProjects((projectsData as any).slice(0, 2));
        setGalleries((galleryData as any).slice(0, 6));
      } catch (error) {
        console.error('Failed to load home page data:', error);
      } finally {
        setNewsLoading(false);
      }
    }
    loadData();
  }, []);

  // GSAP Parallax Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 150,
        opacity: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Stats animation
  useEffect(() => {
    const stats = document.querySelectorAll('.stat-item');

    gsap.fromTo(stats,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const slides = [
    {
      title: t.heroTitle,
      desc: t.heroDesc,
      video: "https://assets.mixkit.co/videos/preview/mixkit-agriculture-worker-walking-through-a-field-of-crops-4241-large.mp4",
      poster: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
    },
    {
      title: "Rich Cultural Heritage",
      desc: "Experience the vibrant Oromo culture, traditional Gadaa system, and the festivals that define our people.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-traditional-dance-performance-in-a-village-4244-large.mp4",
      poster: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80"
    },
    {
      title: "Agricultural Excellence",
      desc: "Proud producers of the finest honey, teff, and coffee. We are the backbone of sustainable living in Oromia.",
      video: "https://assets.mixkit.co/videos/preview/mixkit-farmer-working-in-a-field-of-crops-4240-large.mp4",
      poster: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
      {/* SLEEK MODERN HERO SLIDER */}
      <motion.section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden bg-slate-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={slides[currentSlide].poster}
              className="absolute inset-0 w-full h-full object-cover"
              src={slides[currentSlide].video}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-slate-900/60 z-0 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-0"></div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10 pt-20">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tight drop-shadow-2xl">
                  {slides[currentSlide].title}
                </h1>

                <div className="w-24 h-1 bg-emerald-500 rounded-full mb-8"></div>

                <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed mb-12 max-w-3xl font-light drop-shadow-lg">
                  {slides[currentSlide].desc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/services"
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center gap-3"
                  >
                    Our Services <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/about"
                    className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl transition-colors border border-white/20"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating background particles (Optional, soft touch) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/40 rounded-full blur-[1px]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Minimalist Slider Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="text-white hover:text-emerald-400 transition-colors p-2"
          >
            <ChevronLeft className="w-8 h-8 opacity-70 hover:opacity-100" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all rounded-full ${currentSlide === i
                  ? 'w-12 bg-emerald-400'
                  : 'w-6 bg-white/30 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="text-white hover:text-emerald-400 transition-colors p-2"
          >
            <ChevronRight className="w-8 h-8 opacity-70 hover:opacity-100" />
          </button>
        </div>
      </motion.section>

      {/* 2. Standardized About & Stats (Administrator Message) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-white relative overflow-hidden stats-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100">
                <CustomIcons.UsersIcon className="w-3 h-3 text-emerald-500" />
                Community Insight
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                {t.aboutTitle}
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 max-w-xl border-l-4 border-emerald-500/20 pl-6">
                {t.aboutSubtitle} Abuna Ginde Beret is a land of diverse landscapes, rich cultural heritage, and hardworking people committed to sustainable growth.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: t.statsResidents, value: (globalSettings as any)?.resident_count?.toLocaleString() || "150,000+", icon: CustomIcons.PopulationIcon, color: "text-blue-600", bg: "bg-blue-50", accent: "group-hover:text-emerald-500" },
                  { label: "Kebeles", value: (globalSettings as any)?.kebele_count || "44", icon: CustomIcons.MapPinIcon, color: "text-blue-600", bg: "bg-blue-50", accent: "group-hover:text-emerald-500" },
                  { label: "Agriculture", value: (globalSettings as any)?.agriculture_percentage || "95%", icon: CustomIcons.AgriIcon, color: "text-blue-600", bg: "bg-blue-50", accent: "group-hover:text-emerald-500" },
                  { label: "Education", value: (globalSettings as any)?.school_count || "44", icon: CustomIcons.EducationIcon, color: "text-blue-600", bg: "bg-blue-50", accent: "group-hover:text-emerald-500" },
                ].map((stat, i) => (
                  <div key={i} className="group stat-item flex items-center gap-4 p-5 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500">
                    <div className={`p-3 rounded-xl ${stat.bg} shadow-sm ${stat.color} ${stat.accent} transition-colors`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 relative group bg-slate-50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Abuna Ginde Beret Landscape" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                
                {/* Visual Accent */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -right-8 glass p-10 rounded-[3rem] shadow-2xl max-w-[320px] gov-shadow border border-white/40"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                    <CustomIcons.QuoteIcon className="w-20 h-20 text-blue-300/30 mb-8" />
                  <p className="text-base font-medium text-slate-800 italic leading-relaxed">
                    "A vibrant community where heritage meets progress, fostering sustainable growth for every citizen."
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-black text-slate-900 text-sm uppercase tracking-tight">Abuna Ginde Beret</div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Regional Excellence</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CustomIcons.CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. HIGH-PREMIUM Institutional Sectors */}
      <motion.section 
        id="sectors" 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1 }} 
        className="py-32 bg-slate-950 overflow-hidden relative"
      >
        {/* Abstract Background Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-blue-500/20">
                <CustomIcons.LayoutIcon className="w-3.5 h-3.5 text-emerald-400" />
                Institutional Framework
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[0.9] drop-shadow-2xl">
                {t.sectorsTitle}
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl drop-shadow-lg border-l-2 border-emerald-500/30 pl-8">
                The administrative pillars driving socio-economic transformation across Abuna Ginde Beret.
              </p>
            </div>
            <Link 
              to="/sectors" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black rounded-full hover:bg-white hover:text-slate-950 transition-all duration-500 uppercase tracking-widest text-xs overflow-hidden"
            >
              <span className="relative z-10">Explore All Bureaus</span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.length > 0 ? sectors.map((sector, i) => {
              const sectorName = (sector.name_en || sector.name || "").toLowerCase();
              const localIconMap: Record<string, any> = {
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
                // Fallbacks for specific keyword matches
                agriculture: CustomIcons.AgriIcon,
                education: CustomIcons.EducationIcon,
                health: CustomIcons.HealthIcon,
                administration: CustomIcons.AdminBuildingIcon,
                finance: CustomIcons.TreasuryIcon,
                security: CustomIcons.SecurityIcon,
                justice: CustomIcons.JusticeIcon,
              };

              // Identify icon based on name or specified icon_name
              const searchKey = sector.icon_name?.toLowerCase() || sectorName;
              let Icon = CustomIcons.AdminBuildingIcon; // Default

              // Try exact match first, then partial matches
              if (localIconMap[searchKey]) {
                Icon = localIconMap[searchKey];
              } else {
                const foundKey = Object.keys(localIconMap).find(key => searchKey.includes(key));
                if (foundKey) Icon = localIconMap[foundKey];
              }

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group perspective"
                >
                  <Link 
                    to={`/sectors/${sector.id}`}
                    className="flex flex-col h-full p-12 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] hover:bg-white/[0.07] hover:border-blue-500/30 transition-all duration-700 relative overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] shadow-2xl"
                  >
                    {/* Glowing Accent */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700" />
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 mb-10 shadow-2xl">
                        <Icon className="w-8 h-8 group-hover:text-emerald-300 transition-colors" />
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                        {getLocalized(sector, 'name', lang)}
                      </h3>
                      
                      <p className="text-slate-400 font-light text-sm leading-relaxed mb-12 line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity">
                        Official mandate of the {getLocalized(sector, 'name', lang)} Bureau.
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-emerald-400 transition-colors">Digital Governance</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            }) : (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse" />
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* 4. Standardized Latest Updates */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <CustomIcons.NewspaperIcon className="w-3.5 h-3.5" />
                News Bureau
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">{t.latestNews}</h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">Stay informed with the latest governmental updates and regional news.</p>
            </div>
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white shadow-sm transition-all group uppercase tracking-widest text-[10px]"
            >
              {t.viewAll} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 animate-pulse h-[450px]" />
              ))
            ) : news.length > 0 ? (
              news.map((newsItem, i) => (
                <motion.div
                  key={newsItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/news/${newsItem.id}`} className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={getImageUrl(newsItem.img)}
                        alt={getLocalized(newsItem, 'title', lang)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                        {newsItem.category || "Official"}
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mb-4">
                        {new Date(newsItem.date || newsItem.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-6 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                        {getLocalized(newsItem, 'title', lang)}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-600 transition-colors">Read Full Release</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-400 font-light">
                No active news bulletins at this time.
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* 5. Standardized Woreda Gallery Preview */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-50">
                <CustomIcons.LayoutIcon className="w-3.5 h-3.5 text-emerald-500" />
                Visual Archive
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Community <span className="border-b-4 border-emerald-500/20">Gallery</span></h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">A window into the vibrant landscapes and cultural life of our community.</p>
            </div>
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-50 text-slate-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all group uppercase tracking-widest text-[10px] border border-transparent hover:border-emerald-500/30"
            >
              Explore Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.length > 0 ? galleries.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 hover:border-emerald-500/20"
              >
                <img
                  src={getImageUrl(item.img)}
                  alt={getLocalized(item, 'title', lang)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">{item.category || "Media"}</span>
                  <p className="text-white font-black text-xl tracking-tight leading-tight group-hover:text-sky-300 transition-colors">{getLocalized(item, 'title', lang)}</p>
                </div>
              </motion.div>
            )) : (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[4/3] bg-slate-100 rounded-[2.5rem] animate-pulse" />
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* 6. Standardized Development Progress */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100">
              <CustomIcons.BriefcaseIcon className="w-3.5 h-3.5 text-emerald-500" />
              Strategic Growth
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Development <span className="text-blue-600">Progress</span></h2>
            <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">Real-time status of key infrastructure and modernization projects across the region.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.length > 0 ? projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-12 bg-white rounded-[3rem] border border-slate-100 group shadow-sm hover:shadow-2xl transition-all duration-500 relative"
              >
                {/* Subtle Emerald Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-bl-[2rem] transition-colors" />

                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg">
                      {project.status || 'Planned'}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-6 tracking-tight group-hover:text-blue-600 transition-colors uppercase leading-[0.9]">{getLocalized(project, 'title', lang)}</h3>
                    {project.milestone && (
                      <div className="text-[10px] font-black text-blue-600 mt-4 uppercase tracking-[0.1em] flex items-center gap-2">
                        <div className="w-2 h-[1px] bg-emerald-500" />
                        Current: {getLocalized(project, 'milestone', lang)}
                      </div>
                    )}
                  </div>
                  <div className="text-5xl font-black text-slate-100 group-hover:text-blue-600/20 transition-colors tracking-tighter relative">
                    {project.percent || 0}%
                    <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mb-10 text-[10px] text-slate-400 font-black uppercase tracking-widest border-y border-slate-50 py-4">
                  {project.start_date && (
                    <div className="flex items-center gap-2">
                      <CustomIcons.CalendarIcon className="w-3.5 h-3.5" />
                      {new Date(project.start_date).toLocaleDateString()}
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 font-black">Target</span>
                      {new Date(project.end_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div
                  className="text-sm text-slate-500 mb-10 leading-relaxed line-clamp-2 font-light italic border-l-2 border-emerald-500/20 pl-4"
                  dangerouslySetInnerHTML={{ __html: getLocalized(project, 'description', lang) }}
                />
                
                <div className="relative mb-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-slate-400">
                    <span>Task Completion</span>
                    <span className="text-blue-600">{project.percent || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden relative shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.percent || 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${project.percent > 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' : 'bg-slate-300'}`}
                    />
                    {/* Progress Cursor Accent */}
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-emerald-400" />
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full mt-10 p-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] shadow-xl group/btn overflow-hidden relative"
                >
                  <span className="relative z-10">Project Dashboard</span>
                  <CustomIcons.ExternalLinkIcon className="w-4 h-4 relative z-10" />
                  <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                </button>
              </motion.div>
            )) : (
              <div className="col-span-2 text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-400">
                <p>Strategic project portfolio mapping in progress.</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Administrator Message */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#0ea5e9,transparent)]"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-emerald-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Executive Message
            </div>
          </div>
          
          <div className="relative">
            <span className="absolute -top-12 -left-8 text-9xl text-blue-500/10 font-serif leading-none italic select-none">“</span>
            <div 
              className="text-3xl md:text-5xl font-light text-white italic leading-tight text-center relative z-10 border-x-2 border-emerald-500/10 px-12"
              dangerouslySetInnerHTML={{ __html: getLocalized(adminMessage, 'message', lang) || (t as any).adminMessageDesc }}
            />
            <span className="absolute -bottom-12 -right-8 text-9xl text-blue-500/10 font-serif leading-none italic select-none">”</span>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-80 h-80 md:w-96 md:h-96 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-7xl mb-16 border-4 border-blue-600 shadow-3xl overflow-hidden relative z-10">
                {adminMessage?.image ? (
                  <img src={getImageUrl(adminMessage.image)} alt={getLocalized(adminMessage, 'administrator_name', lang)} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
                    {adminMessage?.administrator_name?.[0] || "A"}
                  </div>
                )}
                {/* Emerald Hint on Photo Frame */}
                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-14 lg:right-14 w-16 h-16 bg-emerald-500 rounded-full border-[10px] border-slate-800 flex items-center justify-center shadow-2xl">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-black text-white mb-2 tracking-tight">
                {getLocalized(adminMessage, 'administrator_name', lang) || t.adminName}
              </h4>
              <p className="text-blue-400 text-sm font-black uppercase tracking-[0.2em] opacity-80 flex items-center gap-2 justify-center">
                <span className="w-4 h-[1px] bg-emerald-500" />
                {adminMessage?.role || t.adminRole}
                <span className="w-4 h-[1px] bg-emerald-500" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Standardized Community Voices */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <CustomIcons.QuoteIcon className="w-3.5 h-3.5" />
              Public Sentiment
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Voice of the People</h2>
            <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto">Real impacts of administrative excellence, shared directly by our residents.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Tadese Hirpha", role: "Local Farmer", text: "The new access road to Beke Kelate has changed my life. I can now transport my teff to the market in half the time." },
              { name: "Alemitu Gemechu", role: "Teacher", text: "Seeing the new high school laboratory makes me hopeful for my children's future. Education is truly prioritized here." },
              { name: "Girma Tolosa", role: "Elder", text: "The health extension workers are very active in our kebele. We feel supported and cared for by our administration." },
            ].map((voice, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <CustomIcons.QuoteIcon className="w-16 h-16 text-emerald-600 opacity-[0.03] absolute top-8 left-8" />
                <p className="text-slate-600 italic mb-10 relative z-10 pt-6 leading-relaxed font-light text-lg">"{voice.text}"</p>
                <div className="flex items-center gap-5 mt-auto pt-8 border-t border-slate-100">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-emerald-600 shadow-sm border border-slate-100 text-xl">{voice.name[0]}</div>
                  <div>
                    <div className="font-black text-slate-900 tracking-tight uppercase text-xs">{voice.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{voice.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 8. Standardized Upcoming Events */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-24 bg-slate-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100/30">
                <CustomIcons.CalendarIcon className="w-3.5 h-3.5 text-emerald-500" />
                Regional Agenda
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Upcoming <span className="text-blue-600">Events</span></h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed border-l-2 border-emerald-500/20 pl-6">Key dates for community gatherings, governmental forums, and cultural celebrations.</p>
            </div>
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white shadow-sm transition-all group uppercase tracking-widest text-[10px] border border-slate-100 hover:border-emerald-500/20"
            >
              Timeline <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-500" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white rounded-[2.5rem] animate-pulse shadow-sm border border-slate-100" />
              ))
            ) : events.length > 0 ? (
              events.map((eventItem, i) => (
                <motion.div
                  key={eventItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/events/${eventItem.id}`} className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-emerald-500/10 shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="h-56 overflow-hidden relative">
                      {eventItem.image ? (
                        <img
                          src={getImageUrl(eventItem.image)}
                          alt={getLocalized(eventItem, 'title', lang)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <CustomIcons.AdminBuildingIcon className="w-12 h-12 text-slate-100 mb-8" />
                        </div>
                      )}

                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-xl text-slate-900 border border-emerald-500/20">
                        {eventItem.status || 'Active'}
                      </div>
                    </div>
                    
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-4">
                        <CustomIcons.CalendarIcon className="w-3.5 h-3.5 text-emerald-500" />
                        {eventItem.event_date ? new Date(eventItem.event_date).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric'
                        }) : 'Date TBA'}
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-6 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors border-l-2 border-transparent group-hover:border-emerald-500 pl-0 group-hover:pl-4 transition-all">
                        {getLocalized(eventItem, 'title', lang)}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-500 transition-colors">Explore Event</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-400 font-light">
                No events currently on the official regional calendar.
              </div>
            )}
          </div>
        </div>
      </motion.section>


      {/* 9. HIGH-IMPACT Administrative Divisions CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="py-32 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] -ml-64 -mb-64" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-500/10 border border-emerald-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl">
              <CustomIcons.MapPinIcon className="w-4 h-4 text-emerald-400" />
              Administrative Geometry
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight drop-shadow-2xl">
              Our Territorial <span className="text-emerald-400">Governance</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              Abuna Ginde Beret Woreda is strategically organized into <span className="text-white font-bold border-b-2 border-emerald-500/30">44 divisions</span>: including 3 Urban Centers and 41 Rural Kebeles.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
              {[
                { label: "Urban Centers", value: "03" },
                { label: "Rural Kebeles", value: "41" },
                { label: "Total Divisions", value: "44" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] group hover:bg-emerald-500/10 transition-colors">
                  <div className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors mb-2 tracking-tighter">{item.value}</div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>

            <Link 
              to="/kebeles"
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-blue-600 text-white font-black rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-white hover:text-slate-900 transition-all duration-500 uppercase tracking-widest text-xs overflow-hidden"
            >
              <span className="relative z-10">Access Kebele Directory</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-[600px] w-full bg-slate-200 relative">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://www.openstreetmap.org/export/embed.html?bbox=37.5%2C9.5%2C38.0%2C10.0&amp;layer=mapnik&amp;marker=9.75%2C37.75"
          className="grayscale contrast-125 opacity-80"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center animate-ping">
            <div className="w-6 h-6 bg-blue-600 rounded-full shadow-2xl border-4 border-white"></div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 glass p-10 rounded-[2.5rem] max-w-md gov-shadow">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Visit Our Office</h3>
          <p className="text-slate-500 leading-relaxed mb-8">Located in the heart of Beke Kelate Town, our administration building is open to all citizens.</p>
          <a
            href="https://www.openstreetmap.org/?mlat=9.75&amp;mlon=37.75#map=10/9.75/37.75"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest hover:underline"
          >
            Get Directions <CustomIcons.ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      </motion.section>
    </div>

    <ProjectModal 
      project={selectedProject} 
      onClose={() => setSelectedProject(null)} 
      lang={lang} 
    />
  </>
  );
}

const ProjectModal = ({ project, onClose, lang }: { project: any, onClose: () => void, lang: Language }) => {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Project Image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            {project.img ? (
              <img
                src={getImageUrl(project.img)}
                alt={getLocalized(project, 'title', lang)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-[2rem] flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      <CustomIcons.InstitutionalBadgeIcon className="w-10 h-10" />
                    </div>
              </div>
            )}
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all md:hidden"
            >
              <CustomIcons.CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Project Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full">
                {project.status}
              </span>
              <button 
                onClick={onClose}
                className="hidden md:flex w-10 h-10 bg-slate-50 rounded-full items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
              >
                <CustomIcons.CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
              {getLocalized(project, 'title', lang)}
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              {project.category && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-500 text-xs font-bold border border-slate-100">
                  <CustomIcons.TagIcon className="w-3 h-3" /> {project.category}
                </div>
              )}
              {project.beneficiaries && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-500 text-xs font-bold border border-slate-100">
                  <CustomIcons.UsersIcon className="w-3 h-3" /> {project.beneficiaries}
                </div>
              )}
            </div>

            {/* Progress Card */}
            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100/50 mb-8">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-800/60">Execution Progress</span>
                <span className="text-3xl font-black text-emerald-700">{project.percent}%</span>
              </div>
              <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.percent}%` }}
                  className="h-full bg-emerald-600"
                />
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate prose-sm max-w-none text-slate-600 mb-8">
              <div dangerouslySetInnerHTML={{ __html: getLocalized(project, 'description', lang) }} />
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Timeline</div>
                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <CustomIcons.CalendarIcon className="w-4 h-4 text-emerald-500" />
                  {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBA'} - 
                  {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'TBA'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Budget Allocation</div>
                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <CustomIcons.DollarSignIcon className="w-4 h-4 text-emerald-500" />
                  {project.budget || 'Confidential'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
