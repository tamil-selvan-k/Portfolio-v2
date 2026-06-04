import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Tamil Selvan K | Lvl 99 Developer',
  description: 'Gamer-style portfolio for Full Stack Developer & Cloud Enthusiast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="bg-black text-slate-300 font-sans min-h-screen selection:bg-green-500/30 selection:text-green-200" suppressHydrationWarning>
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black z-[-1]" />
        {children}
      </body>
    </html>
  );
}
