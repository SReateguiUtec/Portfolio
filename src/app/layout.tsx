import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "../context/LanguageContext";
import "../index.css";

export const metadata: Metadata = {
  title: "Sebastian Reategui - CS Student",
  description: "Portfolio of Sebastian Reategui, a Computer Science student and Full Stack Developer.",
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-background text-foreground">
      <body className="antialiased bg-background min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
