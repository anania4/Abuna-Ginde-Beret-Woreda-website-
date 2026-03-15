import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Tractor,
  School,
  HeartPulse,
  Building2,
  ChevronLeft,
  Mail,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Droplets,
  Gavel,
  Newspaper
} from 'lucide-react';
import { translations, Language } from '../constants';
import { fetchSectorById } from '../services/api';
import { getImageUrl } from '../config';
import { getLocalized } from '../utils/lang';

interface SectorDetailProps {
  lang: Language;
}

const iconMap: Record<string, any> = {
  agriculture: Tractor,
  education: School,
  health: HeartPulse,
  administration: Building2,
  finance: Briefcase,
  security: ShieldCheck,
  water: Droplets,
  justice: Gavel,
  trade: Newspaper
};

export default function SectorDetail({ lang }: SectorDetailProps) {
  const { id } = useParams();
  const t = translations[lang];
  const [sector, setSector] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const data = await fetchSectorById(id);
        setSector(data);
      } catch (error) {
        console.error('Failed to load sector:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-48 pb-24 text-center">
        <div className="w-16 h-16 border-4 border-woreda-green border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <p className="text-slate-500">Loading sector details...</p>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Sector Not Found</h1>
        <Link to="/sectors" className="text-woreda-green font-bold hover:underline">Back to Sectors</Link>
      </div>
    );
  }

  const Icon = iconMap[sector.slug] || iconMap[sector.name.toLowerCase()] || Building2;

  return (
    <div className="pt-24">
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={getImageUrl(sector.image)}
            alt={getLocalized(sector, 'name', lang)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/sectors" className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" /> Back to Sectors
          </Link>
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
            <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-[2rem] flex items-center justify-center text-white shadow-2xl border border-white/20 flex-shrink-0">
              <Icon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {getLocalized(sector, 'name', lang)}
              </h1>
              <div
                className="text-xl text-white/60 leading-relaxed max-w-2xl px-6 md:px-0"
                dangerouslySetInnerHTML={{ __html: getLocalized(sector, 'description', lang) }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-8">About the Department</h3>
                <div
                  className="text-xl text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: getLocalized(sector, 'long_description', lang) || getLocalized(sector, 'description', lang) }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Key Initiatives</h4>
                  <ul className="space-y-4 text-slate-500">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-green rounded-full" /> Modernization Projects</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-green rounded-full" /> Community Outreach</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-green rounded-full" /> Resource Management</li>
                  </ul>
                </div>
                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Public Services</h4>
                  <ul className="space-y-4 text-slate-500">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-blue rounded-full" /> Technical Support</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-blue rounded-full" /> Permit Issuance</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-woreda-blue rounded-full" /> Data Reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10 text-center">Leadership</h4>
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-woreda-green font-bold text-3xl mb-6 shadow-xl border border-slate-100 overflow-hidden">
                    {sector.head_image ? (
                      <img src={getImageUrl(sector.head_image)} alt={getLocalized(sector, 'head_name', lang)} className="w-full h-full object-cover" />
                    ) : (
                      sector.head_name?.[0] || "H"
                    )}
                  </div>
                  <h5 className="text-xl font-bold text-slate-900 mb-1">{getLocalized(sector, 'head_name', lang) || "Department Head"}</h5>
                 <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-8">{sector.head_role || "Woreda Sector Head"}</p>
                  {sector.contact_email && (
                    <a href={`mailto:${sector.contact_email}`} className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-woreda-green transition-all shadow-sm border border-slate-100">
                      <Mail className="w-4 h-4" /> Contact Head
                    </a>
                  )}
                </div>
              </div>

              <div className="p-10 bg-woreda-green rounded-[3rem] text-white shadow-2xl">
                <h4 className="text-2xl font-bold mb-6">Need Assistance?</h4>
                <p className="text-white/70 mb-10 leading-relaxed">Visit our office during working hours for direct support and inquiries.</p>
                <Link to="/contact" className="flex items-center justify-center gap-3 w-full py-5 bg-white text-woreda-green font-black rounded-2xl shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 uppercase tracking-widest">
                  Contact Office <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
