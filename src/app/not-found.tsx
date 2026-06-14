"use client";


import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { FrameButton } from '../components/ui/frame-button';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const errorTitle = t.notFound?.title || "404 - Page Not Found";
  const errorDescription = t.notFound?.description || "Oops! The page you are looking for doesn't exist or has been moved.";
  const backHomeText = t.notFound?.backHome || "Go Back Home";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center font-mono p-4">
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%]"></div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* Cyberpunk Neon Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Tech Corner Border Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20 pointer-events-none"></div>
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-white/20 pointer-events-none"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-white/20 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/20 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl w-full text-center px-4">
        
        {/* Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-white/10 bg-black/60 backdrop-blur-md rounded-t-lg p-3 flex items-center justify-between border-b-0"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] tracking-wider text-white/50 uppercase">SYSTEM_DIAGNOSTICS // ROUTE_FAIL</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
          </div>
        </motion.div>

        {/* Terminal Main Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-white/10 bg-black/80 backdrop-blur-md rounded-b-lg p-8 md:p-12 relative overflow-hidden flex flex-col items-center gap-6"
        >
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

          {/* Huge Animated 404 HUD */}
          <div className="relative mb-2">
            <motion.h1 
              animate={{ 
                textShadow: [
                  "0 0 4px rgba(59, 130, 246, 0.5)", 
                  "0 0 12px rgba(59, 130, 246, 0.8)", 
                  "0 0 4px rgba(59, 130, 246, 0.5)"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-white to-neutral-500 select-none"
            >
              404
            </motion.h1>
            <div className="absolute -inset-1 border border-white/5 pointer-events-none rounded scale-105" />
            <div className="absolute -inset-3 border border-white/5 pointer-events-none rounded scale-110" />
          </div>

          {/* Error Message Details */}
          <div className="flex flex-col gap-3 max-w-md">
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
              {errorTitle}
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              {errorDescription}
              <span className="inline-block w-1.5 h-[1.1em] bg-blue-500 ml-1 animate-pulse align-middle -translate-y-px" />
            </p>
          </div>

          {/* Diagnostic Stats Panel */}
          <div className="w-full max-w-sm border border-white/10 rounded bg-white/2 p-4 text-left text-[10px] text-neutral-500 flex flex-col gap-1.5 font-mono mt-2">
            <div><span className="text-blue-400">STATUS:</span> 404_NOT_FOUND</div>
            <div><span className="text-blue-400">MODULE:</span> ROUTER_RESOLVER_ERR</div>
            <div><span className="text-blue-400">TIMESTAMP:</span> {new Date().toISOString()}</div>
            <div><span className="text-blue-400">HOST:</span> portafolio_client</div>
          </div>

          {/* Action Button */}
          <div className="mt-4 flex justify-center">
            <FrameButton
              as="link"
              href="/"
              variant="outline"
              glow
              className="px-6 py-2.5 text-xs text-white border-transparent hover:border-transparent focus:outline-none"
              offset={4}
              hoverOffset={3}
              size={8}
            >
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{backHomeText}</span>
              </div>
            </FrameButton>
          </div>
        </motion.div>

        {/* Lower Terminal Footer Decoration */}
        <div className="mt-4 text-[9px] text-neutral-600 flex items-center justify-between px-2">
          <span>// SECURITY OVERWATCH ACTIVE</span>
          <span>SYS.VER: V1.0.0</span>
        </div>
      </div>
    </main>
  );
}
