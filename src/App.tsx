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
import { auth, onAuthStateChanged, User, loginWithGoogle, logout } from './lib/firebase';
import { getTranslation } from './lib/i18n';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, MapPin, Search, Sprout } from 'lucide-react';

function AppContent() {
  const { language } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleDistrictSelect = async (district: string) => {
    setSelectedDistrict(district);
    setLoading(true);
    setError(null);
    try {
      const data = await getFarmerAdvice(district, language);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || getTranslation(language, 'error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar user={user} onLogin={loginWithGoogle} onLogout={logout} />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!selectedDistrict ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Hero Section */}
            <div className="relative rounded-[3rem] overflow-hidden bg-green-900 text-white p-8 md:p-16 shadow-2xl">
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
                  className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-bold mb-6 uppercase tracking-widest"
                >
                  {getTranslation(language, 'heroBadge')}
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                  {getTranslation(language, 'appTitle')}
                </h2>
                <p className="text-xl text-green-100/80 mb-10 leading-relaxed font-medium">
                  {getTranslation(language, 'heroDescription')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span className="font-bold">38 {getTranslation(language, 'heroDistrictCount')}</span>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                    <Sprout className="w-5 h-5 text-green-400" />
                    <span className="font-bold">{getTranslation(language, 'cropAdvice')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* District Selection Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-black text-gray-900 mb-2">
                  {getTranslation(language, 'selectDistrict')}
                </h3>
                <p className="text-gray-500 font-medium">
                  {getTranslation(language, 'selectionSubtitle')}
                </p>
              </div>
              
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-green-100/50 p-8 md:p-12 border border-green-50 overflow-hidden relative">
                <DistrictSelector selectedDistrict={selectedDistrict || ''} onSelect={handleDistrictSelect} />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400" />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDistrict}</h3>
                  <p className="text-sm text-gray-500">{getTranslation(language, 'district')}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-bold text-sm"
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32"
                >
                  <p className="text-red-500 font-bold text-xl">{error}</p>
                  <button
                    onClick={() => handleDistrictSelect(selectedDistrict)}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-bold"
                  >
                    {getTranslation(language, 'retry')}
                  </button>
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
