import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Users, ShieldCheck, HeartPulse, School, Award, Landmark } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchAdminMessage } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];
  const [adminMessage, setAdminMessage] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const adminData = await fetchAdminMessage();
        setAdminMessage(adminData);
      } catch (error) {
        console.error('Failed to load about page data:', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* PREMIUM HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
            alt="About Background" 
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
              <Landmark className="w-4 h-4" />
              Institutional Heritage
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              {t.aboutTitle}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Rooted in tradition, driven by progress. Learn about the governance and mission of Abuna Ginde Beret.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE IDENTITY - Mission & Vision */}
      <section className="py-24 relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-48 h-48 text-woreda-green" />
              </div>
              <div className="w-16 h-16 bg-emerald-50 text-woreda-green rounded-2xl flex items-center justify-center mb-10 group-hover:bg-woreda-green group-hover:text-white transition-all duration-500 shadow-inner">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{t.missionTitle}</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-light">{t.missionDesc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Eye className="w-48 h-48 text-blue-600" />
              </div>
              <div className="w-16 h-16 bg-blue-50 text-blue-600 border border-emerald-100/50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
                {t.visionTitle}
                <div className="w-8 h-1 bg-emerald-500/30 mt-2 rounded-full" />
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed font-light">{t.visionDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP MESSAGE */}
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
              dangerouslySetInnerHTML={{ __html: getLocalized(adminMessage, 'message', lang) || t.adminMessageDesc }}
            />
            <span className="absolute -bottom-12 -right-8 text-9xl text-blue-500/10 font-serif leading-none italic select-none">”</span>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-28 h-28 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-8 border-4 border-blue-600 shadow-3xl overflow-hidden relative z-10">
                {adminMessage?.image ? (
                  <img src={getImageUrl(adminMessage.image)} alt={getLocalized(adminMessage, 'administrator_name', lang)} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
                    {adminMessage?.administrator_name?.[0] || "A"}
                  </div>
                )}
                {/* Emerald Hint on Photo Frame */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
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

      {/* CORE VALUES */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Award className="w-3 h-3" />
              Ethics & Principles
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Our Core Values</h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">The unshakeable foundations that guide every policy and interaction in Abuna Ginde Beret.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Transparency", icon: Eye, color: "bg-blue-50 text-blue-600", desc: "Clear and open governance in all administrative processes." },
              { name: "Integrity", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600", desc: "Unwavering commitment to honesty and ethical standards." },
              { name: "Inclusivity", icon: Users, color: "bg-amber-50 text-amber-600", desc: "Serving every citizen regardless of status or background." },
              { name: "Excellence", icon: Target, color: "bg-rose-50 text-rose-600", desc: "Striving for the highest quality in public service delivery." },
              { name: "Innovation", icon: HeartPulse, color: "bg-purple-50 text-purple-600", desc: "Embracing modern solutions for community development." },
              { name: "Education", icon: School, color: "bg-indigo-50 text-indigo-600", desc: "Prioritizing knowledge and human capital growth." },
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-8 group-hover:scale-110 transition-transform ${value.color}`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{value.name}</h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
