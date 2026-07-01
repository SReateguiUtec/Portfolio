"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    LoaderTransitionContext,
    type LoaderPhase,
} from "@/context/LoaderTransitionContext";
import { useLanguage } from "@/context/LanguageContext";
import { TextAnimate } from "@/components/ui/text-animate";

const LOADER_DISPLAY_MS = 2000;
const REDUCED_MOTION_DELAY_MS = 450;
const TRANSITION_DURATION_MS = 650;

const loaderCopy = {
    en: "Projects, code & a bit of me inside.",
    es: "Proyectos, código y un poco de mí adentro.",
} as const;

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReducedMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return prefersReducedMotion;
}

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage();
    const line = loaderCopy[language];
    const prefersReducedMotion = usePrefersReducedMotion();
    const [phase, setPhase] = useState<LoaderPhase>("loading");

    const beginReveal = useCallback(() => {
        if (prefersReducedMotion) {
            setPhase("revealed");
            return;
        }

        setPhase("transitioning");
        window.setTimeout(() => setPhase("revealed"), TRANSITION_DURATION_MS);
    }, [prefersReducedMotion]);

    useEffect(() => {
        const delay = prefersReducedMotion ? REDUCED_MOTION_DELAY_MS : LOADER_DISPLAY_MS;
        const timer = window.setTimeout(beginReveal, delay);
        return () => clearTimeout(timer);
    }, [prefersReducedMotion, beginReveal]);

    useEffect(() => {
        if (phase === "revealed") {
            window.dispatchEvent(new CustomEvent("portfolio:loader-done"));
            return;
        }

        const previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = previousOverflow;
        };
    }, [phase]);

    const showOverlay = phase === "loading" || phase === "transitioning";
    const isTransitioning = phase === "transitioning";
    const useInstantExit = prefersReducedMotion;

    return (
        <LoaderTransitionContext.Provider
            value={{ phase, skipHeroTypewriter: false }}
        >
            <motion.div
                initial={false}
                animate={{
                    opacity: phase === "loading" ? 0 : 1,
                    scale: phase === "loading" ? 1.015 : 1,
                    filter: phase === "loading" ? "blur(6px)" : "blur(0px)",
                }}
                transition={{
                    duration: useInstantExit ? 0.2 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isTransitioning && !useInstantExit ? 0.12 : 0,
                }}
                className={
                    phase === "loading"
                        ? "pointer-events-none invisible fixed inset-0 overflow-hidden"
                        : undefined
                }
                aria-hidden={phase === "loading"}
            >
                {children}
            </motion.div>

            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        key="loader-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: useInstantExit ? 0 : -12 }}
                        transition={{
                            duration: useInstantExit ? 0.2 : 0.5,
                            ease: "easeInOut",
                        }}
                        className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0a0a]"
                        animate={{
                            backgroundColor: isTransitioning
                                ? "rgba(10,10,10,0)"
                                : "rgba(10,10,10,1)",
                        }}
                        role="status"
                        aria-live="polite"
                        aria-label={line}
                    >
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-[0.35]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <motion.div
                            animate={
                                isTransitioning
                                    ? { opacity: 0, y: -16, scale: 0.98 }
                                    : { opacity: 1, y: 0, scale: 1 }
                            }
                            transition={{
                                duration: useInstantExit ? 0.2 : 0.45,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            className="relative z-10 max-w-md px-6 text-center md:max-w-xl lg:max-w-2xl"
                        >
                            {prefersReducedMotion ? (
                                <p className="text-base text-white/80 sm:text-lg md:text-xl lg:text-2xl">
                                    {line}
                                </p>
                            ) : (
                                <TextAnimate
                                    as="p"
                                    by="word"
                                    animation="blurInUp"
                                    startOnView={false}
                                    once
                                    duration={0.45}
                                    className="text-base text-white/80 sm:text-lg md:text-xl lg:text-2xl"
                                >
                                    {line}
                                </TextAnimate>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </LoaderTransitionContext.Provider>
    );
}
