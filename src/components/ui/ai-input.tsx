"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Avatar, AvatarFallback } from "./avatar"
import { Badge } from "./badge"
import { Button as UiButton } from "./button"
import { Bot, CheckCheck, Loader2, Send, Command } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

import { cn } from "../../lib/utils"
import { FULL_STACK_BIO, SKILLS_CONTENT, PROJECTS_DATA, CONTACT_INFO } from '../../data/content';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

type Message = {
    id: string;
    sender: "user" | "bot";
    author: string;
    text: string;
    timestamp: string;
};

const initialMessages: Message[] = [
    {
        id: "init-1",
        sender: "bot",
        author: "Copilot",
        text: "Hi there! I'm your Copilot trained to answer questions about Sebastian's experience, skills, and projects. How can I help you?",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
];

interface ContextShape {
    showForm: boolean
    triggerOpen: () => void
    triggerClose: () => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

export function MorphPanel() {
    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

    const [showForm, setShowForm] = React.useState(false)

    const triggerClose = React.useCallback(() => {
        setShowForm(false)
        textareaRef.current?.blur()
    }, [])

    const triggerOpen = React.useCallback(() => {
        setShowForm(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }, [])



    React.useEffect(() => {
        function clickOutsideHandler(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
                triggerClose()
            }
        }
        document.addEventListener("mousedown", clickOutsideHandler)
        return () => document.removeEventListener("mousedown", clickOutsideHandler)
    }, [showForm, triggerClose])

    // Atajo de teclado global (cmd+k o ctrl+k) para abrir/cerrar el panel
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (showForm) {
                    triggerClose()
                } else {
                    triggerOpen()
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [showForm, triggerOpen, triggerClose])

    const ctx = React.useMemo(
        () => ({ showForm, triggerOpen, triggerClose }),
        [showForm, triggerOpen, triggerClose]
    )

    return (
        <FormContext.Provider value={ctx}>
            {/* Barra tipo Comando Flotante */}
            <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <AnimatePresence>
                    {!showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="pointer-events-auto bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full overflow-hidden"
                        >
                            <DockBar />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Panel Lateral (Sidebar) */}
            <AnimatePresence>
                {showForm && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-99 pointer-events-auto"
                            onClick={triggerClose}
                        />
                        <motion.div
                            key="sidebar"
                            ref={wrapperRef}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-dvh w-[450px] max-w-[100vw] bg-[#0c0c0e] border-l border-white/10 shadow-2xl z-100 pointer-events-auto flex flex-col"
                        >
                            <InputForm ref={textareaRef} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </FormContext.Provider>
    )
}

function DockBar() {
    const { triggerOpen } = useFormContext()
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer 
            onClick={triggerOpen}
            className="flex h-[48px] items-center px-4 gap-3 cursor-pointer select-none whitespace-nowrap transition-all hover:bg-white/5 w-[300px] max-w-[90vw]"
        >
            <div className="flex items-center justify-center p-1.5 bg-blue-500/20 text-blue-400 rounded-full shrink-0">
                <Bot className="w-4 h-4" />
            </div>
            
            <span className="text-[14px] text-white/50 flex-1 truncate text-left font-medium">
                {t.copilot.placeholder}
            </span>

            <div className="hidden sm:flex items-center gap-1 shrink-0 bg-white/10 px-2 py-1 rounded-md text-xs text-white/40 font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
            </div>
        </footer>
    )
}

// Built-in high-fidelity, extremely warm and friendly local QA dictionary
const LOCAL_QA = [
  {
    keywords: ['edad', 'años', 'cumple', 'nacido', 'old', 'age'],
    answer: "Sebastián tiene 26 años y actualmente cursa la carrera de Ciencia de la Computación. ¡Tiene una energía increíble, está en su mejor etapa profesional y siempre listo para afrontar nuevos retos técnicos!"
  },
  {
    keywords: ['estudio', 'utec', 'universidad', 'carrera', 'educacion', 'university', 'study', 'education'],
    answer: "Sebastián estudia Ciencia de la Computación en UTEC (Universidad de Ingeniería y Tecnología) en Lima, Perú. Le apasiona profundamente entender el funcionamiento interno del software, la arquitectura de computadoras y la optimización de sistemas. ¡Siempre está buscando aprender algo nuevo!"
  },
  {
    keywords: ['skills', 'lenguajes', 'tecnologias', 'frameworks', 'habilidades', 'programacion', 'languages', 'tools'],
    answer: `¡Sebastián tiene un stack tecnológico súper versátil e interesante! Aquí te lo cuento:\n\n` +
            `💻 Lenguajes que domina: C++, Python, Java, Go, JavaScript y TypeScript.\n` +
            `🚀 Frameworks & Librerías: React.js, Next.js, Spring Boot, Flask, FastApi y Express.js.\n` +
            `☁️ Cloud & Infraestructura: AWS (especialmente S3, Glue, Athena, Amplify, API Gateway y EC2), Docker y arquitectura de microservicios.\n` +
            `🗄️ Bases de datos: SQL (PostgreSQL, MySQL, SQLite) y MongoDB.\n` +
            `🛠️ Sus herramientas del día a día: Git, GitHub, Vite, Tailwind CSS y pipelines de datos/ETL.\n\n` +
            `¿Hay alguna de estas tecnologías en particular que te interese para tu equipo?`
  },
  {
    keywords: ['proyectos', 'projects', 'portafolio', 'creaciones', 'repositorios', 'github', 'trabajos'],
    answer: `¡Sebastián ha desarrollado proyectos muy retadores y de alto nivel técnico! Aquí te presento sus favoritos:\n\n` +
            `⭐ **FinTrendAI**: Una plataforma de analítica financiera en la nube usando microservicios en AWS (Python, Java, Node.js) y flujos ETL modernos.\n` +
            `⭐ **SparseExcel**: Un motor de matriz dispersa de alto rendimiento escrito en C++ con interfaz interactiva en React que permite inspeccionar la memoria física en 3D.\n` +
            `⭐ **AppleMusicTUI**: Un reproductor y controlador de música súper original para la terminal de macOS programado en Go.\n` +
            `⭐ **MediGO**: Una plataforma web médica integral construida de punta a punta con Spring Boot, React.js y PostgreSQL.\n\n` +
            `¿Te gustaría que te cuente más sobre el backend o la arquitectura de alguno de ellos?`
  },
  {
    keywords: ['fintrend', 'finanzas', 'analytics', 'athena', 'glue', 'aws'],
    answer: "¡**FinTrendAI** es una joya! Sebastián diseñó una arquitectura de 5 microservicios en AWS usando Python, Java y Node.js. Lo más genial es su pipeline de datos: toma la ingesta de datos de máquinas virtuales, la procesa en S3 y Glue, y permite consultas veloces mediante Athena. El frontend lo montó con AWS Amplify y React para mostrar tableros en tiempo real con señales e indicadores impulsados por IA. ¡Un proyecto en la nube súper maduro! Puedes ver su código aquí: https://github.com/SReateguiUtec/FinTrendAI"
  },
  {
    keywords: ['sparseexcel', 'sparse', 'matrix', 'matriz', 'excel', 'c++'],
    answer: "¡**SparseExcel** es un proyectazo de algoritmia y bajo nivel! Sebastián lo programó en C++ desde cero para optimizar el uso de memoria en hojas de cálculo. Implementó celdas dinámicas seguras usando `std::variant`, soporte de evaluación de fórmulas matemáticas y lo conectó con una interfaz en React que visualiza en tiempo real las direcciones de memoria física de las celdas en un visor interactivo en 3D. ¡Es perfecto para entender cómo se estructuran los datos! Repo: https://github.com/SReateguiUtec/SparseExcel"
  },
  {
    keywords: ['applemusic', 'applemusictui', 'tui', 'musica', 'player', 'go'],
    answer: "¡**AppleMusicTUI** es uno de sus proyectos más divertidos! Sebastián quería controlar su música de Apple Music sin salir de la terminal, así que construyó esta interfaz de terminal interactiva de teclado en Go para macOS. Tiene un look cyberpunk súper moderno, soporte para navegación rápida con teclado y animaciones glitch muy originales en la cabecera. ¡Es el tipo de herramientas que programas por el reto y terminas usando todos los días! Repo: https://github.com/SReateguiUtec/AppleMusicTUI"
  },
  {
    keywords: ['medigo', 'medicina', 'hospital', 'spring', 'boot', 'postgres'],
    answer: "¡**MediGO** es un proyecto full-stack muy completo de gestión médica! Sebastián lo estructuró usando Spring Boot para un backend robusto y seguro, React en el frontend para una experiencia de usuario fluida y PostgreSQL como base de datos. Se preocupó muchísimo por las reglas de negocio reales de atención médica y la integridad de los datos. Repo: https://github.com/SReateguiUtec/MediGO-Repository"
  },
  {
    keywords: ['contacto', 'email', 'correo', 'github', 'escribir', 'redes', 'linkedin', 'contact', 'mail'],
    answer: `¡Sebastián estará encantado de conversar contigo! Puedes contactarlo directamente a través de:\n\n` +
            `📧 Correo personal: reateguisebastian1@gmail.com\n` +
            `🐙 GitHub: github.com/SReateguiUtec\n\n` +
            `Actualmente se encuentra buscando activamente prácticas pre-profesionales y nuevas oportunidades donde pueda aportar su fuerte base en programación de sistemas, backend y nube. ¡No dudes en escribirle!`
  },
  {
    keywords: ['intereses', 'gustos', 'hobbies', 'interesa', 'interests'],
    answer: "A Sebastián le apasiona todo lo relacionado con la Inteligencia Artificial (IA), FinTech, desarrollo backend y de sistemas distribuidos, optimización de infraestructura de nube, sistemas operativos y arquitectura de computadoras. ¡Le encanta entender cómo las cosas funcionan bajo el capó!"
  },
  {
    keywords: ['hola', 'quien eres', 'presentate', 'saludo', 'presentacion', 'hello', 'whoami', 'hi'],
    answer: "¡Hola! Qué gusto saludarte. 😊 Soy **SR Copilot**, el asistente virtual de Sebastián. Estoy aquí para contarte todo lo que quieras saber sobre él: sus estudios en UTEC, sus proyectos de desarrollo favoritos, sus habilidades y cómo puedes ponerte en contacto con él. ¿Sobre qué te gustaría charlar hoy?"
  }
];

const quickReplies = [
    "What are your core skills?",
    "Tell me about your experience.",
    "How can I contact you?",
];

function InputForm({ ref }: { ref: React.Ref<HTMLTextAreaElement> }) {
    const { triggerClose, showForm } = useFormContext()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [isLoading, setIsLoading] = useState(false)
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (!messagesContainerRef.current) return;
        const container = messagesContainerRef.current;
        const behavior = shouldReduceMotion ? "auto" : "smooth";

        // Use a slight delay to ensure DOM is updated
        setTimeout(() => {
            container.scrollTo({ top: container.scrollHeight, behavior });
        }, 50);
    }, [messages, isLoading, showForm, shouldReduceMotion]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const textArea = form.querySelector('textarea');
        const messageText = textArea?.value;

        if (!messageText || !messageText.trim() || isLoading) return;

        const cleanQuery = messageText.toLowerCase().trim();
        const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        const outgoingMessage: Message = {
            id: `user-${crypto.randomUUID()}`,
            sender: "user",
            author: "You",
            text: messageText.trim(),
            timestamp,
        };

        setMessages((prev) => [...prev, outgoingMessage]);
        if (textArea) textArea.value = "";
        setIsLoading(true);

        const respond = (text: string) => {
            const botMessage: Message = {
                id: `bot-${crypto.randomUUID()}`,
                sender: "bot",
                author: "Copilot",
                text,
                timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        };

        // Security Guardrail: Prevent leaking credentials, secrets, or system configuration
        const sensitiveKeywords = [
            'variable de entorno', 'environment variable', 'api_key', 'apikey', 'api key', 
            'contraseña', 'password', 'token', 'secret', 'secreto', 'credenciales', 'credentials',
            '.env', 'credential', 'llave de api', 'llave api', 'env var'
        ];

        if (sensitiveKeywords.some(keyword => cleanQuery.includes(keyword))) {
            return respond("Por motivos de seguridad y políticas de privacidad, tengo estrictamente prohibido divulgar variables de entorno, claves de API, credenciales de acceso o configuraciones internas del sistema. ¡Pero estaré encantado de contarte todo sobre los proyectos de desarrollo backend, optimización de sistemas y habilidades de Sebastián!");
        }

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (apiKey && apiKey !== "YOUR_API_KEY_HERE") {
                const systemPrompt = `
You are "SR Copilot", a warm, exceptionally friendly, and highly professional AI assistant representing Sebastián Reátegui.
Your tone should be very natural, welcoming, enthusiastic, and developer-friendly. 

CRITICAL INSTRUCTIONS:
- NEVER output robotic system tags, cold logs, or raw terminal codes (e.g., Avoid saying things like "Initiating analysis...", "SYSTEM_MSG: ...", "ERRORLEVEL 0", or "[PROJECTOS_C++]"). 
- Avoid sounding dry or robotic. Write like a smart, warm co-pilot who is proud of Sebastián's work and wants to help recruiters and portfolio visitors get to know him.
- Answer in the language of the user (default to Spanish if they speak Spanish). 
- Use structured, clean, and elegant paragraphs or bullet points to make it easy to read in a terminal dashboard.

Here is Sebastian's full portfolio information for your context:
- BIO: ${FULL_STACK_BIO.es}
- SKILLS: ${SKILLS_CONTENT.es}
- PROJECTS: ${PROJECTS_DATA.map((p: { content: { es: string } }) => p.content.es).join('\n\n')}
- CONTACT: Email: ${CONTACT_INFO.email}, GitHub: ${CONTACT_INFO.github}, Status: ${CONTACT_INFO.status.es}

Answer the following user question accurately, warmly, and strictly using the portfolio information above. If you don't know something or it is not in his professional profile, answer politely saying you only have details regarding Sebastian's studies, skills, projects, and contact info, but offer to tell them more about his awesome C++ or AWS work!

Question: "${messageText.trim()}"
`;

                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                const result = await model.generateContent(systemPrompt);
                let responseText = result.response.text().trim();
                
                if (responseText.startsWith("```")) {
                    responseText = responseText.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "");
                }
                
                return respond(responseText.trim());
            }
        } catch (e) {
            console.warn("Live Gemini API call failed, falling back to local QA:", e);
        }

        // Local Semantic Routing Fallback
        const words = cleanQuery.replace(/[¿?¡!.,;]/g, "").split(/\s+/);
        let bestMatch = null;
        let maxOverlap = 0;

        for (const item of LOCAL_QA) {
            let overlap = 0;
            for (const keyword of item.keywords) {
                if (words.includes(keyword) || cleanQuery.includes(keyword)) {
                    overlap++;
                }
            }
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                bestMatch = item;
            }
        }

        if (bestMatch && maxOverlap > 0) {
            return respond(bestMatch.answer);
        }

        // Default warm and conversational fallback message
        respond("¡Qué buena pregunta! Como asistente local de Sebastián, te puedo contar de forma cercana sobre sus estudios de Ciencia de la Computación en UTEC, su stack técnico (como C++, Go, Python, AWS), o los proyectos de los que está más orgulloso como FinTrendAI y SparseExcel. ¿Hay algo de esto sobre lo que te gustaría charlar?");
    }

    function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Escape") triggerClose()
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            btnRef.current?.click()
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col overflow-hidden relative"
        >
            {/* Sidebar Header from ai-messenger */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 p-4 border-b border-border/10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl sm:rounded-3xl border border-border/40 bg-card/80 flex items-center justify-center">
                            <AvatarFallback className="bg-primary/20 text-primary rounded-2xl sm:rounded-3xl flex items-center justify-center h-full w-full">
                                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                            </AvatarFallback>
                        </Avatar>
                        <span
                            className="absolute bottom-0 right-0 inline-flex h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border-2 border-background bg-green-500"
                            aria-label="Online"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm sm:text-base font-semibold text-white">
                                Copilot
                            </p>
                            <Badge
                                variant="outline"
                                className="rounded-full border border-border/50 bg-primary/15 px-2 py-0 text-[0.6rem] uppercase tracking-widest text-primary"
                            >
                                AI
                            </Badge>
                        </div>
                        <p className="text-xs text-white/50">
                            Ask me anything about Sebastián
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={triggerClose}
                    className="text-white/50 hover:text-white transition-colors cursor-pointer text-xl font-semibold px-2"
                >
                    ✕
                </button>
            </div>

            {/* Chat History */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
            >
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="flex flex-col gap-1"
                        >
                            <div
                                className={cn(
                                    "relative max-w-[85%] sm:max-w-[85%] rounded-2xl border border-border/40 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white backdrop-blur",
                                    message.sender === "user" && "ml-auto border-primary/40 bg-primary text-white"
                                )}
                            >
                                <p className="font-medium text-white/80 text-xs mb-1">
                                    {message.author}
                                </p>
                                <p className={cn(
                                    "text-[0.95rem]",
                                    message.sender === "user" ? "text-white" : "text-white/90"
                                )}>
                                    {message.text}
                                </p>
                                <div className="mt-2 flex items-center justify-end gap-2 text-[0.65rem]">
                                    <span className={cn(
                                        "text-white/50",
                                        message.sender === "user" && "text-white/80"
                                    )}>
                                        {message.timestamp}
                                    </span>
                                    {message.sender === "user" && (
                                        <CheckCheck className="h-3.5 w-3.5 text-white/80" />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-1"
                        >
                            <div className="relative max-w-[85%] rounded-2xl border border-border/40 bg-white/5 px-4 py-4 text-sm leading-relaxed text-white backdrop-blur flex items-center gap-3">
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                <span className="text-white/50 text-xs animate-pulse">Thinking...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="shrink-0 p-4 border-t border-border/10 bg-background/50">
                <div className="flex flex-wrap gap-2 mb-3">
                    {quickReplies.map((reply) => (
                        <button
                            key={reply}
                            type="button"
                            onClick={() => {
                                if (ref && typeof ref !== 'function' && ref.current) {
                                    ref.current.value = reply;
                                    ref.current.form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                }
                            }}
                            disabled={isLoading}
                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {reply}
                        </button>
                    ))}
                </div>
                <div className="flex items-end gap-3 rounded-3xl border border-white/20 bg-white/5 p-3 backdrop-blur">
                    <div className="flex-1 min-w-0">
                        <textarea
                            ref={ref}
                            onKeyDown={handleKeys}
                            placeholder="Ask me something..."
                            rows={1}
                            className="w-full min-h-[40px] max-h-[120px] resize-none border-none bg-transparent text-[15px] text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:outline-none p-2"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex shrink-0 items-end pb-1 pr-1">
                        <UiButton
                            type="submit"
                            size="icon"
                            className="size-10 rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isLoading}
                        >
                            <Send className="h-4 w-4" />
                        </UiButton>
                    </div>
                </div>
            </div>
        </form>
    )
}



export default MorphPanel
