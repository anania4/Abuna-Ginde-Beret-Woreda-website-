import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Plus, Minus, Send, MessageSquare, ShieldCheck, Globe } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchFAQs, fetchGlobalSettings } from '../services/api';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [globalSettings, setGlobalSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [faqsData, settingsData] = await Promise.all([
          fetchFAQs(),
          fetchGlobalSettings()
        ]);
        setFaqs(faqsData as any[]);
        setGlobalSettings(settingsData);
      } catch (error) {
        console.error('Failed to load contact page data:', error);
      } finally {
        setLoading(false);
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
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1920" 
            alt="Contact Background" 
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
              <MessageSquare className="w-4 h-4" />
              Institutional Support
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              {t.contactTitle || "Get in Touch"}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Our administration is committed to transparency and open communication. Reach out to our offices for inquiries or official feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFORMATION & FORM */}
      <section className="py-24 relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* LEFT: INFO CARDS */}
            <div className="lg:col-span-4 space-y-6">
              {[
                { icon: <MapPin />, label: t.addressLabel, value: t.addressValue, color: "text-emerald-500" },
                { icon: <Phone />, label: t.phoneLabel, value: globalSettings?.phone || "+251 11 XXX XXXX", color: "text-blue-500" },
                { icon: <Mail />, label: t.emailLabel, value: globalSettings?.email || "info@abunagindeberet.gov.et", color: "text-amber-500" },
                { icon: <Clock />, label: t.officeHoursLabel, value: t.officeHoursValue, color: "text-purple-500" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${item.color}`}>
                    {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6' })}
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{item.label}</h4>
                  <p className="text-lg font-bold text-slate-900 leading-tight">
                    {loading ? "..." : item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                  <Globe className="w-64 h-64" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-1.5 h-12 bg-woreda-green rounded-full"></div>
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Direct Channel</h2>
                      <p className="text-slate-400 font-light italic">Your messages are reviewed by the Bureau of Communications.</p>
                    </div>
                  </div>

                  <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Identity</label>
                        <input 
                          type="text" 
                          placeholder="Ex. Abebe Kebede"
                          className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-woreda-green/10 transition-all font-medium text-slate-900" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Protocol</label>
                        <input 
                          type="email" 
                          placeholder="name@provider.com"
                          className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-woreda-green/10 transition-all font-medium text-slate-900" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Message Subject</label>
                      <input 
                        type="text" 
                        placeholder="What is this inquiry about?"
                        className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-woreda-green/10 transition-all font-medium text-slate-900" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Official Inquiry Content</label>
                      <textarea 
                        rows={6} 
                        placeholder="Please provide detailed information..."
                        className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-woreda-green/10 transition-all font-medium text-slate-900 resize-none"
                      ></textarea>
                    </div>
                    <button className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-600 transition-all group uppercase tracking-widest text-xs">
                      Dispatch Message <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-4 h-4" />
              Information Repository
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.faqTitle}</h2>
            <p className="text-xl text-slate-500 font-light">{t.faqSubtitle}</p>
          </div>

          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-slate-100 shadow-sm"></div>
              ))
            ) : faqs.length > 0 ? (
              faqs.map((faq, i) => (
                <div key={faq.id || i} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-10 py-10 flex items-center justify-between text-left group"
                  >
                    <span className="text-xl font-bold text-slate-900 group-hover:text-woreda-green transition-colors">{faq.question}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-woreda-green text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                      {activeFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-10 pb-12 text-lg text-slate-500 font-light leading-relaxed border-t border-slate-50"
                      >
                        <div className="pt-8" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <p className="text-slate-400 italic">No frequently asked questions registered.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
