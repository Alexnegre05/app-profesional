import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { getItemById, getAllItems } from "@/lib/data"; // Asegúrate de que getAllItems exista
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 1. ESTA FUNCIÓN ES OBLIGATORIA PARA "output: export"
// Le dice a Next.js qué páginas de detalle debe generar para la APK
export async function generateStaticParams() {
  const items = getAllItems(); // Obtenemos todos los elementos
  return items.map((item) => ({
    id: item.id.toString(), // Genera una página física por cada ID
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetallePage({ params }: PageProps) {
  // En Next.js 15+ params es una Promise, hay que esperar por ella
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    return notFound();
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-cocoa text-white">
      <PageHeader
        title="Detalle"
        description="Pantalla de detalle: acciones secundarias en botones."
        helpKey="detalle"
      />

      <Card className="bg-primary border-none shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between gap-4">
            <span className="truncate text-xl font-bold text-white">{item.title}</span>
            <Badge className="bg-secondary text-white border-none px-4 py-1">
              {item.status === "open" ? "Abierta" : "Cerrada"}
            </Badge>
          </CardTitle>
        </CardHeader>
        
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
