"use client";
import { useState, useEffect, useTransition } from 'react';
import { LOGO } from './ascii';
import { Download, Mail, Menu, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { FrameButton } from './frame-button';
import { ViewportVideo } from './viewport-video';
import { openCopilot } from '../../lib/copilot-events';

export default function HeroAscii() {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [, startTransition] = useTransition();

    const toggleLanguage = () => {
        startTransition(() => {
            setLanguage(language === 'en' ? 'es' : 'en');
        });
    };

    // Typewriter effect state for terminal command & response
    const [commandText, setCommandText] = useState('');
    const [showResponse, setShowResponse] = useState(false);
    const [roleDisplayText, setRoleDisplayText] = useState('');

    useEffect(() => {
        setCommandText('');
        setShowResponse(false);
        setRoleDisplayText('');

        let cmdIndex = 0;
        const targetCommand = "whoami";

        const cmdInterval = setInterval(() => {
            setCommandText(targetCommand.substring(0, cmdIndex + 1));
            cmdIndex++;
            if (cmdIndex >= targetCommand.length) {
                clearInterval(cmdInterval);
                setTimeout(() => {
                    setShowResponse(true);
                }, 300);
            }
        }, 80);

        return () => {
            clearInterval(cmdInterval);
        };
    }, [language]);

    useEffect(() => {
        if (!showResponse) return;

        let roleIndex = 0;
        const targetRole = t.hero.role;

        const roleInterval = setInterval(() => {
            setRoleDisplayText(targetRole.substring(0, roleIndex + 1));
            roleIndex++;
            if (roleIndex >= targetRole.length) {
                clearInterval(roleInterval);
            }
        }, 55);

        return () => clearInterval(roleInterval);
    }, [showResponse, t.hero.role]);

    // Scanner Effect State
    const [tick, setTick] = useState(0);
    const asciiLines = LOGO.split('\n');
    const L = asciiLines.length;

    useEffect(() => {
        // 1 tick = 80ms
        // 3 scans = L * 3 ticks
        // 5 seconds pause = 5000 / 80 = ~63 ticks
        const totalCycleTicks = L * 3 + 63;

        const timer = setInterval(() => {
            setTick(t => (t + 1) % totalCycleTicks);
        }, 80);

        return () => clearInterval(timer);
    }, [L]);

    // If we are within the first 3 scans, calculate the active row using modulo
    const scanRow = tick < L * 3 ? tick % L : -1;

    return (
        <main className="relative min-h-[70vh] lg:min-h-[90vh] overflow-hidden bg-black pb-12">
            {/* Hero video background */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-30 md:opacity-60 flex items-center justify-center p-4 md:p-8 lg:p-16">
                <ViewportVideo
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover lg:object-contain object-center scale-115"
                >
                    <source src="/Herov2.mp4" type="video/mp4" />
                </ViewportVideo>
            </div>

            {/* Mobile stars background */}
            <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

            {/* Top Header */}
            <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
                <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-4 group cursor-pointer">
                        <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12 group-hover:text-blue-400 transition-colors duration-300">
                            S.REATEGUI
                        </div>
                        <div className="hidden sm:block lg:hidden xl:block h-3 lg:h-4 w-px bg-white/40"></div>
                        <span className="hidden sm:inline lg:hidden xl:inline text-white/60 text-[8px] lg:text-[10px] font-mono tracking-widest">{t.hero.portfolio}</span>
                    </div>

                    <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-8 lg:text-[10px] xl:text-[11px] tracking-wider font-mono text-white/70 uppercase">
                        <a href="#about" className="hover:text-blue-400 transition-colors duration-200">{t.nav.about}</a>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <a href="#projects" className="hover:text-blue-400 transition-colors duration-200">{t.nav.projects}</a>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <a href="#education" className="hover:text-blue-400 transition-colors duration-200">{t.nav.education}</a>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <a href="#Skills" className="hover:text-blue-400 transition-colors duration-200">{t.nav.skills}</a>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <a href="#contact" className="hover:text-blue-400 transition-colors duration-200">{t.nav.contact}</a>
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <FrameButton
                            as="button"
                            variant="outline"
                            onClick={toggleLanguage}
                            className="px-3 py-1 text-[10px] text-white border-transparent hover:border-transparent focus:outline-none"
                            offset={2}
                            hoverOffset={2}
                            size={10}
                        >
                            <span className={language === 'en' ? 'font-bold' : 'text-white/50'}>EN</span>
                            <span className="text-white/30 mx-1">/</span>
                            <span className={language === 'es' ? 'font-bold' : 'text-white/50'}>ES</span>
                        </FrameButton>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white/70 hover:text-white p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-8 font-mono"
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <nav className="flex flex-col gap-10 text-lg tracking-widest text-white/90 mt-8 uppercase">
                            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors duration-200">{t.nav.about}</a>
                            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors duration-200">{t.nav.projects}</a>
                            <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors duration-200">{t.nav.education}</a>
                            <a href="#Skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors duration-200">{t.nav.skills}</a>
                            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors duration-200">{t.nav.contact}</a>

                            <div className="pt-8 mt-4 border-t border-white/10 flex items-center">
                                <FrameButton
                                    as="button"
                                    variant="outline"
                                    onClick={toggleLanguage}
                                    className="px-4 py-2 text-sm text-white border-transparent hover:border-transparent focus:outline-none"
                                    offset={2}
                                    hoverOffset={2}
                                    size={10}
                                >
                                    <span className={language === 'en' ? 'font-bold' : 'text-white/50'}>EN</span>
                                    <span className="text-white/30 mx-2">/</span>
                                    <span className={language === 'es' ? 'font-bold' : 'text-white/50'}>ES</span>
                                </FrameButton>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Frame Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
            <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
            <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '2vh' }}></div>
            <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '2vh' }}></div>

            <div className="relative z-10 flex min-h-[70vh] lg:min-h-[90vh] items-center pt-16 lg:pt-0" style={{ marginTop: '2vh' }}>
                <div className="container mx-auto px-6 lg:px-8 lg:ml-[2%] xl:ml-[5%]">
                    <div className="max-w-lg relative">
                        {/* Top decorative line */}
                        <div className="flex items-center gap-2 mb-3 opacity-60">
                            <div className="w-8 h-px bg-white"></div>
                            <span className="text-white text-[10px] font-mono tracking-wider">001</span>
                            <div className="flex-1 h-px bg-white"></div>
                        </div>

                        {/* Title with dithered accent */}
                        <div className="relative">
                            <div className="hidden lg:block absolute -left-4 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
                            <div className="mb-7 text-[9px] md:text-[12px] lg:text-[15px] leading-none whitespace-pre drop-shadow-[0_0_15px_rgba(96,165,250,0.8)] flex flex-col font-bold">
                                {asciiLines.map((line, i) => {
                                    const isScanning = i === scanRow;
                                    const rowColor = 'text-blue-400';

                                    return (
                                        <pre
                                            key={i}
                                            className={`${isScanning ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)] brightness-150 font-black' : rowColor} transition-colors duration-75 ease-in-out m-0 p-0 leading-[1.1]`}
                                        >
                                            {line}
                                        </pre>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Decorative dots pattern - desktop only */}
                        <div className="hidden lg:flex gap-1 mb-8 opacity-40 flex-wrap max-w-max">
                            {Array.from({ length: 52 }).map((_, i) => (
                                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full shrink-0"></div>
                            ))}
                        </div>

                        {/* Description with subtle grid pattern */}
                        <div className="relative">
                            <p className="text-xs lg:text-base text-gray-200 mb-5 lg:mb-6 leading-relaxed font-mono opacity-100 max-w-md [text-shadow:_0_2px_4px_rgb(0_0_0_/_100%),_0_0_10px_rgb(0_0_0_/_100%)] lg:[text-shadow:_none]">
                                <span className="text-white font-bold block mb-2">
                                    <span className="text-blue-400">guest@sreategui:~$ </span>
                                    <span>{commandText}</span>
                                    {!showResponse && (
                                        <span className="inline-block w-1.5 h-[1.1em] bg-blue-400 ml-1 animate-pulse align-middle -translate-y-px" />
                                    )}
                                    {showResponse && (
                                        <span className="block mt-1.5 text-white">
                                            {roleDisplayText}
                                            <span className="inline-block w-1.5 h-[1.1em] bg-blue-400 ml-1 animate-pulse align-middle -translate-y-px" />
                                        </span>
                                    )}
                                </span>
                                {t.hero.description}
                            </p>

                            {/* Technical corner accent - desktop only */}
                            <div className="hidden lg:block absolute -right-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 lg:gap-10">
                            {/* Quick Metrics */}
                            <div className="order-2 lg:order-1 flex items-center gap-4 lg:gap-8 opacity-90 max-w-max border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
                                <div className="flex flex-col">
                                    <span className="text-white font-extrabold text-xl lg:text-3xl tracking-tight">{t.hero.metrics.metric1.value}</span>
                                    <span className="text-[9px] lg:text-[10px] text-white/50 tracking-widest font-mono uppercase mt-1">{t.hero.metrics.metric1.label}</span>
                                </div>
                                <div className="w-px h-8 lg:h-10 bg-white/10"></div>
                                <div className="flex flex-col">
                                    <span className="text-white font-extrabold text-xl lg:text-3xl tracking-tight">{t.hero.metrics.metric2.value}</span>
                                    <span className="text-[9px] lg:text-[10px] text-white/50 tracking-widest font-mono uppercase mt-1">{t.hero.metrics.metric2.label}</span>
                                </div>
                                <div className="w-px h-8 lg:h-10 bg-white/10"></div>
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-extrabold text-xl lg:text-3xl tracking-tight">{t.hero.metrics.metric3.value}</span>
                                    <span className="text-[9px] lg:text-[10px] text-white/50 tracking-widest font-mono uppercase mt-1">{t.hero.metrics.metric3.label}</span>
                                </div>
                            </div>

                            {/* Buttons with technical accents */}
                            <div className="order-1 lg:order-2 grid w-[min(100%,19rem)] grid-cols-2 gap-2 lg:flex lg:w-auto lg:max-w-none lg:flex-row lg:flex-wrap lg:gap-4">
                                <button
                                    type="button"
                                    onClick={openCopilot}
                                    className="relative col-span-2 hidden sm:flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 lg:px-6 lg:py-3 bg-blue-500/20 text-white font-mono text-xs lg:text-sm border border-blue-400/70 hover:bg-blue-500/35 hover:border-blue-300 transition-all duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                                    aria-label={t.copilot.heroCta}
                                >
                                    <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <Bot className="w-4 h-4 text-blue-300" aria-hidden="true" />
                                    {t.copilot.heroCta}
                                </button>

                                <a href={language === 'es' ? '/CV-ES.pdf' : '/CV-EN.pdf'} download="Sebastian-Reategui-CV.pdf" className="relative col-span-2 flex min-h-11 items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group">
                                    <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <Download className="w-4 h-4" />
                                    {t.hero.downloadResume}
                                </a>

                                <a href="https://github.com/SReateguiUtec" target="_blank" rel="noopener noreferrer" className="relative flex min-h-11 items-center justify-center gap-2 px-3 py-2 lg:px-6 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>

                                <a href="mailto:reateguisebastian1@gmail.com" className="relative flex min-h-11 items-center justify-center gap-2 px-3 py-2 lg:px-6 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                            </div>
                        </div>

                        {/* Bottom technical notation - desktop only */}
                        <div className="hidden lg:flex items-center gap-2 mt-8 opacity-40">
                            <span className="text-white text-[9px] font-mono">∞</span>
                            <div className="flex-1 h-px bg-white"></div>
                            <span className="text-white text-[9px] font-mono">SYS.ACT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm" style={{ bottom: '2vh' }}>
                <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
                        <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
                        <span className="lg:hidden">SYS.ACT</span>
                        <div className="hidden lg:flex gap-1">
                            {[8, 12, 5, 14, 7, 10, 6, 15].map((height, i) => (
                                <div key={i} className="w-1 bg-white/30" style={{ height: `${height}px` }}></div>
                            ))}
                        </div>
                        <span>V1.0.0</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
                        <span className="hidden lg:inline">◐ RENDERING</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="hidden lg:inline">FRAME: ∞</span>
                    </div>
                </div>
            </div>

            <style>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
        
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }
      `}</style>
        </main>
    );
}
