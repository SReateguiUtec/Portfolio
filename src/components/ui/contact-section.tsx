"use client";
import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { SendIcon } from '../send';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { THANKS_EN_LOGO, THANKS_ES_LOGO } from '../ui/ascii';

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
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">{t.contact.title}</h2>
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
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{t.contact.heading}</h3>
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
                    {/* Right Column: Serious Contact Form */}
                    <div className="w-full lg:w-1/2 bg-transparent border border-white/10 rounded-2xl p-6 md:p-10 relative">
                        {status === 'success' && (
                            <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300 rounded-lg border border-green-500/30">
                                <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
                                <h4 className="text-2xl font-bold text-white mb-2">{t.contact.formSuccess}</h4>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="text-white font-medium text-sm">
                                        {t.contact.formNamePlaceholder.includes('Nombre') ? 'Nombre' : 'Name'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={status === 'loading'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-[#111111] border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors disabled:opacity-50"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="text-white font-medium text-sm">
                                        {t.contact.formEmailPlaceholder.includes('correo') ? 'Correo' : 'Email'}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        disabled={status === 'loading'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-[#111111] border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white font-medium text-sm">
                                    {t.contact.formMessagePlaceholder.includes('ayudar') ? 'Mensaje' : 'Message'}
                                </label>
                                <textarea
                                    required
                                    disabled={status === 'loading'}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="w-full bg-[#111111] border border-white/10 focus:border-white/30 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors resize-none disabled:opacity-50"
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 text-sm mt-1 bg-red-400/10 p-4 rounded-lg border border-red-400/20 animate-in fade-in">
                                    <XCircle className="w-5 h-5" />
                                    <span>{t.contact.formError}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="mt-2 w-full bg-white hover:bg-gray-200 text-black font-semibold text-sm py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span>{t.contact.formSubmit.includes('Enviar') ? 'Enviar' : 'Submit'}</span>
                                )}
                            </button>
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
