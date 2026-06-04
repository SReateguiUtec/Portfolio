"use client";
'use client'

import { useState, useRef, useEffect } from 'react'

import { FULL_STACK_BIO, SKILLS_CONTENT, PROJECTS_DATA, CONTACT_INFO, PERSONAL_EXTRA } from '../../data/content'
import { useLanguage } from '../../context/LanguageContext'
import { copilot } from './ascii'

interface PortfolioTerminalProps {
    onClose?: () => void;
}

export default function PortfolioTerminal({ onClose }: PortfolioTerminalProps) {
    const { language } = useLanguage();

    const getWelcomeMessage = (lang: string) => `
${copilot.trim()}

${lang === 'es' ? '[SISTEMA INICIALIZADO] - AI Terminal Copilot v1.0' : '[SYSTEM INITIALIZED] - AI Terminal Copilot v1.0'}

${lang === 'es' ? "¡Bienvenido a Copilot! Escribe 'help' para ver los comandos disponibles, o hazme cualquier pregunta en lenguaje natural y la IA te responderá." : "Welcome to Copilot! Type 'help' to see available commands, or ask any question in natural language and the AI Copilot will answer it."}`;

    const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
        {
            command: '/welcome',
            output: getWelcomeMessage('en') // This gets overridden dynamically during render below
        }
    ]);

    const displayHistory = history.map((item, index) => {
        if (index === 0 && item.command === '/welcome') {
            return { ...item, output: getWelcomeMessage(language) };
        }
        return item;
    });

    const [currentCommand, setCurrentCommand] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const historyIndex = useRef(-1)
    const bottomRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const commands = {
        'help': () => language === 'es' ? `
[COMANDOS_DISPONIBLES]

about       Mostrar información personal
projects    Ver el portafolio de proyectos
skills      Mostrar habilidades técnicas
education   Ver historial educativo
contact     Mostrar información de contacto
clear       Limpiar la pantalla de la terminal
exit        Cerrar la terminal
help        Mostrar este mensaje de ayuda

[AI COPILOT ACTIVADO]
También puedes escribir cualquier pregunta en lenguaje natural (ej. "¿Cuál es tu lenguaje de programación principal?") y la IA responderá basándose en mi portafolio.
    ` : `
[AVAILABLE_COMMANDS]

about       Display personal information
projects    View project portfolio
skills      Show technical skills
education   View educational background
contact     Show contact information
clear       Clear terminal screen
exit        Close the terminal
help        Display this help message

[AI COPILOT ENABLED]
You can also type any question in natural language (e.g. "What is your main programming language?") and the AI will answer based on my portfolio.
    `,
        'about': () => `
${language === 'es' ? 'Nombre' : 'Name'}: Sebastián Reátegui
${language === 'es' ? 'Rol' : 'Role'}: Full Stack Software Engineer / CS Student
${language === 'es' ? 'Ubicación' : 'Location'}: Lima, Peru
${language === 'es' ? 'Estado' : 'Status'}: ${language === 'es' ? CONTACT_INFO.status.es : CONTACT_INFO.status.en}

Bio: ${language === 'es' ? FULL_STACK_BIO.es : FULL_STACK_BIO.en}
    `,
        'projects': () => `
${language === 'es' ? '[PORTAFOLIO DE PROYECTOS]' : '[PROJECT PORTFOLIO]'}

` + PROJECTS_DATA.map((p, i) => `${i + 1}. ${language === 'es' ? p.name.es : p.name.en}\n   ${(language === 'es' ? p.content.es : p.content.en).replace(/\n/g, '\n   ')}`).join('\n\n'),
        'skills': () => language === 'es' ? SKILLS_CONTENT.es : SKILLS_CONTENT.en,
        'education': () => language === 'es' ? `
[EDUCACIÓN]

Universidad de Ingeniería y Tecnología (UTEC)
Bachiller en Ciencia de la Computación (Computer Science)
Estado: 3er Año / 5to Semestre

Logros:
• Finalista en el Concurso Berners Lee - Desarrollo Basado en Plataformas CS2031
    ` : `
[EDUCATION]

Universidad de Ingeniería y Tecnología (UTEC)
Bachelor of Science in Computer Science
Status: 3rd Year / 5th Semester

Honors:
• Berners Lee Contest Finalist - CS2031 Platform-Based Development
    `,
        'contact': () => language === 'es' ? `INFORMACIÓN DE CONTACTO
-----------------------
📧 Email:    reateguisebastian@gmail.com
🐙 GitHub:   https://github.com/SReateguiUtec

Actualmente abierto a nuevas oportunidades, colaboraciones o simplemente para charlar sobre tecnología!
    ` : `CONTACT INFORMATION
-------------------
📧 Email:    reateguisebastian@gmail.com
🐙 GitHub:   https://github.com/SReateguiUtec

I'm currently open to new opportunities, collaborations, or just to chat about tech!
    `,
        'clear': () => {
            setHistory([])
            return ''
        },
        'exit': () => {
            if (onClose) onClose();
            return ''
        },
        'quit': () => {
            if (onClose) onClose();
            return ''
        }
    }

    const handleCommand = async () => {
        if (!currentCommand.trim() || isLoading) return;
        const cmdText = currentCommand.trim()
        const cmd = cmdText.toLowerCase()

        const commandFn = commands[cmd as keyof typeof commands]

        if (cmd === 'clear' || cmd === 'exit' || cmd === 'quit') {
            commandFn()
            setCurrentCommand('')
            historyIndex.current = -1
            return
        }

        if (commandFn) {
            const output = commandFn()
            setHistory(prev => [...prev, { command: cmdText, output }])
            setCurrentCommand('')
            historyIndex.current = -1
            return
        }

        // AI Copilot Integration
        setHistory(prev => [...prev, { command: cmdText, output: '' }])
        setCurrentCommand('')
        historyIndex.current = -1
        setIsLoading(true)

        try {
            const systemInstruction = `
You are "Terminal Copilot", an AI terminal assistant representing Sebastián Reátegui.
Your tone should be very warm, incredibly friendly, enthusiastic, and highly conversational, while still maintaining the developer-friendly terminal aesthetic.
Don't be a cold robot. Use an engaging, conversational voice, and feel free to use a couple of emojis to lighten the mood!
Answer questions about Sebastian concisely but in a very friendly, supportive, and natural way (1 or 2 short paragraphs max).
Keep formatting clean using line breaks and hyphens for lists.
Answer in the language of the user (default to Spanish if they speak Spanish). 

Here is Sebastian's full portfolio information for your context:
- BIO: ${language === "es" ? FULL_STACK_BIO.es : FULL_STACK_BIO.en}
- PERSONAL INFO & HOBBIES: ${language === "es" ? PERSONAL_EXTRA.es : PERSONAL_EXTRA.en}
- LANGUAGES: ${language === "es" ? "Español (Nativo) e Inglés 🇺🇸 (C1 avanzado)" : "Spanish (Native) and English 🇺🇸 (Advanced C1)"}
- SKILLS: ${language === "es" ? SKILLS_CONTENT.es : SKILLS_CONTENT.en}
- PROJECTS: ${PROJECTS_DATA.map(p => language === "es" ? p.content.es : p.content.en).join('\n\n')}
- CONTACT: Email: ${CONTACT_INFO.email}, GitHub: ${CONTACT_INFO.github}, Status: ${language === "es" ? CONTACT_INFO.status.es : CONTACT_INFO.status.en}

Answer user questions accurately and professionally using the portfolio information above. If you don't know something, or the user asks a question unrelated to Sebastian, politely say you only have access to his professional portfolio details.
`;

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: cmdText,
                    systemInstruction
                })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error === "Missing GEMINI_API_KEY") {
                    setHistory(prev => {
                        const newHistory = [...prev];
                        newHistory[newHistory.length - 1].output = "Command not found. Type 'help' to see available commands.\n(AI Copilot is offline: API key not configured)";
                        return newHistory;
                    });
                    setIsLoading(false);
                    return;
                }
                throw new Error(data.error || "Failed to communicate with AI");
            }

            let responseText = data.text.trim();
            if (responseText.startsWith("```")) {
                responseText = responseText.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "");
            }

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].output = responseText;
                return newHistory;
            });
        } catch (error) {
            console.error('Error connecting to AI:', error)
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].output = "Error connecting to AI Copilot. Please try again later or type 'help'.";
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const newIndex = Math.min(historyIndex.current + 1, history.length - 1)
            historyIndex.current = newIndex
            if (history.length > 0) {
                setCurrentCommand(history[history.length - 1 - newIndex]?.command || '')
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            const newIndex = Math.max(historyIndex.current - 1, -1)
            historyIndex.current = newIndex
            setCurrentCommand(newIndex === -1 ? '' : history[history.length - 1 - newIndex]?.command || '')
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history, isLoading])

    useEffect(() => {
        // Focus input when component mounts or when terminal is clicked
        const handleClick = () => {
            // Only focus if the user isn't trying to select text
            if (window.getSelection()?.toString() === '') {
                inputRef.current?.focus()
            }
        }

        const node = terminalRef.current
        if (node) {
            node.addEventListener('click', handleClick)
        }

        // Auto-focus on mount
        setTimeout(() => inputRef.current?.focus(), 100);

        return () => {
            if (node) {
                node.removeEventListener('click', handleClick)
            }
        }
    }, [])

    const renderOutput = (output: string) => {
        if (!output) return null;

        const urlRegex = /(https?:\/\/[^\s]+)/g
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

        let parts = output.split(urlRegex)
        parts = parts.flatMap(part =>
            urlRegex.test(part) ? [part] : part.split(emailRegex)
        )

        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">
                        {part}
                    </a>
                )
            } else if (emailRegex.test(part)) {
                return (
                    <a key={index} href={`mailto:${part}`} className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">
                        {part}
                    </a>
                )
            }
            return <span key={index}>{part}</span>
        })
    }

    return (
        <div className="w-full bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)] border border-green-500/30 font-mono text-green-400">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-gray-900 border-b border-white/5 select-none text-xs text-gray-400">
                <div className="flex gap-1.5">
                    <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="flex-1 text-center font-semibold tracking-wider text-white/50">sreategui@copilot-terminal:~$ | AI Copilot v1.0</div>
                <div className="text-xs flex items-center gap-1">
                    <span className="text-green-400 animate-pulse">●</span> ONLINE
                </div>
            </div>

            {/* Terminal Output */}
            <div
                ref={terminalRef}
                className="h-[60vh] max-h-[700px] overflow-y-auto p-4 space-y-3 bg-[#050505] cursor-text"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#10b981 #1f2937'
                }}
            >
                {displayHistory.map((entry, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex gap-2">
                            <span className="text-cyan-400 font-semibold shrink-0">sreategui@copilot:~$</span>
                            <span className="text-white break-all">{entry.command}</span>
                        </div>
                        <div className="whitespace-pre-wrap text-gray-300 pl-6 leading-relaxed text-sm">
                            {renderOutput(entry.output)}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-2 items-center pl-6 text-green-400/50">
                        <span className="animate-pulse">processing AI response...</span>
                    </div>
                )}

                {/* Current Command Input */}
                <div className="flex gap-2 items-center pt-2">
                    <span className="text-cyan-400 font-semibold shrink-0">sreategui@copilot:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={e => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="flex-1 bg-transparent outline-none text-white caret-green-400 disabled:opacity-50"
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>

                {/* Auto-scroll anchor */}
                <div ref={bottomRef} />
            </div>

            {/* Terminal Footer */}
            <div className="bg-gray-900 px-4 py-2 text-[10px] text-gray-500 border-t border-white/5">
                <div className="flex justify-between items-center select-none">
                    <span>Type 'help' for commands • Type natural language to use AI</span>
                    <span>Press ESC or type 'exit' to close</span>
                </div>
            </div>
        </div>
    )
}