import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { Geist, Noto_Sans_JP } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "App Profesional (Demo)",
  description: "Next + shadcn + informes + ayuda",
};

/* 🎨 Tipografías */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(geist.variable, noto.variable)}>
      <body className="min-h-screen bg-background font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}