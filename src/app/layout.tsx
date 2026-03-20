import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | AdminFlow Executive SaaS",
    default: "AdminFlow | Executive SaaS & Organization Manager",
  },
  description: "Experience high-fidelity workspace management for mission-critical organizations. Built with AdminFlow.",
  keywords: ["SaaS", "AdminFlow", "Next.js", "Executive Dashboard", "Organization Manager"],
  authors: [{ name: "AdminFlow Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} selection:bg-sky-500 selection:text-white antialiased text-slate-900 bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}
