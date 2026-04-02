import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';

interface MarketTrackerProps {
  trends: { crop: string; price: string; trend: 'up' | 'down' | 'stable' }[];
}

export const MarketTracker: React.FC<MarketTrackerProps> = ({ trends }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-blue-100 relative overflow-hidden h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded-2xl shadow-inner">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-800 tracking-tight">{getTranslation(language, 'marketPrices')}</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {trends.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-5 bg-blue-50/30 rounded-2xl border border-blue-100/50 hover:bg-blue-50 transition-colors group"
          >
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1">{item.crop}</p>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{item.price}</p>
            </div>
            <div className={cn(
              "p-3 rounded-2xl shadow-sm transition-transform group-hover:scale-110",
              item.trend === 'up' ? "bg-green-100 text-green-600" :
              item.trend === 'down' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
            )}>
              {item.trend === 'up' && <TrendingUp className="w-6 h-6" />}
              {item.trend === 'down' && <TrendingDown className="w-6 h-6" />}
              {item.trend === 'stable' && <Minus className="w-6 h-6" />}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
        <ShoppingCart className="w-48 h-48 text-blue-900" />
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
