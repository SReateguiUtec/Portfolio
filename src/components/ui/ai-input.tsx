"use client"

import React, { useEffect, useRef, useState } from "react"
import { cx } from "class-variance-authority"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Loader2, Send } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

import { Button } from "./button-ai"
import { cn } from "../../lib/utils"
import { FULL_STACK_BIO, SKILLS_CONTENT, PROJECTS_DATA, CONTACT_INFO } from '../../data/content';

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

interface OrbProps {
    dimension?: string
    className?: string
    tones?: {
        base?: string
        accent1?: string
        accent2?: string
        accent3?: string
    }
    spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
    dimension = "192px",
    className,
    tones,
    spinDuration = 20,
}) => {
    const fallbackTones = {
        base: "oklch(95% 0.02 264.695)",
        accent1: "oklch(75% 0.15 350)",
        accent2: "oklch(80% 0.12 200)",
        accent3: "oklch(78% 0.14 280)",
    }

    const palette = { ...fallbackTones, ...tones }

    const dimValue = parseInt(dimension.replace("px", ""), 10)

    const blurStrength =
        dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)

    const contrastStrength =
        dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5)

    const pixelDot = dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1)

    const shadowRange = dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2)

    const maskRadius =
        dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%"

    const adjustedContrast =
        dimValue < 30 ? 1.1 : dimValue < 50 ? Math.max(contrastStrength * 1.2, 1.3) : contrastStrength

    return (
        <div
            className={cn("color-orb", className)}
            style={{
                width: dimension,
                height: dimension,
                "--base": palette.base,
                "--accent1": palette.accent1,
                "--accent2": palette.accent2,
                "--accent3": palette.accent3,
                "--spin-duration": `${spinDuration}s`,
                "--blur": `${blurStrength}px`,
                "--contrast": adjustedContrast,
                "--dot": `${pixelDot}px`,
                "--shadow": `${shadowRange}px`,
                "--mask": maskRadius,
            } as React.CSSProperties}
        >
            <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }

        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }

        .color-orb::before {
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--accent2),
              transparent 30% 60%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--accent1),
              transparent 40% 60%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--accent2),
              transparent 10% 90%,
              var(--accent2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--accent1),
              transparent 10% 90%,
              var(--accent1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--accent3),
              transparent 20% 80%,
              var(--accent3)
            );
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }

        .color-orb::after {
          background-image: radial-gradient(
            circle at center,
            var(--base) var(--dot),
            transparent var(--dot)
          );
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }

        .color-orb[style*="--mask: 0%"]::after {
          mask-image: none;
        }

        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .color-orb::before {
            animation: none;
          }
        }
      `}</style>
        </div>
    )
}

const SPEED_FACTOR = 1

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

    const ctx = React.useMemo(
        () => ({ showForm, triggerOpen, triggerClose }),
        [showForm, triggerOpen, triggerClose]
    )

    return (
        <div className="flex items-end justify-end pointer-events-none" style={{ width: FORM_WIDTH, height: FORM_HEIGHT }}>
            <motion.div
                ref={wrapperRef}
                data-panel
                className={cx(
                    "bg-background/80 backdrop-blur-xl border-white/10 z-3 flex flex-col items-center overflow-hidden border shadow-2xl pointer-events-auto"
                )}
                initial={false}
                animate={{
                    width: showForm ? FORM_WIDTH : "auto",
                    height: showForm ? FORM_HEIGHT : 44,
                    borderRadius: showForm ? 14 : 20,
                }}
                transition={{
                    type: "spring",
                    stiffness: 550 / SPEED_FACTOR,
                    damping: 45,
                    mass: 0.7,
                    delay: showForm ? 0 : 0.08,
                }}
            >
                <FormContext.Provider value={ctx}>
                    <DockBar />
                    <InputForm ref={textareaRef} />
                </FormContext.Provider>
            </motion.div>
        </div>
    )
}

function DockBar() {
    const { showForm, triggerOpen } = useFormContext()
    return (
        <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none">
            <div className="flex items-center justify-center gap-2 px-3 max-sm:h-10 max-sm:px-2">
                <div className="flex w-fit items-center gap-2">
                    <AnimatePresence mode="wait">
                        {showForm ? (
                            <motion.div
                                key="blank"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                className="h-5 w-5"
                            />
                        ) : (
                            <motion.div
                                key="orb"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ColorOrb dimension="24px" tones={{ base: "oklch(22.64% 0 0)" }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Button
                    type="button"
                    className="flex h-fit flex-1 justify-end rounded-full px-2 !py-0.5"
                    variant="ghost"
                    onClick={triggerOpen}
                >
                    <span className="truncate font-semibold tracking-wide text-white">Copilot</span>
                </Button>
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

const FORM_WIDTH = 420
const FORM_HEIGHT = 600

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
            className="absolute bottom-0"
            style={{ width: FORM_WIDTH, height: FORM_HEIGHT, pointerEvents: showForm ? "all" : "none" }}
        >
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 550 / SPEED_FACTOR, damping: 45, mass: 0.7 }}
                        className="flex h-full flex-col bg-[#0c0c0e] rounded-[14px] border border-white/10 overflow-hidden"
                    >
                        <div className="flex justify-between py-2 px-3 border-b border-white/10 shrink-0">
                            <p className="text-white z-2 ml-[32px] flex items-center gap-[6px] select-none font-semibold text-sm">
                                Copilot
                            </p>
                            <button
                                type="button"
                                onClick={triggerClose}
                                className="text-white/50 hover:text-white transition-colors cursor-pointer text-sm font-semibold px-2"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Chat History */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-1 overflow-y-auto p-3 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
                        >
                            {messages.map((message) => (
                                <div key={message.id} className={cn(
                                    "flex flex-col gap-1 max-w-[85%]",
                                    message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                )}>
                                    <div className={cn(
                                        "px-3 py-2 rounded-2xl text-sm leading-relaxed",
                                        message.sender === "user"
                                            ? "bg-white/10 text-white rounded-br-sm"
                                            : "bg-transparent border border-white/10 text-white/90 rounded-bl-sm"
                                    )}>
                                        <p>{message.text}</p>
                                    </div>
                                    <span className="text-[10px] text-white/40 px-1">{message.timestamp}</span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col gap-1 max-w-[85%] mr-auto items-start">
                                    <div className="px-3 py-3 rounded-2xl bg-transparent border border-white/10 rounded-bl-sm flex items-center gap-2">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white/60" />
                                        <span className="text-[11px] text-white/60 animate-pulse">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="shrink-0 p-3 pt-1">
                            <div className="relative flex items-end">
                                <textarea
                                    ref={ref}
                                    placeholder="Message Copilot..."
                                    name="message"
                                    className="w-full min-h-[46px] max-h-[120px] resize-none rounded-[20px] bg-[#2A2A2A] pl-4 pr-12 py-3 text-[15px] text-white placeholder:text-white/40 outline-none"
                                    required
                                    onKeyDown={handleKeys}
                                    spellCheck={false}
                                    rows={1}
                                />
                                <button
                                    type="submit"
                                    ref={btnRef}
                                    className="absolute right-2 bottom-2 p-[6px] rounded-[10px] bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    <Send className="w-4 h-4 ml-[2px]" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-2.5 left-3 z-10"
                    >
                        <ColorOrb dimension="20px" tones={{ base: "oklch(22.64% 0 0)" }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    )
}



export default MorphPanel
