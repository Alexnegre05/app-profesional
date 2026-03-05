"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

// Iconos SVG limpios y sin errores de sintaxis
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  List: () => (
    <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Help: () => (
    <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
};

const nav = [
  { href: "/", label: "Inicio", icon: Icons.Home },
  { href: "/listado", label: "Listado", icon: Icons.List },
  { href: "/informe", label: "Informe", icon: Icons.Chart },
  { href: "/ayuda", label: "Ayuda", icon: Icons.Help },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* --- DISEÑO PARA ORDENADOR (SIDEBAR LATERAL) --- */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:gap-4 md:border-r md:p-4 bg-background h-screen sticky top-0">
        <div className="font-semibold text-primary px-3 text-lg">App Profesional</div>
        <Separator className="bg-white/10" />
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all flex items-center gap-3 ${
                  active ? "bg-primary text-white" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Icon />
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-3 text-[10px] text-white/30 uppercase tracking-widest">
          v1 · Next + shadcn
        </div>
      </aside>

      {/* --- DISEÑO PARA TU OPPO (BARRA INFERIOR) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-mocha border-t border-white/10 px-4 py-2 flex justify-around items-center shadow-[0_-4px_15px_rgba(0,0,0,0.4)]">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <div className={`p-2 rounded-xl transition-all ${
                active ? "bg-primary text-white scale-110" : "text-white/40"
              }`}>
                <Icon />
              </div>
              <span className={`text-[10px] font-bold tracking-tight ${
                active ? "text-primary" : "text-white/40"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
