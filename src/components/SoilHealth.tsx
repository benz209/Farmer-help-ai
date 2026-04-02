import React from 'react';
import { motion } from 'motion/react';
import { Beaker, Droplets, Thermometer, Wind } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';

interface SoilHealthProps {
  data?: { ph: string; nitrogen: string; phosphorus: string; potassium: string };
}

export const SoilHealth: React.FC<SoilHealthProps> = ({ data }) => {
  const { language } = useLanguage();

  const metrics = [
    { label: getTranslation(language, 'phLevel'), value: data?.ph || '6.5', status: getTranslation(language, 'optimal'), color: 'text-green-600' },
    { label: getTranslation(language, 'nitrogen'), value: data?.nitrogen || 'Medium', status: getTranslation(language, 'good'), color: 'text-blue-600' },
    { label: getTranslation(language, 'phosphorus'), value: data?.phosphorus || 'High', status: getTranslation(language, 'excellent'), color: 'text-purple-600' },
    { label: getTranslation(language, 'potassium'), value: data?.potassium || 'Low', status: getTranslation(language, 'needsAttention'), color: 'text-orange-600' },
  ];

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl border border-purple-100 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <div className="p-3 md:p-4 bg-purple-100 rounded-2xl shadow-inner">
          <Beaker className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{getTranslation(language, 'soilHealth')}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-purple-50/30 border border-purple-100/50 flex flex-col justify-between hover:bg-purple-50 transition-all hover:shadow-lg group"
          >
            <p className="text-[10px] md:text-xs font-black text-purple-600 uppercase tracking-widest mb-4 md:mb-6">{m.label}</p>
            <div>
              <p className="text-2xl md:text-4xl font-black text-gray-900 mb-1 tracking-tighter">{m.value}</p>
              <div className="flex items-center gap-2">
                <div className={cn("w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse", m.color.replace('text', 'bg'))} />
                <p className={cn("text-xs md:text-sm font-bold", m.color)}>{m.status}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute -left-10 -bottom-10 opacity-[0.03] pointer-events-none">
        <Beaker className="w-64 h-64 text-purple-900" />
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
