import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Users, ShieldCheck, HeartPulse, School } from 'lucide-react';
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
    <div className="pt-24">
      {/* Header */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/about-header/1920/1080"
            alt="Header"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t.aboutTitle}
          </motion.h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t.aboutSubtitle}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                <Target className="w-48 h-48 text-woreda-green" />
              </div>
              <div className="inline-flex p-5 bg-woreda-green/10 text-woreda-green rounded-2xl mb-8">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.missionTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{t.missionDesc}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                <Eye className="w-48 h-48 text-woreda-blue" />
              </div>
              <div className="inline-flex p-5 bg-woreda-blue/10 text-woreda-blue rounded-2xl mb-8">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.visionTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{t.visionDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admin Message */}
      <section className="py-24 bg-woreda-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] mb-12 opacity-70">{t.adminMessageTitle}</h2>
          <blockquote className="text-3xl md:text-5xl font-medium italic leading-tight mb-16">
            <div dangerouslySetInnerHTML={{ __html: getLocalized(adminMessage, 'message', lang) || t.adminMessageDesc }} />
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
            <div className="text-lg opacity-70">{adminMessage?.role || t.adminRole}</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500">The principles that guide our administration every day.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Transparency", icon: Eye, color: "text-blue-600" },
              { name: "Integrity", icon: ShieldCheck, color: "text-emerald-600" },
              { name: "Inclusivity", icon: Users, color: "text-amber-600" },
              { name: "Excellence", icon: Target, color: "text-red-600" },
              { name: "Innovation", icon: HeartPulse, color: "text-purple-600" },
              { name: "Education", icon: School, color: "text-indigo-600" },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className={`inline-flex p-4 rounded-2xl bg-slate-50 mb-6 ${value.color}`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{value.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
