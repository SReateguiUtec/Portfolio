'use client';

"use client";
import { motion } from 'framer-motion';
import { LayersIcon } from '../stack';
import { FlowingLogos } from './flowing-logos';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

interface Logo {
    name: string;
    image: string;
    className?: string;
}

interface LogoCloudMarqueeProps {
    title?: string;
    description?: string;
    data?: Logo[];
    className?: string;
}

const defaultLogos: Logo[] = [
    { name: 'C++', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Go', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
    { name: 'JavaScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Next.js', image: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { name: 'Node.js', image: '/Node.svg' },
    { name: 'Spring Boot', image: '/spring-boot.svg' },
    { name: 'Flask', image: 'https://cdn.simpleicons.org/flask/white' },
    { name: 'FastAPI', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'Express', image: 'https://cdn.simpleicons.org/express/white' },
    { name: 'AWS', image: '/AWS Logo.svg', className: '!h-8' },
    { name: 'Vercel', image: '/Vercel.svg', className: 'invert' },
    { name: 'PostgreSQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'SQLite', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
    { name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'DynamoDB', image: '/AWS DynamoDB.svg' },
];

const workflowLogos: Logo[] = [
    { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub', image: 'https://cdn.simpleicons.org/github/white' },
    { name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', className: '!h-12' },
    { name: 'Postman', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Cursor', image: 'https://cdn.simpleicons.org/cursor/white' },
    { name: 'Gemini', image: '/Gemini Color Icon.svg' },
    { name: 'Claude', image: '/Claudecode Color Icon.svg' },
    { name: 'Codex', image: '/Codex Color Icon.svg' },
    { name: 'Ollama', image: 'https://cdn.simpleicons.org/ollama/white' },
    { name: 'Hugging Face', image: '/Hugging Face Color Icon.svg' },
    { name: 'Antigravity', image: '/Antigravity.svg' },
];

export default function LogoCloudMarquee({
    data = defaultLogos,
    className,
}: LogoCloudMarqueeProps) {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className={cn('relative w-full overflow-hidden py-24 bg-black', className)}>
            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <LayersIcon className="text-blue-400" size={32} />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">{t.logoCloud.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">{t.logoCloud.badge}</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mt-6 max-w-2xl text-white/60 text-sm md:text-base leading-relaxed'
                    >
                        {t.logoCloud.description}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className='relative mt-14'
                >
                    <div className='pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-black via-black/60 to-transparent' />
                    <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-black via-black/60 to-transparent' />
                    <div className="flex flex-col gap-12">
                        <FlowingLogos
                            data={data}
                            className='[--duration:40s]'
                        />
                        <FlowingLogos
                            data={workflowLogos}
                            reverse={true}
                            className='[--duration:35s]'
                        />
                    </div>
                </motion.div>
            </div>

            {/* Exactly as requested in the reference code */}
            <div className="relative -mt-16 h-96 w-full overflow-hidden mask-[radial-gradient(50%_50%,white,transparent)]">
                <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,rgba(59,130,246,1),transparent_70%)] before:opacity-40" />
                <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/20 bg-zinc-900" />
            </div>
        </section>
    );
}
