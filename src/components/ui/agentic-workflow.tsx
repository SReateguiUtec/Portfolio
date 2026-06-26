"use client";
import React from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { VortexPage } from './vortex';

export default function AgenticWorkflow() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <VortexPage>
            <div className="w-full max-w-4xl mx-auto px-6 py-4 md:py-12 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg text-center">
                    {t.agentic.title}
                </h2>
                
                <div className="inline-block bg-[#d97757] px-4 py-1.5 rounded-full border-2 border-[#d97757] mb-5 md:mb-8 shadow-[0_0_15px_rgba(217,119,87,0.5)] transform rotate-1">
                    <p className="text-white font-mono text-xs md:text-sm tracking-widest uppercase font-bold flex items-center gap-2">
                        <Zap size={14} className="fill-white text-white" />
                        {t.agentic.subtitle}
                    </p>
                </div>
                
                <p className="text-gray-300 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-0 md:mb-10 drop-shadow-md">
                    {t.agentic.desc}
                </p>

            </div>
        </VortexPage>
    );
}
