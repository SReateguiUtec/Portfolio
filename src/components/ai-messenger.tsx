"use client";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CheckCheck, Loader2, BrainCircuit } from "lucide-react";
import { SendIcon } from "./send";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { useLanguage } from "../context/LanguageContext";
import { FULL_STACK_BIO, SKILLS_CONTENT, PROJECTS_DATA, CONTACT_INFO, PERSONAL_EXTRA } from "../data/content";

type Message = {
    id: string;
    sender: "user" | "bot";
    author: string;
    text: string;
    timestamp: string;
};

const quickReplies = {
    en: [
        "What are your core skills?",
        "How can I contact you?",
    ],
    es: [
        "¿Cuáles son tus habilidades principales?",
        "¿Cómo puedo contactarte?",
    ],
};

export function Messenger() {
    const { language } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessages((prev) => {
                const greetingText = language === "es"
                    ? "¡Hola! Soy tu Copilot, entrenado para responder preguntas sobre las habilidades y proyectos de Sebastián. ¿En qué puedo ayudarte?"
                    : "Hi there! I'm your Copilot trained to answer questions about Sebastian's skills and projects. How can I help you?";

                if (prev.length > 0 && prev[0].text === greetingText) {
                    return prev;
                }

                const newGreeting = {
                    id: "init-1",
                    sender: "bot" as const,
                    author: "Copilot",
                    text: greetingText,
                    timestamp: new Date().toLocaleTimeString(language === "es" ? "es-ES" : "en-US", { hour: "2-digit", minute: "2-digit" }),
                };
                return [newGreeting, ...prev.filter((m) => m.id !== "init-1")];
            });
        }, 0);
        return () => clearTimeout(timer);
    }, [language]);
    const [draft, setDraft] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const liveRegionRef = useRef<HTMLDivElement | null>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (!messagesContainerRef.current) return;
        const container = messagesContainerRef.current;
        const behavior = shouldReduceMotion ? "auto" : "smooth";

        const scrollToBottom = () => {
            container.scrollTo({ top: container.scrollHeight, behavior });
        };

        if (behavior === "smooth") {
            requestAnimationFrame(scrollToBottom);
        } else {
            scrollToBottom();
        }
    }, [messages, isLoading, shouldReduceMotion]);

    // Live region for accessibility
    useEffect(() => {
        if (!liveRegionRef.current) return;
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage) return;
        liveRegionRef.current.textContent = `${lastMessage.author} at ${lastMessage.timestamp}: ${lastMessage.text}`;
    }, [messages]);
    const handleSubmit = async (event?: FormEvent<HTMLFormElement>, textOverride?: string) => {
        if (event) event.preventDefault();

        const messageText = textOverride ?? draft;
        if (!messageText.trim() || isLoading) return;

        const timestamp = new Date().toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const outgoingMessage: Message = {
            id: `user-${crypto.randomUUID()}`,
            sender: "user",
            author: "You",
            text: messageText.trim(),
            timestamp,
        };

        setMessages((prev) => [...prev, outgoingMessage]);
        setDraft("");
        setIsLoading(true);

        const lowerText = messageText.trim().toLowerCase();
        const isSkills = lowerText === "what are your core skills?" || lowerText === "¿cuáles son tus habilidades principales?";
        const isContact = lowerText === "how can i contact you?" || lowerText === "¿cómo puedo contactarte?";

        if (isSkills || isContact) {
            const responseText = isSkills
                ? (language === "es"
                    ? `Sebastián cuenta con un stack tecnológico muy versátil y sólido:
- **Lenguajes**: C++, Python, Java, Go, JavaScript, TypeScript.
- **Frameworks & Librerías**: React.js, Next.js, Spring Boot, Flask, FastAPI, Express.js.
- **Nube e Infraestructura**: AWS (Glue, Athena, S3, Amplify, API Gateway, EC2), Docker, Microservicios y pipelines de datos ETL.
- **Bases de datos**: PostgreSQL, MySQL, SQLite, MongoDB.

¿Hay alguna tecnología en particular que te interese para tu equipo?`
                    : `Sebastián has a highly versatile and solid technical stack:
- **Languages**: C++, Python, Java, Go, JavaScript, TypeScript.
- **Frameworks & Libs**: React.js, Next.js, Spring Boot, Flask, FastAPI, Express.js.
- **Cloud & Infra**: AWS (Glue, Athena, S3, Amplify, API Gateway, EC2), Docker, Microservices, and ETL data pipelines.
- **Databases**: PostgreSQL, MySQL, SQLite, MongoDB.

Is there any technology you are particularly interested in?`)
                : (language === "es"
                        ? `Puedes ponerte en contacto directo con Sebastián a través de:
- 📧 **Correo personal**: reateguisebastian1@gmail.com
- 🐙 **GitHub**: [github.com/SReateguiUtec](https://github.com/SReateguiUtec)

¡Estará encantado de conversar contigo sobre oportunidades de prácticas pre-profesionales o proyectos interesantes!`
                        : `You can contact Sebastián directly via:
- 📧 **Personal Email**: reateguisebastian1@gmail.com
- 🐙 **GitHub**: [github.com/SReateguiUtec](https://github.com/SReateguiUtec)

He is looking forward to discussing internship opportunities and interesting collaborations!`);

            const botMessage: Message = {
                id: `bot-${crypto.randomUUID()}`,
                sender: "bot",
                author: "Copilot",
                text: responseText,
                timestamp: new Date().toLocaleTimeString(language === "es" ? "es-ES" : "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
            return;
        }

        try {
            const systemInstruction = `
You are "SR Copilot", a warm, exceptionally friendly, and highly professional AI assistant representing Sebastián Reátegui.
Your tone should be very natural, welcoming, enthusiastic, and developer-friendly. 
Answer questions about Sebastian concisely and professionally in 1 or 2 sentences max. 

CRITICAL INSTRUCTIONS:
- "GLAZE" SEBASTIAN: When recruiters or visitors ask about him, highly praise his work ethic, fast learning speed, and passion for software engineering. Highlight that he is a highly motivated, dedicated, and capable Junior Developer ready to add real value to a team. Keep the praise grounded, realistic, and strictly based on his actual skills and projects—do not invent skills or call him a prodigy.
- NEVER output robotic system tags, cold logs, or raw terminal codes. 
- Answer in the language of the user (default to Spanish if they speak Spanish). 
- Use structured, clean, and elegant paragraphs or bullet points.

Here is Sebastian's full portfolio information for your context:
- BIO: ${language === "es" ? FULL_STACK_BIO.es : FULL_STACK_BIO.en}
- PERSONAL INFO & HOBBIES: ${language === "es" ? PERSONAL_EXTRA.es : PERSONAL_EXTRA.en}
- LANGUAGES: ${language === "es" ? "Español (Nativo) e Inglés 🇺🇸 (C1 avanzado)" : "Spanish (Native) and English 🇺🇸 (Advanced C1)"}
- SKILLS: ${language === "es" ? SKILLS_CONTENT.es : SKILLS_CONTENT.en}
- PROJECTS: ${PROJECTS_DATA.map((p) => language === "es" ? p.content.es : p.content.en).join('\n\n')}
- CONTACT: Email: ${CONTACT_INFO.email}, GitHub: ${CONTACT_INFO.github}, Status: ${language === "es" ? CONTACT_INFO.status.es : CONTACT_INFO.status.en}

Answer user questions accurately, warmly, and strictly using the portfolio information above. If you don't know something or it is not in his professional profile, answer politely saying you only have details regarding Sebastian's studies, skills, projects, and contact info, but offer to tell them more about his awesome C++ or AWS work!
`;
            const chatHistory = messages
                .filter((msg) => msg.author !== "System Error")
                .map((msg) => ({
                    role: msg.sender === "user" ? "user" : "model" as const,
                    parts: [{ text: msg.text }],
                }));

            // Gemini startChat history must start with a 'user' message
            const firstUserIdx = chatHistory.findIndex((m) => m.role === "user");
            const cleanHistory = firstUserIdx !== -1 ? chatHistory.slice(firstUserIdx) : [];

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: messageText.trim(),
                    systemInstruction,
                    history: cleanHistory.length > 0 ? cleanHistory : undefined
                })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error === "Missing GEMINI_API_KEY") {
                    throw new Error("API Key not found");
                }
                throw new Error(data.error || "Failed to communicate with AI");
            }

            let responseText = data.text.trim();
            if (responseText.startsWith("```")) {
                responseText = responseText.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "");
            }

            const botMessage: Message = {
                id: `bot-${crypto.randomUUID()}`,
                sender: "bot",
                author: "Copilot",
                text: responseText,
                timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (e) {
            console.error("Gemini API Error:", e);
            const errorMessage: Message = {
                id: `bot-${crypto.randomUUID()}`,
                sender: "bot",
                author: "System Error",
                text: "Sorry, I couldn't connect to my AI brain. Please check the API key.",
                timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Listen to global events from floating Copilot widget
    useEffect(() => {
        const handleGlobalMessage = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            if (customEvent.detail && !isLoading) {
                // Scroll to the chat so the user can see the response
                document.getElementById('copilot')?.scrollIntoView({ behavior: 'smooth' });
                handleSubmit(undefined, customEvent.detail);
            }
        };
        window.addEventListener('send-ai-message', handleGlobalMessage);
        return () => window.removeEventListener('send-ai-message', handleGlobalMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);


    return (
        <section className="relative w-full py-16 lg:py-24" id="copilot">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <BrainCircuit className="w-8 h-8 text-blue-400" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">COPILOT</h2>
                    </div>
                    <div className="flex items-center gap-2 opacity-60">
                        <div className="w-12 h-px bg-white"></div>
                        <span className="text-white text-[10px] font-mono tracking-widest">Ask_Me_Anything</span>
                        <div className="flex-1 h-px bg-white"></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative flex flex-col min-h-[500px] max-h-[calc(100vh-3rem)] overflow-hidden rounded-[30px] border border-border/50 bg-background/70 p-4 backdrop-blur-xl sm:min-h-[600px] sm:max-h-[calc(100vh-4rem)] sm:p-6 lg:h-[760px] lg:max-h-[calc(100vh-6rem)]">

                        <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 px-2">
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
                                    <p className="text-sm sm:text-base font-semibold text-foreground">
                                        Copilot
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        Ask me anything about Sebastián's studies at UTEC, skills or projects.
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                className="rounded-full border border-border/50 bg-primary/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-primary"
                            >
                                AI ASSISTANT
                            </Badge>
                        </header>

                        <div
                            ref={messagesContainerRef}
                            className="relative flex-1 min-h-0 space-y-4 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted mb-4"
                            aria-live="off"
                            aria-label="Message thread"
                        >
                            <AnimatePresence initial={false}>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 0 }}
                                        transition={{ duration: 0.28, ease: "easeOut" }}
                                        className="flex flex-col gap-1"
                                    >
                                        <div
                                            className={cn(
                                                "relative max-w-[85%] sm:max-w-[75%] rounded-2xl border border-border/40 bg-background/80 px-4 py-3 text-sm leading-relaxed text-foreground backdrop-blur",
                                                message.sender === "user" && "ml-auto border-primary/40 bg-primary text-primary-foreground"
                                            )}
                                        >
                                            <p className="font-medium text-foreground/80 sm:text-sm mb-1">
                                                {message.author}
                                            </p>
                                            <p className={cn(
                                                "text-[0.95rem]",
                                                message.sender === "user" ? "text-primary-foreground/90" : "text-foreground/90"
                                            )}>
                                                {message.text}
                                            </p>
                                            <div className="mt-2 sm:mt-3 flex items-center justify-end gap-2 text-[0.7rem]">
                                                <span className={cn(
                                                    "text-muted-foreground",
                                                    message.sender === "user" && "text-primary-foreground/80"
                                                )}>
                                                    {message.timestamp}
                                                </span>
                                                {message.sender === "user" && (
                                                    <CheckCheck className="h-3.5 w-3.5 text-primary-foreground/80" />
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
                                        <div className="relative max-w-[85%] sm:max-w-[75%] rounded-2xl border border-border/40 bg-background/80 px-4 py-4 text-sm leading-relaxed text-foreground backdrop-blur flex items-center gap-3">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-muted-foreground text-xs animate-pulse">AI is thinking...</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="space-y-3"
                            aria-label="Reply composer"
                        >
                            <div className="flex flex-wrap gap-2 px-1">
                                {quickReplies[language === "es" ? "es" : "en"].map((reply) => (
                                    <button
                                        key={reply}
                                        type="button"
                                        onClick={() => handleSubmit(undefined, reply)}
                                        disabled={isLoading}
                                        className="rounded-full border border-border/50 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-end gap-3 rounded-3xl border border-border/40 bg-background/80 p-3 sm:p-4 backdrop-blur">
                                <div className="flex-1 min-w-0">
                                    <Textarea
                                        value={draft}
                                        onChange={(event) => setDraft(event.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit();
                                            }
                                        }}
                                        placeholder="Ask me something..."
                                        rows={2}
                                        className="min-h-16 w-full resize-none border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="flex shrink-0 items-end pb-1">
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="size-10 rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                                        disabled={!draft.trim() || isLoading}
                                    >
                                        <SendIcon className="h-4 w-4" size={16} />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div ref={liveRegionRef} className="sr-only" aria-live="polite" aria-atomic="true" />
        </section>
    );
}
