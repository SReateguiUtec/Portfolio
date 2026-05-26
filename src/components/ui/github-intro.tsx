import React from 'react';
import { CommitsGrid } from './commits-grid';

export default function GithubIntro() {
    return (
        <section className="container mx-auto px-4 lg:px-8 py-10 border-b border-white/10">
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-[#3b82f6]/50 transition-colors duration-500">
                {/* Decoración de fondo estilo terminal */}
                <div className="absolute top-0 right-0 bg-[#3b82f6]/10 px-3 py-1 rounded-bl-lg text-xs font-mono text-[#60a5fa] border-l border-b border-[#3b82f6]/30">
                    README.md
                </div>

                <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                    <img
                        src="src/assets/Anime Avatar.png"
                        alt="Sebastian Reategui"
                        className="relative w-full h-full object-cover rounded-full border-2 border-[#3b82f6]/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="grow space-y-3 font-mono text-xs md:text-sm text-gray-300 w-full">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                        Hi there 👋, I'm Sebastian!
                    </h2>

                    <p className="text-gray-400 border-l-2 border-[#3b82f6] pl-4 italic leading-relaxed">
                        I'm a 26 year old Computer Science student living in Lima, Peru. I always enjoy learning new things and giving my best to every project.
                    </p>

                    <ul className="space-y-2 mt-5">
                        <li className="flex items-start gap-3">
                            <span className="text-xl shrink-0">🎓</span>
                            <span>I'm currently a <span className="text-[#60a5fa] font-semibold">3rd-year CS Student</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-xl shrink-0">🌱</span>
                            <span>I’m currently learning new languages and technologies like <span className="text-[#60a5fa] font-semibold">Rust, Angular & NestJS</span></span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-xl shrink-0">⚡</span>
                            <span>Fun fact: <span className="text-[#60a5fa] font-semibold">I was inspired by Blue Lock's pentagon for the hero design! </span></span>
                        </li>
                    </ul>

                    {/* Commits Grid Integrado */}
                    <div className="mt-8 pt-6 border-t border-white/10 w-full">
                        <div className="flex items-center gap-2 mb-4 w-full">
                            <span className="text-gray-400 font-mono text-xs uppercase tracking-widest border border-white/10 bg-black/40 px-3 py-1 rounded-full">
                                Activity
                            </span>
                            <div className="h-px bg-white/10 grow"></div>
                        </div>
                        <div className="flex justify-center w-full overflow-hidden">
                            <CommitsGrid text="UTEC" />
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-gray-500 font-mono text-[10px] w-full justify-end px-2">
                            <span>Less</span>
                            <div className="w-3 h-3 rounded-[2px] bg-black border border-white/5"></div>
                            <div className="w-3 h-3 rounded-[2px] border border-blue-400/20 bg-blue-500/20"></div>
                            <div className="w-3 h-3 rounded-[2px] border border-blue-400/40 bg-blue-500/40"></div>
                            <div className="w-3 h-3 rounded-[2px] border border-blue-400/60 bg-blue-500/60"></div>
                            <div className="w-3 h-3 rounded-[2px] border border-blue-400/80 bg-blue-500/80"></div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
