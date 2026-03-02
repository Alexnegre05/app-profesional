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
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 p-3">
        <div className="text-sm text-muted-foreground">
          {pathname === "/" ? "Inicio" : pathname.replace("/", "")}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <Link href="/informe">Ver informe</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">Acciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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