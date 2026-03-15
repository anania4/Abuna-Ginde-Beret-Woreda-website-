import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Plus, Minus } from 'lucide-react';
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
    <div className="pt-24">
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-5xl md:text-6xl font-bold text-slate-900 mb-8"
              >
                {t.contactTitle}
              </motion.h1>
              <p className="text-xl text-slate-600 mb-16 leading-relaxed">
                {t.contactDesc}
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-woreda-green border border-slate-100">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t.addressLabel}</h4>
                    <p className="text-lg text-slate-500">{t.addressValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-woreda-green border border-slate-100">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t.phoneLabel}</h4>
                    <p className="text-lg text-slate-500">
                      {loading ? '...' : globalSettings?.phone || "+251 11 XXX XXXX"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-woreda-green border border-slate-100">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t.emailLabel}</h4>
                    <p className="text-lg text-slate-500">
                      {loading ? '...' : globalSettings?.email || "info@abunagindeberet.gov.et"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-woreda-green border border-slate-100">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{t.officeHoursLabel}</h4>
                    <p className="text-lg text-slate-500">{t.officeHoursValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
            >
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-woreda-green focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Email</label>
                    <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-woreda-green focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Subject</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-woreda-green focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Message</label>
                  <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-woreda-green focus:border-transparent outline-none transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-6 bg-woreda-green text-white font-black rounded-xl shadow-xl hover:bg-emerald-800 transition-all transform hover:-translate-y-1 uppercase tracking-widest">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.faqTitle}</h2>
            <p className="text-xl text-slate-500">{t.faqSubtitle}</p>
          </div>

          <div className="space-y-6">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-50 rounded-[2rem] animate-pulse"></div>
              ))
            ) : faqs.length > 0 ? (
              faqs.map((faq, i) => (
                <div key={faq.id || i} className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-10 py-8 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
                  >
                    <span className="text-xl font-bold text-slate-900">{faq.question}</span>
                    {activeFaq === i ? <Minus className="w-6 h-6 text-woreda-green" /> : <Plus className="w-6 h-6 text-slate-400" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-10 pb-10 text-lg text-slate-500 leading-relaxed"
                      >
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <p>No FAQs available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
