"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const HELP: Record<string, { title: string; body: string }> = {
  home: {
    title: "Ayuda: Inicio",
    body: "Desde aquí navegas a Listado, Informe y Ayuda. La topbar agrupa acciones globales.",
  },
  listado: {
    title: "Ayuda: Listado",
    body: "La lista muestra registros. Acción principal: abrir detalle. Añade botones coherentes si procede (editar, cerrar, etc.).",
  },
  detalle: {
    title: "Ayuda: Detalle",
    body: "Vista de un registro. Mantén acciones secundarias como botones (por ejemplo: 'Cambiar estado').",
  },
  informe: {
    title: "Ayuda: Informe",
    body: "Aplica filtros, revisa KPIs y gráfico. Debe verse claro y consistente con el theme.",
  },
  ayuda: {
    title: "Ayuda: Centro de ayuda",
    body: "Aquí enlazas manual HTML/PDF y documentas instalación/configuración.",
  },
};

export function HelpButton({ helpKey }: { helpKey: string }) {
  const content = HELP[helpKey] ?? { title: "Ayuda", body: "No hay ayuda definida para esta pantalla." };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* 'h-8 w-8' para que sea un botón circular perfecto y fácil de pulsar en el móvil */}
        <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 font-bold border-white/20 text-white hover:bg-primary">
          ?
        </Button>
      </DialogTrigger>
      
      {/* 
         CAMBIOS PARA MÓVIL:
         'w-[90vw]' para que no toque los bordes del OPPO.
         'max-w-[400px]' para que en PC no sea gigante.
         'rounded-2xl' para seguir la estética de tus tarjetas.
      */}
      <DialogContent className="w-[90vw] max-w-[400px] rounded-2xl bg-mocha border-none text-white shadow-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-black text-primary">
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-white/80 leading-relaxed py-2 whitespace-pre-wrap">
          {content.body}
        </div>
        
        {/* Añadimos un botón de cerrar explícito para que sea más fácil en el móvil */}
        <div className="flex justify-end mt-4">
          <DialogTrigger asChild>
            <Button className="bg-secondary text-white border-none h-9 px-6 rounded-xl font-bold">
              Entendido
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
