import React from 'react';
import { motion } from 'motion/react';
import { Cloud, Droplets, Wind, Thermometer, TrendingUp, TrendingDown, Minus, Sprout, AlertTriangle, ShoppingCart, ShieldAlert, Beaker } from 'lucide-react';
import { WeatherData } from '../services/geminiService';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import { cn } from '../lib/utils';
import { MarketTracker } from './MarketTracker';
import { PestAlerts } from './PestAlerts';
import { SoilHealth } from './SoilHealth';

interface WeatherDashboardProps {
  data: WeatherData;
  district: string;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ data, district }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Main Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-5xl font-black mb-2 tracking-tight">{district}</h2>
              <p className="text-green-100 opacity-80 font-medium tracking-wide uppercase text-sm">{getTranslation(language, 'currentWeatherIn')}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-7xl font-black tracking-tighter">{data.temperature}</div>
                <p className="text-2xl font-bold text-green-100">{data.condition}</p>
              </div>
              <Cloud className="w-20 h-20 text-white/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
              <Droplets className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">{getTranslation(language, 'humidity')}</p>
                <p className="text-xl font-black">{data.humidity}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
              <Wind className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">{getTranslation(language, 'windSpeed')}</p>
                <p className="text-xl font-black">{data.windSpeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
              <Thermometer className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">{getTranslation(language, 'temperature')}</p>
                <p className="text-xl font-black">{data.temperature}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expert Advice Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-green-100 relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded-2xl shadow-inner">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">{getTranslation(language, 'cropAdvice')}</h3>
          </div>
          <div className="relative z-10">
            <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium italic border-l-4 border-green-500 pl-6 py-2">
              "{data.advice}"
            </p>
            
            <h4 className="font-black text-gray-700 mb-4 uppercase tracking-widest text-xs">{getTranslation(language, 'suggestedCrops')}</h4>
            <div className="flex flex-wrap gap-3">
              {data.suggestedCrops.map((crop, i) => (
                <span key={i} className="px-5 py-2 bg-green-50 text-green-700 rounded-2xl text-sm font-bold border border-green-100 shadow-sm hover:scale-105 transition-transform cursor-default">
                  {crop}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
            <Sprout className="w-64 h-64 text-green-900" />
          </div>
        </motion.div>

        {/* Pest Alerts Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PestAlerts alerts={data.pestAlerts} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Tracker Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <MarketTracker trends={data.marketTrends} />
        </motion.div>

        {/* Forecast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
        >
          <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">{getTranslation(language, 'forecast')}</h3>
          <div className="space-y-6">
            {data.forecast.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 hover:bg-green-50 transition-all border border-transparent hover:border-green-100 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Cloud className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 uppercase tracking-wider">{f.day}</p>
                    <p className="text-xs text-gray-500 font-medium">{f.condition}</p>
                  </div>
                </div>
                <p className="text-2xl font-black text-gray-900 tracking-tighter">{f.temp}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Soil Health Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <SoilHealth data={data.soilHealth} />
      </motion.div>
    </div>
  );
};
