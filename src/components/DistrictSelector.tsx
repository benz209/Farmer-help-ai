import React, { useState } from 'react';
import { districts, districtTranslations } from '../constants/districts';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import { cn } from '../lib/utils';
import { Search } from 'lucide-react';

interface DistrictSelectorProps {
  selectedDistrict: string;
  onSelect: (district: string) => void;
}

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({ selectedDistrict, onSelect }) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter(d => {
    const name = d.toLowerCase();
    const tamilName = districtTranslations[d].toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || tamilName.includes(search);
  });

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={getTranslation(language, 'searchDistricts')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-2">
        {filteredDistricts.map((district) => (
          <button
            key={district}
            onClick={() => onSelect(district)}
            className={cn(
              "px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border",
              selectedDistrict === district
                ? "bg-green-600 text-white shadow-xl shadow-green-200 border-green-600 scale-105"
                : "bg-white text-gray-700 hover:bg-green-50 border-gray-100 hover:border-green-200 hover:shadow-md"
            )}
          >
            {language === 'ta' ? districtTranslations[district] : district}
          </button>
        ))}
      </div>
      
      {filteredDistricts.length === 0 && (
        <div className="text-center py-10 text-gray-400 font-medium">
          {getTranslation(language, 'noDistricts')}
        </div>
      )}
    </div>
  );
};
