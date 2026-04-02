import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import { Languages, LogIn, LogOut, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  user: any;
  onLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-green-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="p-3 bg-green-600 rounded-2xl shadow-xl shadow-green-200 group-hover:rotate-12 transition-transform duration-300">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-green-900 tracking-tighter leading-none">
                {getTranslation(language, 'appTitle')}
              </h1>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mt-1.5">
                {getTranslation(language, 'appSubtitle')}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-all font-bold text-sm border border-green-200"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-green-500 p-0.5" />
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title={getTranslation(language, 'logout')}
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-200 active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                {getTranslation(language, 'login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
