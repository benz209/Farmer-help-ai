import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import { Languages, LogIn, LogOut, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-green-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 md:px-8">
        <div className="flex justify-between h-20 md:h-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 group cursor-pointer"
          >
            <div className="p-2 md:p-3 bg-green-600 rounded-xl md:rounded-2xl shadow-xl shadow-green-200 group-hover:rotate-12 transition-transform duration-300">
              <Sprout className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-green-900 tracking-tighter leading-none">
                {getTranslation(language, 'appTitle')}
              </h1>
              <p className="text-[8px] md:text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mt-1 md:mt-1.5">
                {getTranslation(language, 'appSubtitle')}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-green-50 text-green-700 font-black hover:bg-green-100 transition-all border border-green-100 shadow-sm text-xs md:text-base"
            >
              <Languages className="w-4 h-4 md:w-5 md:h-5" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
