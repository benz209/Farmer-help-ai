import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';

interface PestAlert {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const PestAlerts: React.FC<{ alerts: PestAlert[] }> = ({ alerts }) => {
  const { language } = useLanguage();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] md:rounded-3xl p-5 md:p-6 shadow-xl border border-red-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 rounded-2xl">
          <ShieldAlert className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{getTranslation(language, 'pestAlerts')}</h3>
      </div>

      <div className="space-y-3 md:space-y-4">
        {alerts.map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-3 md:p-4 rounded-xl md:rounded-2xl border flex gap-3 md:gap-4",
              alert.severity === 'high' ? "bg-red-50 border-red-100 text-red-900" :
              alert.severity === 'medium' ? "bg-orange-50 border-orange-100 text-orange-900" :
              "bg-blue-50 border-blue-100 text-blue-900"
            )}
          >
            <div className="mt-1 flex-shrink-0">
              {alert.severity === 'high' ? <ShieldAlert className="w-4 h-4 md:w-5 md:h-5" /> : <Info className="w-4 h-4 md:w-5 md:h-5" />}
            </div>
            <div>
              <p className="font-bold text-[10px] md:text-sm uppercase tracking-wider mb-1">{alert.title}</p>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed">{alert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
