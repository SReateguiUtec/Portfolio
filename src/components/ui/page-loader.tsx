"use client";

import React, { useState, useEffect } from 'react';
import TypingKeyboard from './typing-keyboard';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black min-h-screen overflow-hidden"
                    >
                        {/* Subtle Grid Background */}
                        <div 
                            className="absolute inset-0 z-0 pointer-events-none opacity-30"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, #333 1px, transparent 1px),
                                    linear-gradient(to bottom, #333 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px',
                                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                            }}
                        />

                        <div className="relative z-10">
                            <TypingKeyboard 
                                autoTypeText="npm run dev" 
                                loop={false}
                                initialDelay={400}
                                accentColor="#111111"
                                secondaryAccent="#60a5fa"
                                screenColor="#0f172a"
                                onComplete={() => {
                                    // Add a small delay after typing completes before hiding loader
                                    setTimeout(() => setIsLoading(false), 500);
                                }}
                                typingSpeed={[40, 90]}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* We can choose to wait for loading to finish before mounting children, or mount them behind. 
                Mounting them behind is better for SEO and performance so they load their assets. */}
            <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                {children}
            </div>
        </>
    );
}
