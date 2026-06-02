"use client";
import React from 'react';
import { Pin } from 'lucide-react';
import { UserIcon } from '../user';
import { CommitsGrid } from './commits-grid';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

export default function GithubIntro() {
    const { language } = useLanguage();
    const t = translations[language];

    // Format badge text depending on language
    const badgeText = language === 'es' ? 'Sobre_Mi' : 'About_Me';

    return (
        <section id="about" className="container mx-auto px-4 lg:px-8 py-10 flex justify-center relative z-10">
            <div className="relative w-full">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <UserIcon className="text-blue-400" size={32} />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t.nav.about}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest uppercase">{badgeText}</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>

                {/* Luz pulsante de fondo */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] animate-pulse rounded-[3rem] pointer-events-none -z-10 mt-24"></div>

                <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                    {/* Pinned Badge - Top Left */}
                    <div className="absolute top-0 left-0 bg-white/5 px-3 py-1 rounded-br-lg text-[10px] font-mono text-gray-400 border-r border-b border-white/10 flex items-center gap-1.5">
                        <Pin size={10} className="text-gray-400" />
                        <span>Pinned</span>
                    </div>

                    {/* Decoración de fondo estilo terminal */}
                    <div className="absolute top-0 right-0 bg-[#3b82f6]/10 px-3 py-1 rounded-bl-lg text-xs font-mono text-[#60a5fa] border-l border-b border-[#3b82f6]/30">
                        {t.intro.readme}
                    </div>

                    <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 relative group cursor-pointer">
                        <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full transition-opacity duration-300 group-hover:bg-blue-500/50"></div>

                        {/* Pixelate SVG Filter Def */}
                        <svg width="0" height="0" className="absolute">
                            <filter id="pixelate" x="0" y="0">
                                <feFlood x="2" y="2" height="1" width="1" />
                                <feComposite width="4" height="4" />
                                <feTile result="a" />
                                <feComposite in="SourceGraphic" in2="a" operator="in" />
                                <feMorphology operator="dilate" radius="2" />
                            </filter>
                        </svg>

                        {/* 8-bit Pixel Container */}
                        <div className="relative w-full h-full rounded-full border-2 border-[#3b82f6]/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] overflow-hidden bg-black">

                            {/* Pixelated State */}
                            <div className="absolute inset-0 block group-hover:opacity-0 transition-opacity duration-300 z-10">
                                <img
                                    src="/Anime Avatar.png"
                                    alt="Sebastian Reategui"
                                    className="w-full h-full object-cover"
                                    style={{ filter: 'url(#pixelate)' }}
                                />
                                {/* Retro Scanline Overlay */}
                                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                                    style={{ backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)' }}
                                />
                            </div>

                            {/* Normal State (Hover) */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                                <img
                                    src="/Anime Avatar.png"
                                    alt="Sebastian Reategui Normal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grow space-y-3 font-mono text-xs md:text-sm text-gray-300 w-full">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 border-b border-white/10 pb-2">
                            {t.intro.hi}
                        </h2>

                        <p className="text-gray-400 border-l-2 border-[#3b82f6] pl-4 italic leading-relaxed">
                            {t.intro.bio}
                        </p>

                        <ul className="space-y-2 mt-5">
                            <li className="flex items-start gap-3">
                                <span className="w-6 flex justify-center shrink-0 text-xl">🚀</span>
                                <span dangerouslySetInnerHTML={{ __html: t.intro.bullet2 }}></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 flex justify-center shrink-0 text-xl">💼</span>
                                <span dangerouslySetInnerHTML={{ __html: t.intro.bullet5 }}></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-6 flex justify-center shrink-0 text-xl">🧩</span>
                                <span dangerouslySetInnerHTML={{ __html: t.intro.bullet3 }}></span>
                            </li>
                        </ul>

                        {/* Commits Grid Integrado */}
                        <div className="mt-8 w-full">
                            <div className="flex items-center gap-2 mb-4 w-full">
                                <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-white/10 bg-black/40 px-3 py-1 rounded-full">
                                    {t.intro.activity}
                                </span>
                                <div className="h-px bg-white/10 grow"></div>
                            </div>
                            <div className="flex justify-center w-full overflow-hidden">
                                <CommitsGrid text="UTEC" />
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-gray-500 font-mono text-[10px] w-full justify-end px-2">
                                <span>{t.intro.less}</span>
                                <div className="w-3 h-3 rounded-[2px] bg-black border border-white/5"></div>
                                <div className="w-3 h-3 rounded-[2px] border border-blue-400/20 bg-blue-500/20"></div>
                                <div className="w-3 h-3 rounded-[2px] border border-blue-400/40 bg-blue-500/40"></div>
                                <div className="w-3 h-3 rounded-[2px] border border-blue-400/60 bg-blue-500/60"></div>
                                <div className="w-3 h-3 rounded-[2px] border border-blue-400/80 bg-blue-500/80"></div>
                                <span>{t.intro.more}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
