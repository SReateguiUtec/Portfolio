"use client";
import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { SendIcon } from '../send';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { THANKS_EN_LOGO, THANKS_ES_LOGO } from '../ui/ascii';
import { FrameButton } from './frame-button';

import { GradientTracing } from './gradient-tracing';

export default function ContactSection() {
    const { language } = useLanguage();
    const t = translations[language];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="relative w-full pt-16 pb-8 lg:pt-24 lg:pb-12 overflow-hidden border-t border-white/10 bg-black">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <SendIcon className="text-blue-400" size={32} />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{t.contact.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">{t.contact.getInTouch}</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start justify-between w-full">
                    {/* Left Column: Text */}
                    <div className="flex flex-col gap-10 w-full lg:w-1/2">
                        <div className="flex flex-col gap-4">
                            <div className="relative inline-block self-start">
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{t.contact.heading}</h3>
                                <div className="absolute bottom-0 left-0 w-full">
                                    <div className="hidden xl:block">
                                        <GradientTracing 
                                            width={450} 
                                            height={2} 
                                            baseColor="rgba(255,255,255,0.1)" 
                                            gradientColors={['transparent', '#3b82f6', 'transparent']} 
                                            animationDuration={3} 
                                            strokeWidth={3} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/60 font-mono text-sm md:text-base max-w-md leading-relaxed">
                                {t.contact.desc}
                            </p>
                        </div>

                        <div className="hidden lg:block mt-8 opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-default">
                            <pre className="font-mono text-[5px] sm:text-[8px] md:text-[10px] text-blue-500 leading-tight">
                                {language === 'en' ? THANKS_EN_LOGO : THANKS_ES_LOGO}
                            </pre>
                        </div>
                    </div>
                    {/* Right Column: Technical Contact Form */}
                    <div className="w-full lg:w-1/2 bg-black border border-blue-500/30 rounded-lg p-5 md:p-6 relative shadow-[0_0_30px_rgba(59,130,246,0.1)] font-mono">
                        {/* Terminal Header Decor */}
                        <div className="absolute top-0 left-0 right-0 bg-blue-500/10 border-b border-blue-500/30 p-2 flex items-center justify-between rounded-t-lg">
                            <div className="flex gap-2 pl-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-[10px] text-blue-400 font-bold tracking-widest">SECURE_TRANSMISSION_PROTOCOL</span>
                            <div className="w-10"></div>
                        </div>

                        {status === 'success' && (
                            <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300 rounded-lg border border-green-500/30">
                                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                                <h4 className="text-xl font-bold text-green-400 mb-2">{t.contact.formSuccess}</h4>
                                <p className="text-green-400/50 text-xs mt-2">TRANSMISSION_COMPLETE</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-6">
                            <div className="flex flex-col sm:flex-row gap-5 w-full">
                                <div className="flex flex-col gap-2 relative group flex-1">
                                    <label className="text-blue-400 text-xs tracking-widest uppercase flex gap-2 items-center">
                                        <span className="text-white/50">{">"}</span> {t.contact.formNamePlaceholder.includes('Nombre') ? 'ID_USUARIO' : 'USER_ID'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={status === 'loading'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent border-b border-white/20 focus:border-blue-400 rounded-none px-0 py-2 text-white text-sm outline-none transition-all duration-300 disabled:opacity-50 font-mono placeholder:text-white/20 focus:shadow-[0_1px_10px_rgba(59,130,246,0.2)]"
                                        placeholder="_"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 relative group flex-1">
                                    <label className="text-blue-400 text-xs tracking-widest uppercase flex gap-2 items-center">
                                        <span className="text-white/50">{">"}</span> {t.contact.formEmailPlaceholder.includes('correo') ? 'DIR_CORREO' : 'MAIL_DIR'}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        disabled={status === 'loading'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent border-b border-white/20 focus:border-blue-400 rounded-none px-0 py-2 text-white text-sm outline-none transition-all duration-300 disabled:opacity-50 font-mono placeholder:text-white/20 focus:shadow-[0_1px_10px_rgba(59,130,246,0.2)]"
                                        placeholder="_"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 relative group">
                                <label className="text-blue-400 text-xs tracking-widest uppercase flex gap-2 items-center">
                                    <span className="text-white/50">{">"}</span> {t.contact.formMessagePlaceholder.includes('ayudar') ? 'PAYLOAD' : 'PAYLOAD'}
                                </label>
                                <textarea
                                    required
                                    disabled={status === 'loading'}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full bg-[#050505] border border-white/20 focus:border-blue-400 rounded-md p-3 text-white text-sm outline-none transition-all duration-300 resize-none disabled:opacity-50 font-mono focus:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                    placeholder="..."
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 text-xs mt-1 bg-red-400/10 p-3 rounded border border-red-400/20 animate-in fade-in uppercase tracking-widest">
                                    <XCircle className="w-4 h-4 shrink-0" />
                                    <span>[ERR] {t.contact.formError}</span>
                                </div>
                            )}

                            <FrameButton
                                as="button"
                                type="submit"
                                variant="outline"
                                glow={true}
                                disabled={status === 'loading'}
                                className="mt-4 w-full text-blue-400 border-blue-500 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-300 font-bold tracking-widest text-xs sm:text-sm py-4 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-visible uppercase"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>ENCRYPTING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>[ {t.contact.formSubmit.includes('Enviar') ? 'EJECUTAR_ENVÍO' : 'EXECUTE_TX'} ]</span>
                                    </>
                                )}
                            </FrameButton>
                        </form>
                    </div>
                </div>

                {/* Mobile ASCII (Below Form) */}
                <div className="lg:hidden w-full flex justify-center mt-16 opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-default">
                    <pre className="font-mono text-[7px] sm:text-[10px] md:text-[12px] text-blue-500 leading-tight text-center overflow-hidden">
                        {language === 'en' ? THANKS_EN_LOGO : THANKS_ES_LOGO}
                    </pre>
                </div>
            </div>

            {/* Background glowing effects */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        </section>
    );
}
