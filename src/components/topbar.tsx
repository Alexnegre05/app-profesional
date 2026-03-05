"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 p-3">
        
        {/* Volvemos a tu lógica original para el nombre de la ruta */}
        <div className="text-sm text-muted-foreground truncate font-medium">
          {pathname === "/" ? "Inicio" : pathname.replace("/", "")}
        </div>

        <div className="flex items-center gap-2">
          {/* El botón "Ver informe" solo se muestra en pantallas medianas/grandes (PC) */}
          <Button asChild variant="secondary" size="sm" className="hidden sm:flex">
            <Link href="/informe">Ver informe</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Botón Acciones con tu color Primary (Rojo Fuerte) */}
              <Button size="sm" className="bg-primary text-white font-bold h-8 px-4">
                Acciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-mocha border-white/10 text-white">
              <DropdownMenuItem onClick={() => alert("Acción primaria (placeholder)")}>
                Acción primaria
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Exportar (placeholder)")}>
                Exportar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Sincronizar (placeholder)")}>
                Sincronizar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
