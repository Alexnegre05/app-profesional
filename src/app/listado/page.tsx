import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllItems } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ListadoPage() {
  const items = getAllItems();

  return (
    /* 
       'p-4 md:p-6': Menos margen en móvil para que las tarjetas sean más anchas.
       'pb-24': Espacio extra abajo para que la barra de navegación no tape la última tarjeta.
    */
    <div className="space-y-6 p-4 md:p-6 pb-24 min-h-screen bg-cocoa text-white w-full overflow-x-hidden">
      <PageHeader
        title="Listado"
        description="Acciones principales en toolbar, navegación a detalle."
        helpKey="listado"
      />

      <div className="grid gap-3">
        {items.map((it) => (
          <Card 
            key={it.id} 
            className="bg-primary border-none shadow-none rounded-xl overflow-hidden active:opacity-90 transition-opacity"
          >
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              
              {/* Contenedor de texto: 'flex-1' para que use todo el espacio central */}
              <div className="min-w-0 flex-1 w-full">
                <div className="font-bold text-base md:text-lg truncate text-white leading-tight">
                  {it.title}
                </div>
                <div className="text-xs md:text-sm text-white/70 truncate mt-0.5">
                  {it.category} • {it.owner} • {new Date(it.date).toLocaleDateString("es-ES")}
                </div>
              </div>
              
              {/* Contenedor de acciones: 'shrink-0' para que no se deforme en móviles */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-white/10 sm:border-none">
                <Badge className="bg-mocha text-white border-none font-bold px-3 py-1 text-[10px] md:text-xs uppercase tracking-wider">
                  {it.status === "open" ? "Abierta" : "Cerrada"}
                </Badge>
                
                <Link 
                  className="text-sm font-black underline decoration-white/40 text-white hover:text-secondary transition-colors" 
                  href={`/detalle/${it.id}`}
                >
                  Ver detalle
                </Link>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
