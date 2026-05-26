import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { THANKS_EN_LOGO, THANKS_ES_LOGO } from '../ui/ascii';
import AsciiPyramid from '../ascii-pyramid';

export default function ContactSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section id="contact" className="relative w-full py-16 lg:py-24 overflow-hidden border-t border-white/10 bg-black">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <Mail className="w-8 h-8 text-blue-400" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">{t.contact.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">{t.contact.getInTouch}</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>

                <div className="max-w-4xl flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{t.contact.heading}</h3>
                            <p className="text-white/60 font-mono text-sm max-w-md">
                                {t.contact.desc}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-64">
                        <a
                            href="mailto:reateguisebastian@gmail.com"
                            className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 p-4 rounded-2xl transition-all duration-300 text-white/70 hover:text-white group"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-mono text-sm">{t.contact.email}</span>
                        </a>

                        <a
                            href="https://github.com/SReateguiUtec"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 p-4 rounded-2xl transition-all duration-300 text-white/70 hover:text-white group"
                        >
                            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="font-mono text-sm">{t.contact.github}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Background glowing effects */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Footer with Pyramid and Thanks message */}
            <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-0 md:gap-16 pt-16 md:pt-24 pb-8 md:pb-0 overflow-hidden relative z-10">
                <div className="scale-50 md:scale-100 origin-center opacity-60 pointer-events-none -my-24 md:my-0 z-0">
                    <AsciiPyramid />
                </div>

                <div className="flex justify-center md:justify-start overflow-hidden z-10">
                    <pre className="font-mono text-[5px] sm:text-[8px] md:text-[10px] text-blue-500/80 leading-tight">
                        {language === 'en' ? THANKS_EN_LOGO : THANKS_ES_LOGO}
                    </pre>
                </div>
            </div>
        </section>
    );
}
