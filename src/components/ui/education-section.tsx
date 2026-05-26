import { GraduationCap, Award } from 'lucide-react';
import AsciiPyramid from '../ascii-pyramid';

export default function EducationSection() {
    return (
        <section id="education" className="bg-black py-16 lg:py-24 relative overflow-hidden flex flex-col justify-center">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <GraduationCap className="text-blue-400 w-8 h-8" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">EDUCATION</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">ACADEMIC_BACKGROUND</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>


                {/* Education Info (Inspired) */}
                <div className="max-w-3xl mx-auto py-8">
                    <div className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative px-6 md:px-8 py-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500">
                        {/* Subtle left accent that lights up */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-teal-500 rounded-r-full group-hover:h-3/4 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />

                        <div className="flex flex-col gap-2">
                            <a
                                href="https://utec.edu.pe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-xl md:text-2xl font-bold text-white hover:text-teal-400 transition-colors duration-300"
                            >
                                <GraduationCap className="w-6 h-6 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                                Universidad de Ingeniería y Tecnología (UTEC)
                            </a>

                            <div className="text-white/50 font-medium text-sm md:text-base flex items-center gap-3 pl-9 mb-1">
                                <span>BS in Computer Science</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="font-mono text-white/40">2024 - 2029</span>
                            </div>

                            <div className="text-teal-400/80 font-medium text-xs md:text-sm flex items-center gap-2 pl-9">
                                <Award className="w-4 h-4" />
                                <span>Berners Lee Contest Finalist - CS2031 Platform-Based Development</span>
                            </div>
                        </div>

                        <div className="pl-9 md:pl-0 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <div className="h-px w-8 bg-teal-500/40" />
                            <span className="text-[10px] font-mono tracking-widest text-teal-400/80 uppercase">IN_PROGRESS</span>
                        </div>
                    </div>
                </div>

                {/* ASCII Pyramid */}
                <div className="w-full flex justify-center mt-8">
                    <AsciiPyramid />
                </div>
            </div>
        </section>
    );
}
