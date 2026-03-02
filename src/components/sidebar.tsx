"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/listado", label: "Listado" },
  { href: "/informe", label: "Informe" },
  { href: "/ayuda", label: "Ayuda" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:gap-4 md:border-r md:p-4">
      <div className="font-semibold">App Profesional</div>
      <Separator />
      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-xs text-muted-foreground">v1 · Next + shadcn</div>
    </aside>
  );
}