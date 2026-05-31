"use client";

import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md pt-8 pb-32 md:pb-8 lg:mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left side: Copyright */}
        <div className="flex flex-col items-center md:items-start text-sm text-gray-400">
          <p>
            &copy; {currentYear} Sebastian Reategui. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {language === 'en' ? 'Made with ❤️ and coffee.' : 'Hecho con ❤️ y café.'}
          </p>
        </div>

        {/* Right side: Social Links */}
        <div className="flex items-center gap-6 text-gray-400">
          <a
            href="https://github.com/SReateguiUtec"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white md:text-gray-400 md:hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://wa.me/51947546421?text=Hola%20Sebastián,%20vi%20tu%20portfolio..."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] md:text-gray-400 md:hover:text-[#25D366] transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={20} />
          </a>
          <a
            href="mailto:reateguisebastian1@gmail.com"
            className="text-red-500 md:text-gray-400 md:hover:text-red-500 transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
