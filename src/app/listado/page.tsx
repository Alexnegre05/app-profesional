import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllItems } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ListadoPage() {
  const items = getAllItems();

  return (
    <div className="space-y-6 p-6 min-h-screen bg-cocoa text-white">
      <PageHeader
        title="Listado"
        description="Acciones principales en toolbar, navegación a detalle."
        helpKey="listado"
      />

      <div className="grid gap-3">
        {items.map((it) => (
          /* Todas las tarjetas en Rojo Fuerte (Primary) sin efectos de hover ni bordes */
          <Card 
            key={it.id} 
            className="bg-primary border-none shadow-none rounded-xl overflow-hidden"
          >
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-bold text-lg truncate text-white">{it.title}</div>
                <div className="text-sm text-white/80 truncate">
                  {it.category} · {it.owner} · {new Date(it.date).toLocaleDateString("es-ES")}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Badge en color Mocha para contrastar con el fondo rojo */}
                <Badge className="bg-mocha text-white border-none font-bold px-3 py-1">
                  {it.status === "open" ? "Abierta" : "Cerrada"}
                </Badge>
                
                <Link 
                  className="text-sm font-black underline decoration-white/40 text-white" 
                  href={`/detalle/${it.id}`}
                >
                  Ver
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
