"use client";

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

export default function TopBanner() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="w-full bg-[#050505] border-b border-white/5 px-4 py-3 flex items-center justify-center relative overflow-hidden">

            
            {/* Tech scanner effect */}
            <motion.div 
                className="absolute inset-0 w-1/3 h-full bg-linear-to-r from-transparent via-blue-500/10 to-transparent"
                initial={{ x: '-100vw' }}
                animate={{ x: '100vw' }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                }}
            />
            
            <div className="relative z-10 flex items-center justify-center w-full px-2">
                {/* Text with inline dot */}
                <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider sm:tracking-[0.2em] text-white/70 text-center leading-relaxed">
                    <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] mr-2 md:mr-3 mb-px" />
                    {t.banner.text}
                </span>
            </div>
        </div>
    );
}
