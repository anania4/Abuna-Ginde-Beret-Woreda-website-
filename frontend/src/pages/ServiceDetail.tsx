import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import * as CustomIcons from '../components/CustomIcons';
import { translations, Language } from '../constants';
import { fetchServiceById } from '../services/api';
import { getLocalized } from '../utils/lang';

interface ServiceDetailProps {
  lang: Language;
}

const iconMap: Record<string, any> = {
  briefcase: CustomIcons.BusinessIcon,
  business: CustomIcons.BusinessIcon,
  mapPin: CustomIcons.LocationIcon,
  location: CustomIcons.LocationIcon,
  users: CustomIcons.PopulationIcon,
  population: CustomIcons.PopulationIcon,
  tractor: CustomIcons.AgriIcon,
  agriculture: CustomIcons.AgriIcon,
  shield: CustomIcons.LicensingIcon,
  licensing: CustomIcons.LicensingIcon,
  building: CustomIcons.AdminBuildingIcon,
  administration: CustomIcons.AdminBuildingIcon,
  water: CustomIcons.WaterIcon,
  justice: CustomIcons.GovernanceIcon,
  governance: CustomIcons.GovernanceIcon,
  news: CustomIcons.NewsIcon,
  rapid: CustomIcons.RapidIcon,
  default: CustomIcons.FileIcon
};

export default function ServiceDetail({ lang }: ServiceDetailProps) {
  const { id } = useParams();
  const t = translations[lang];
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      try {
        const data = await fetchServiceById(id);
        setService(data);
      } catch (error) {
        console.error('Failed to load service:', error);
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
        <p className="text-slate-500">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Link to="/services" className="text-woreda-green font-bold hover:underline">Back to Services</Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || iconMap[service.icon_name] || iconMap.default;

  return (
    <div className="pt-24">
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-woreda-green transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-blue-600 shadow-xl border border-slate-100 flex-shrink-0">
              <Icon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {getLocalized(service, 'name', lang)}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                {getLocalized(service, 'description', lang)?.replace(/<[^>]*>?/gm, '').slice(0, 160)}...
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Service Overview</h3>
                <div
                  className="text-lg text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: getLocalized(service, 'description', lang) }}
                />
              </div>

              {service.requirements && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h3>
                  <div className="grid gap-4">
                    {(getLocalized(service, 'requirements', lang) || '').split('\n').filter((r: string) => r.trim()).map((req: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <CustomIcons.IntegrityIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl">
                <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-8">Application</h4>
                <button className="w-full py-5 bg-woreda-green text-white font-black rounded-2xl shadow-xl hover:bg-emerald-800 transition-all transform hover:-translate-y-1 uppercase tracking-widest mb-6">
                  Apply Online
                </button>
                <p className="text-xs text-white/40 text-center">Estimated processing time: {service.processing_time || "3-5 working days"}</p>
              </div>

              <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="text-xs font-black uppercase tracking-[0.2em]">Important</h4>
                </div>
                <p className="text-sm text-amber-800/70 leading-relaxed">
                  Please ensure all documents are original or certified copies. Incomplete applications will be returned for correction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
