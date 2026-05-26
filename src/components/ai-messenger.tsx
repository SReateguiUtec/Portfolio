"use client";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "../lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CheckCheck, Loader2, Send, BrainCircuit } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

const quickReplies = [
    "What are your core skills?",
    "Tell me about your experience.",
    "How can I contact you?",
];

export function Messenger() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
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

        const timestamp = new Date().toLocaleTimeString("en-US", {
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

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key not found");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const promptContext = `
You are Sebastian's Copilot for his portfolio website.
Answer questions about Sebastian concisely and professionally in 1 or 2 sentences max. 
Here is his basic info: He is a Computer Science student at UTEC. He has projects in web development and data structures.
User says: ${messageText.trim()}
`;
            const result = await model.generateContent(promptContext);
            const responseText = result.response.text();

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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error - we call it without event
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
                                {quickReplies.map((reply) => (
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
                                        className="min-h-[4rem] w-full resize-none border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none"
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
                                        <Send className="h-4 w-4" />
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
