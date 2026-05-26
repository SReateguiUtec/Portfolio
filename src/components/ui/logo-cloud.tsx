'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { FlowingLogos } from './flowing-logos';
import { cn } from '../../lib/utils';

interface Logo {
    name: string;
    image: string;
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
    { name: 'Node.js', image: 'src/assets/Node.svg' },
    { name: 'Spring Boot', image: 'src/assets/spring-boot.svg' },
    { name: 'Flask', image: 'https://cdn.simpleicons.org/flask/white' },
    { name: 'FastAPI', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'Express', image: 'https://cdn.simpleicons.org/express/white' },
    { name: 'AWS', image: 'src/assets/AWS Logo.svg' },
    { name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'PostgreSQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'SQLite', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
    { name: 'MongoDB', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'DynamoDB', image: 'src/assets/AWS DynamoDB.svg' },
];

const workflowLogos: Logo[] = [
    { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'GitHub', image: 'https://cdn.simpleicons.org/github/white' },
    { name: 'Postman', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Terminal', image: 'https://cdn.simpleicons.org/gnometerminal/white' },
    { name: 'Cursor', image: 'https://cdn.simpleicons.org/cursor/white' },
    { name: 'Gemini', image: 'src/assets/Gemini Color Icon.svg' },
    { name: 'Claude', image: 'src/assets/Claudecode Color Icon.svg' },
    { name: 'Codex', image: 'src/assets/Codex Color Icon.svg' },
    { name: 'Ollama', image: 'https://cdn.simpleicons.org/ollama/white' },
    { name: 'Hugging Face', image: 'src/assets/Hugging Face Color Icon.svg' },
    { name: 'Antigravity', image: 'src/assets/Antigravity.svg' },
];

export default function LogoCloudMarquee({
    title = 'Skills',
    description = 'Languages, frameworks, and infrastructure I use to build scalable applications.',
    data = defaultLogos,
    className,
}: LogoCloudMarqueeProps) {
    return (
        <section className={cn('relative w-full overflow-hidden py-24', className)}>
            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <Cpu className="text-blue-400 w-8 h-8" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">{title}</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">TECHSTACK_&_TOOLS</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mt-6 max-w-2xl text-white/60 text-sm md:text-base leading-relaxed'
                    >
                        {description}
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
        </section>
    );
}
