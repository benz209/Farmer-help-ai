import React from 'react';
import { motion } from 'motion/react';
import { Cloud, Droplets, Wind, Thermometer, TrendingUp, TrendingDown, Minus, Sprout, AlertTriangle, ShoppingCart, ShieldAlert, Beaker, Sun, Eye, Gauge, Sunrise, Sunset, Activity, MapPin } from 'lucide-react';
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
    <div className="space-y-6 md:space-y-8 p-3 md:p-4 max-w-7xl mx-auto">
      {/* Main Weather Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 md:gap-12">
            <div className="space-y-4 w-full lg:w-auto">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <MapPin className="w-4 h-4 text-green-300" />
                  <p className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px]">{getTranslation(language, 'currentWeatherIn')}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Live</span>
                </div>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none break-words">{district}</h2>
              <div className="flex items-center gap-4">
                <div className="p-2 md:p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 animate-spin-slow" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-green-50">{data.condition}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 bg-black/10 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl border border-white/5 w-full lg:w-auto">
              <div className="text-center">
                <div className="text-7xl md:text-9xl font-black tracking-tighter leading-none">{data.temperature}</div>
                <p className="text-green-200/60 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-2 md:mt-4">{getTranslation(language, 'feelsLike')}: {data.feelsLike}</p>
              </div>
              <div className="hidden sm:block w-px h-16 md:h-24 bg-white/10" />
              <div className="w-full sm:w-auto flex sm:flex-col justify-around sm:justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <Sunrise className="w-5 h-5 md:w-6 md:h-6 text-orange-300" />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold opacity-50 uppercase tracking-widest">{getTranslation(language, 'sunrise')}</p>
                    <p className="text-sm md:text-lg font-black">{data.sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <Sunset className="w-5 h-5 md:w-6 md:h-6 text-purple-300" />
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold opacity-50 uppercase tracking-widest">{getTranslation(language, 'sunset')}</p>
                    <p className="text-sm md:text-lg font-black">{data.sunset}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-10 md:mt-16">
            <MetricCard icon={<Droplets className="w-5 h-5 text-blue-300" />} label={getTranslation(language, 'humidity')} value={data.humidity} />
            <MetricCard icon={<Cloud className="w-5 h-5 text-blue-200" />} label={getTranslation(language, 'rainfall')} value={data.rainfall || '0 mm'} />
            <MetricCard icon={<Wind className="w-5 h-5 text-cyan-300" />} label={getTranslation(language, 'windSpeed')} value={data.windSpeed} />
            <MetricCard icon={<Sun className="w-5 h-5 text-yellow-300" />} label={getTranslation(language, 'uvIndex')} value={data.uvIndex} />
            <MetricCard icon={<Eye className="w-5 h-5 text-emerald-300" />} label={getTranslation(language, 'visibility')} value={data.visibility} />
            <MetricCard icon={<Gauge className="w-5 h-5 text-purple-300" />} label={getTranslation(language, 'pressure')} value={data.pressure} />
            <MetricCard icon={<Activity className="w-5 h-5 text-red-300" />} label={getTranslation(language, 'temperature')} value={data.temperature} />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-green-400/20 rounded-full blur-[80px]" />
      </motion.div>

      {/* Real-time Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border border-green-50 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="p-3 md:p-4 bg-green-600 rounded-2xl shadow-xl shadow-green-100">
            <Activity className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">{getTranslation(language, 'detailedAnalysis')}</h3>
        </div>
        <div className="relative z-10">
          <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium">
            {data.detailedAnalysis}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none">
          <Activity className="w-64 md:w-96 h-64 md:h-96 text-green-900" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Expert Advice Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border border-green-50 relative overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="p-3 md:p-4 bg-green-100 rounded-2xl shadow-inner">
              <Sprout className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">{getTranslation(language, 'cropAdvice')}</h3>
          </div>
          <div className="relative z-10">
            <div className="bg-green-50/50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-green-100 mb-6 md:mb-10">
              <p className="text-lg md:text-2xl text-green-900 leading-relaxed font-bold italic">
                "{data.advice}"
              </p>
            </div>
            
            <h4 className="font-black text-gray-400 mb-4 md:mb-6 uppercase tracking-[0.3em] text-[8px] md:text-[10px]">{getTranslation(language, 'suggestedCrops')}</h4>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {data.suggestedCrops.map((crop, i) => (
                <motion.span 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 md:px-8 py-2 md:py-4 bg-white text-green-700 rounded-xl md:rounded-2xl text-sm md:text-lg font-black border border-green-100 shadow-lg shadow-green-100/20 cursor-default"
                >
                  {crop}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none">
            <Sprout className="w-64 md:w-80 h-64 md:h-80 text-green-900" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
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
          className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl border border-blue-50 flex flex-col"
        >
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 tracking-tight">{getTranslation(language, 'forecast')}</h3>
            {data.rainfallForecast && (
              <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{getTranslation(language, 'rainfallForecast')}</p>
                  <p className="text-sm font-bold text-blue-900">{data.rainfallForecast}</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 md:space-y-8">
            {data.forecast.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-blue-50/30 hover:bg-green-50 transition-all border border-transparent hover:border-green-100 group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Cloud className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{f.day}</p>
                    <p className="text-sm md:text-lg font-black text-gray-800">{f.condition}</p>
                  </div>
                </div>
                <p className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">{f.temp}</p>
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

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default group"
  >
    <div className="mb-2 md:mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[8px] md:text-[10px] font-bold opacity-50 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-lg md:text-2xl font-black">{value}</p>
  </motion.div>
);
