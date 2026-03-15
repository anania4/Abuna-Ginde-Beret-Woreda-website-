import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Users, Tractor, ChevronRight, ArrowRight, Phone, ShieldCheck, Building2, Droplets, Gavel, Newspaper } from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchServices } from '../services/api';

interface ServicesProps {
  lang: Language;
}

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  mapPin: MapPin,
  users: Users,
  tractor: Tractor,
  shield: ShieldCheck,
  building: Building2,
  water: Droplets,
  justice: Gavel,
  news: Newspaper
};

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang];
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchServices();
        setServices(data as any[]);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-24">
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t.navServices}
          </motion.h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Access essential government services, permits, and support programs online or at our offices.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-slate-50 rounded-[3rem] animate-pulse"></div>
              ))
            ) : services.length > 0 ? (
              services.map((service, i) => {
                const Icon = iconMap[service.icon] || Briefcase;
                return (
                  <motion.div
                    key={service.id || i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-woreda-green/30 transition-all group flex flex-col md:flex-row gap-8 items-start"
                  >
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-woreda-green shadow-sm group-hover:bg-woreda-green group-hover:text-white transition-all flex-shrink-0">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.name}</h3>
                      <div
                        className="text-slate-500 leading-relaxed mb-8 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-woreda-green hover:gap-5 transition-all"
                      >
                        Service Details <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-400">
                <p>No services listed at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-4 bg-woreda-green/10 text-woreda-green rounded-full mb-8">
            <Phone className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Need Assistance?</h2>
          <p className="text-xl text-slate-500 mb-12">Our help desk is available during office hours to guide you through any application process.</p>
          <Link to="/contact" className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all transform hover:-translate-y-1 uppercase tracking-widest">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
