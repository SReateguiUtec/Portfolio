import { ExternalLink, FolderGit2, Terminal } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "FinTrend AI",
        description: "Cloud-Native Financial Data Pipeline & Analytics. Designed and built an end-to-end serverless data pipeline using AWS Glue to automate ETL workflows and structured analytical querying.",
        tech: ["AWS Glue", "Athena", "S3", "Flask", "Spring Boot", "React.js"],
        github: "https://github.com/SReateguiUtec/FinTrendAI",
        live: "#",
        year: "2026"
    },
    {
        id: 2,
        title: "MediGO",
        description: "Full-Stack Telemedicine Platform. Solely architected a secure REST API with JWT authentication. Developed the responsive SPA using React 19 and integrated real-time video consultations via Whereby SDK.",
        tech: ["Spring Boot", "React.js", "TypeScript", "Vite", "WebSockets"],
        github: "https://github.com/SReateguiUtec/MediGO-Repository",
        live: "#",
        year: "2025"
    },
    {
        id: 3,
        title: "SparseExcel",
        description: "Memory-Optimized Spreadsheet Engine. Implemented a memory-efficient spreadsheet engine from scratch leveraging custom Sparse Matrix representations to eliminate memory overhead.",
        tech: ["C++", "Javascript", "React.js", "Data Structures"],
        github: "https://github.com/SReateguiUtec/SparseExcel",
        live: "#",
        year: "2026"
    }
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="bg-black py-16 lg:py-24 relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <FolderGit2 className="text-blue-400 w-8 h-8" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">PROJECTS</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">Featured_Projects</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-[#050505] border border-white/10 p-6 flex flex-col hover:border-blue-400/40 transition-colors duration-300"
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-blue-400 transition-colors duration-300"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-blue-400 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-hover:border-blue-400 transition-colors duration-300"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-blue-400 transition-colors duration-300"></div>

                            {/* Top info */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-blue-400 font-mono text-[10px] tracking-widest">SYS.{project.year}</span>
                                <div className="flex gap-3">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            {/* Title & Desc */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-blue-400 shrink-0" />
                                {project.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-8 flex-1 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-[10px] font-mono text-blue-300 bg-blue-400/10 border border-blue-400/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Hover scanline effect */}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-400/5 to-transparent h-full w-full opacity-0 group-hover:opacity-100 -translate-y-full group-hover:animate-scanline pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
