import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { getItemById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) return notFound();

  return (
    <div className="space-y-6 p-6 min-h-screen bg-cocoa text-white">
      <PageHeader
        title="Detalle"
        description="Pantalla de detalle: acciones secundarias en botones."
        helpKey="detalle"
      />

      {/* Eliminamos el fondo blanco y los bordes claros. Usamos el rojo fuerte (primary) */}
      <Card className="bg-primary border-none shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between gap-4">
            <span className="truncate text-xl font-bold text-white">{item.title}</span>
            {/* El badge ahora es el rojo suave (secondary) para que no sea blanco */}
            <Badge className="bg-secondary text-white border-none px-4 py-1">
              {item.status === "open" ? "Abierta" : "Cerrada"}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        {/* Contenido con fondo marrón oscuro (mocha) para legibilidad sin usar blanco */}
        <CardContent className="bg-mocha/40 m-4 rounded-xl space-y-4 p-6 text-white">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Categoría:</span> 
            <span className="font-semibold">{item.category}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Responsable:</span> 
            <span className="font-semibold">{item.owner}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/60">Fecha:</span> 
            <span className="font-semibold">{new Date(item.date).toLocaleDateString("es-ES")}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-white/60">Importe total:</span> 
            <span className="text-2xl font-black text-white">{item.amount.toFixed(2)} €</span>
          </div>
          
          {item.notes && (
            <div className="mt-4 p-3 bg-cocoa/50 rounded-lg text-white/80 italic border-l-4 border-secondary">
              {item.notes}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
