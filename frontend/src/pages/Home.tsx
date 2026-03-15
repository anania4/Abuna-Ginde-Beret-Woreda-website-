import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  ChevronLeft,
  Users,
  MapPin,
  Tractor,
  HeartPulse,
  ArrowRight,
  Quote,
  CheckCircle2,
  ExternalLink,
  School,
  ShieldCheck,
  Newspaper,
  Gavel,
  Droplets,
  Building2,
  Briefcase,
  Calendar,
  X,
  Tag,
  DollarSign,
  Layout
} from 'lucide-react';
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

      {/* About & Stats MOVED DIRECTLY BELOW HERO */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-white relative overflow-hidden stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">{t.aboutTitle}</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-10">
                {t.aboutSubtitle} Abuna Ginde Beret is a land of diverse landscapes, rich cultural heritage, and hardworking people committed to sustainable growth.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: t.statsResidents, value: (globalSettings as any)?.resident_count?.toLocaleString() || "150,000+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Kebeles", value: (globalSettings as any)?.kebele_count || "44", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: t.statsAgriculture, value: (globalSettings as any)?.agriculture_percentage || "95%", icon: Tractor, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Total Schools", value: (globalSettings as any)?.school_count || "44", icon: School, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                  <div key={i} className="stat-item flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className={`p-4 rounded-xl ${stat.bg} shadow-sm ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src="https://picsum.photos/seed/abuna-about/1000/1000" alt="About" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div
                className="absolute -bottom-10 -right-10 bg-gradient-to-br from-emerald-600 to-emerald-700 p-10 rounded-[2.5rem] shadow-2xl text-white max-w-[280px]"
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Quote className="w-10 h-10 mb-4 opacity-50" />
                <p className="text-lg font-medium italic leading-relaxed">"Building a resilient community through agriculture and education."</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Murder Board Sectors */}
      <motion.section id="sectors" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">{t.sectorsTitle}</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">{t.sectorsSubtitle}</p>
          </div>

          <div className="relative min-h-[800px] hidden lg:block">
            {/* Scattered Cards Layout */}
            {sectors.length > 0 ? sectors.map((sector, i) => {
              const Icon = i % 4 === 0 ? Tractor : i % 4 === 1 ? School : i % 4 === 2 ? HeartPulse : Building2;
              const positions = [
                "top-[5%] left-[10%]", "top-[15%] left-[40%]", "top-[10%] left-[70%]",
                "top-[40%] left-[15%]", "top-[45%] left-[45%]", "top-[35%] left-[75%]",
                "top-[70%] left-[25%]", "top-[75%] left-[55%]", "top-[65%] left-[80%]"
              ];
              const rots = ["rotate-2", "-rotate-3", "rotate-1", "-rotate-2", "rotate-3", "-rotate-1", "rotate-2", "-rotate-2", "rotate-3"];
              const colors = ["bg-emerald-500", "bg-blue-500", "bg-amber-500", "bg-purple-500", "bg-red-500", "bg-slate-500", "bg-orange-500", "bg-indigo-500", "bg-cyan-500"];

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, zIndex: 50 }}
                  className={`absolute ${positions[i % positions.length]} ${rots[i % rots.length]} p-6 bg-white rounded-2xl shadow-2xl border border-white/20 group cursor-pointer`}
                >
                  <Link to={`/sectors/${sector.id}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[i % colors.length]} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-lg whitespace-nowrap">{getLocalized(sector, 'name', lang)}</h3>
                    <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Details <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            }) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-black">
                WOREDA SECTORS
              </div>
            )}

            {/* Visual Connectors (SVG Strings) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" strokeDasharray="5,5">
              <line x1="15%" y1="12%" x2="42%" y2="18%" stroke="white" strokeWidth="1" />
              <line x1="45%" y1="20%" x2="72%" y2="15%" stroke="white" strokeWidth="1" />
              <line x1="20%" y1="45%" x2="45%" y2="50%" stroke="white" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="75%" y2="40%" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          {/* Mobile Grid Fallback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {sectors.map((sector, i) => (
              <Link to={`/sectors/${sector.id}`} key={i} className="p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
                <div className="font-bold">{getLocalized(sector, 'name', lang)}</div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Updates */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.latestNews}</h2>
              <div className="w-20 h-1.5 bg-woreda-green rounded-full"></div>
            </div>
            <Link to="/news" className="hidden md:flex items-center gap-2 text-sm font-bold text-woreda-green hover:underline uppercase tracking-widest">
              {t.viewAll} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {newsLoading ? (
              // Loading state
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                  <div className="h-64 bg-slate-200"></div>
                  <div className="p-8">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : news.length > 0 ? (
              // Display news from API
              news.map((newsItem, i) => (
                <motion.div
                  key={newsItem.id}
                  whileHover={{ y: -10 }}
                  className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer"
                >
                  <Link to={`/news/${newsItem.id}`}>
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={getImageUrl(newsItem.img)}
                        alt={getLocalized(newsItem, 'title', lang)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {newsItem.category && (
                        <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-sm">
                          {newsItem.category}
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                        {new Date(newsItem.date || newsItem.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-6 line-clamp-2 group-hover:text-woreda-green transition-colors leading-tight">
                        {getLocalized(newsItem, 'title', lang)}
                      </h3>
                      <div className="flex items-center text-sm font-black text-woreda-green uppercase tracking-widest">
                        Read More <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              // No news available
              <div className="col-span-3 text-center py-12 text-slate-400">
                <p>No news available at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Woreda Gallery Preview */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.galleryTitle}</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline uppercase tracking-widest">
              {t.viewAll} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.length > 0 ? galleries.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="aspect-square relative rounded-3xl overflow-hidden group shadow-lg"
              >
                <img
                  src={getImageUrl(item.img)}
                  alt={getLocalized(item, 'title', lang)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{item.category}</span>
                  <p className="text-white font-bold text-sm line-clamp-1">{getLocalized(item, 'title', lang)}</p>
                </div>
              </motion.div>
            )) : (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-slate-100 rounded-3xl animate-pulse"></div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* Development Progress */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Development Progress</h2>
            <p className="text-lg text-slate-500">Tracking our path to modernization and digital growth.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.length > 0 ? projects.map((project, i) => (
              <div key={project.id} className="p-10 bg-white rounded-[3rem] border border-slate-100 group shadow-sm transition-all hover:shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                      {project.status || 'Planned'}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-4">{getLocalized(project, 'title', lang)}</h3>
                    {project.milestone && (
                      <div className="text-sm font-bold text-emerald-600 mt-2 uppercase tracking-tight">
                        Milestone: {getLocalized(project, 'milestone', lang)}
                      </div>
                    )}
                  </div>
                  <div className="text-4xl font-black text-slate-200 group-hover:text-woreda-green transition-colors">{project.percent || 0}%</div>
                </div>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-400 font-bold">
                  {project.start_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.start_date).toLocaleDateString()}
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex items-center gap-1">
                      <span>→</span>
                      {new Date(project.end_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div
                  className="text-slate-500 mb-10 leading-relaxed line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: getLocalized(project, 'description', lang) }}
                />
                
                <div className="relative mb-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-slate-400">
                    <span>Progress</span>
                    <span className="text-woreda-green">{project.percent || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.percent || 0}%` }}
                      className={`h-full ${project.percent > 0 ? 'bg-woreda-green' : 'bg-slate-300'}`}
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full mt-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  View Project Details <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )) : (
              <div className="col-span-2 text-center py-12 text-slate-400">
                <p>No active development projects listed at this time.</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Administrator Message */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-woreda-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] mb-12 opacity-70">{t.adminMessageTitle}</h2>
          <blockquote className="text-3xl md:text-5xl font-medium italic leading-tight mb-16">
            <div dangerouslySetInnerHTML={{ __html: getLocalized(adminMessage, 'message', lang) || (t as any).adminMessageDesc }} />
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-6 border-4 border-emerald-700 shadow-2xl overflow-hidden">
              {adminMessage?.img ? (
                <img src={getImageUrl(adminMessage.img)} alt={getLocalized(adminMessage, 'administrator_name', lang)} className="w-full h-full object-cover" />
              ) : (
                adminMessage?.administrator_name?.[0] || "A"
              )}
            </div>
            <div className="text-2xl font-bold mb-1">{getLocalized(adminMessage, 'administrator_name', lang) || t.adminName}</div>
            <div className="text-lg opacity-70">{getLocalized(adminMessage, 'role', lang) || t.adminRole}</div>
          </div>
        </div>
      </motion.section>

      {/* Community Voices */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Voice of the People</h2>
            <p className="text-lg text-slate-500">Real stories from our residents across the Woreda.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Tadese Hirpha", role: "Local Farmer", text: "The new access road to Beke Kelate has changed my life. I can now transport my teff to the market in half the time." },
              { name: "Alemitu Gemechu", role: "Teacher", text: "Seeing the new high school laboratory makes me hopeful for my children's future. Education is truly prioritized here." },
              { name: "Girma Tolosa", role: "Elder", text: "The health extension workers are very active in our kebele. We feel supported and cared for by our administration." },
            ].map((voice, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative">
                <Quote className="w-12 h-12 text-woreda-green/20 absolute top-8 left-8" />
                <p className="text-slate-600 italic mb-8 relative z-10 pt-4 leading-relaxed">"{voice.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-woreda-green shadow-sm">{voice.name[0]}</div>
                  <div>
                    <div className="font-bold text-slate-900">{voice.name}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{voice.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Upcoming Events - MOVED TO BOTTOM */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.navEvents || "Upcoming Events"}</h2>
              <div className="w-20 h-1.5 bg-woreda-green rounded-full"></div>
            </div>
            <Link to="/events" className="hidden md:flex items-center gap-2 text-sm font-bold text-woreda-green hover:underline uppercase tracking-widest">
              View All Events <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {newsLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-8">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
                  </div>
                </div>
              ))
            ) : events.length > 0 ? (
              events.map((eventItem, i) => (
                <motion.div
                  key={eventItem.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer flex flex-col"
                >
                  <Link to={`/events/${eventItem.id}`} className="flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                      {eventItem.image ? (
                        <img
                          src={getImageUrl(eventItem.image)}
                          alt={getLocalized(eventItem, 'title', lang)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-slate-300" />
                        </div>
                      )}

                      {eventItem.status && (
                        <div className={`absolute top-4 left-4 px-3 py-1 backdrop-blur text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-sm ${eventItem.status === 'upcoming' ? 'bg-emerald-500/90 text-white' : 'bg-white/90 text-slate-900'}`}>
                          {eventItem.status}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
                        {eventItem.event_date && (
                          <span className="flex items-center gap-1 text-woreda-green">
                            <Calendar className="w-3 h-3" />
                            {new Date(eventItem.event_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-woreda-green transition-colors leading-tight">
                        {getLocalized(eventItem, 'title', lang)}
                      </h3>
                      <div className="mt-auto flex items-center text-sm font-black text-woreda-green uppercase tracking-widest">
                        Event Details <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-slate-400">
                <p>No upcoming events at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>


      {/* Administrative Divisions CTA */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="py-24 bg-woreda-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Administrative Divisions</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Abuna Ginde Beret Woreda is organized into 44 administrative divisions, including 3 Urban Centers and 41 Rural Kebeles.
          </p>
          <button className="px-12 py-6 bg-white text-woreda-green font-black rounded-2xl shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 uppercase tracking-widest flex items-center gap-3 mx-auto">
            Explore Full Directory <ArrowRight className="w-6 h-6" />
          </button>
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
          <div className="w-20 h-20 bg-woreda-green/20 rounded-full flex items-center justify-center animate-ping">
            <div className="w-6 h-6 bg-woreda-green rounded-full shadow-2xl border-4 border-white"></div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 glass p-10 rounded-[2.5rem] max-w-md gov-shadow">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Visit Our Office</h3>
          <p className="text-slate-500 leading-relaxed mb-8">Located in the heart of Beke Kelate Town, our administration building is open to all citizens.</p>
          <a
            href="https://www.openstreetmap.org/?mlat=9.75&amp;mlon=37.75#map=10/9.75/37.75"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black text-woreda-green uppercase tracking-widest hover:underline"
          >
            Get Directions <ExternalLink className="w-4 h-4" />
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
                <Layout className="w-20 h-20 text-slate-200" />
              </div>
            )}
            <button 
              onClick={onClose}
              className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all md:hidden"
            >
              <X className="w-6 h-6" />
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
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
              {getLocalized(project, 'title', lang)}
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              {project.category && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-500 text-xs font-bold border border-slate-100">
                  <Tag className="w-3 h-3" /> {project.category}
                </div>
              )}
              {project.beneficiaries && (
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-slate-500 text-xs font-bold border border-slate-100">
                  <Users className="w-3 h-3" /> {project.beneficiaries}
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
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBA'} - 
                  {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'TBA'}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Budget Allocation</div>
                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
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
