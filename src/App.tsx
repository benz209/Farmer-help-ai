/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { Navbar } from './components/Navbar';
import { DistrictSelector } from './components/DistrictSelector';
import { WeatherDashboard } from './components/WeatherDashboard';
import { getFarmerAdvice, WeatherData } from './services/geminiService';
import { getTranslation } from './lib/i18n';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, MapPin, Search, Sprout, Info, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { language } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDistrict) {
      handleDistrictSelect(selectedDistrict);
    }
  }, [language]);

  const handleDistrictSelect = async (district: string) => {
    setSelectedDistrict(district);
    setLoading(true);
    setError(null);
    try {
      const data = await getFarmerAdvice(district, language);
      setWeatherData(data);
    } catch (err: any) {
      let errorMessage = err.message || getTranslation(language, 'error');
      
      // Check for quota/rate limit errors
      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('exhausted')) {
        errorMessage = language === 'ta' 
          ? "தினசரி பயன்பாட்டு வரம்பு முடிந்துவிட்டது. தயவுசெய்து நாளை மீண்டும் முயற்சிக்கவும் அல்லது புதிய API கீ-ஐப் பயன்படுத்தவும்."
          : "Daily usage limit reached. Please try again tomorrow or update your API key in settings.";
      }
      
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />

      <main className="max-w-7xl mx-auto py-4 md:py-8 px-3 md:px-8">
        {!selectedDistrict ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 md:space-y-12"
          >
            {/* Hero Section */}
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-green-900 text-white p-6 md:p-16 shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Farming" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[10px] md:text-sm font-bold mb-4 md:mb-6 uppercase tracking-widest"
                >
                  {getTranslation(language, 'heroBadge')}
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tight">
                  {getTranslation(language, 'appTitle')}
                </h2>
                <p className="text-base md:text-xl text-green-100/80 mb-6 md:mb-10 leading-relaxed font-medium">
                  {getTranslation(language, 'heroDescription')}
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <div className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/10">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    <span className="font-bold text-sm md:text-base">38 {getTranslation(language, 'heroDistrictCount')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/10">
                    <Sprout className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    <span className="font-bold text-sm md:text-base">{getTranslation(language, 'cropAdvice')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* District Selection Section */}
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                  {getTranslation(language, 'selectDistrict')}
                </h3>
                <p className="text-sm md:text-base text-gray-500 font-medium">
                  {getTranslation(language, 'selectionSubtitle')}
                </p>
              </div>
              
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-green-100/50 p-6 md:p-12 border border-green-50 overflow-hidden relative">
                <DistrictSelector selectedDistrict={selectedDistrict || ''} onSelect={handleDistrictSelect} />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400" />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2 md:p-3 bg-green-100 rounded-xl md:rounded-2xl">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">{selectedDistrict}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{getTranslation(language, 'district')}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-bold text-sm"
              >
                {getTranslation(language, 'change')}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <Loader2 className="w-16 h-16 text-green-600 animate-spin mb-6" />
                  <p className="text-xl font-bold text-gray-600 animate-pulse">
                    {getTranslation(language, 'aiThinking')}
                  </p>
                </motion.div>
              ) : weatherData ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <WeatherDashboard data={weatherData} district={selectedDistrict} />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto text-center py-20 px-6 bg-white rounded-[3rem] shadow-2xl border border-red-50"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    {language === 'ta' ? 'பிழை ஏற்பட்டது' : 'Something went wrong'}
                  </h3>
                  <p className="text-gray-600 font-medium mb-10 leading-relaxed">
                    {error}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => handleDistrictSelect(selectedDistrict)}
                      className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-200 hover:bg-green-700 transition-all"
                    >
                      {getTranslation(language, 'retry')}
                    </button>
                    <button
                      onClick={() => setSelectedDistrict(null)}
                      className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                    >
                      {language === 'ta' ? 'முகப்புக்குச் செல்லவும்' : 'Go Back Home'}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-6 h-6 text-green-600" />
            <span className="text-xl font-black text-gray-900">{getTranslation(language, 'appTitle')}</span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2026 {getTranslation(language, 'appSubtitle')}. {getTranslation(language, 'footerTagline')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
