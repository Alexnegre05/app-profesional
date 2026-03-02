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
    <div className="space-y-6">
      <PageHeader
        title="Detalle"
        description="Pantalla de detalle: acciones secundarias en botones."
        helpKey="detalle"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-4">
            <span className="truncate">{item.title}</span>
            <Badge variant={item.status === "open" ? "default" : "secondary"}>
              {item.status === "open" ? "Abierta" : "Cerrada"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><span className="text-muted-foreground">Categoría:</span> {item.category}</div>
          <div><span className="text-muted-foreground">Responsable:</span> {item.owner}</div>
          <div><span className="text-muted-foreground">Fecha:</span> {new Date(item.date).toLocaleDateString("es-ES")}</div>
          <div><span className="text-muted-foreground">Importe:</span> {item.amount.toFixed(2)} €</div>
          <div className="pt-2 text-muted-foreground">{item.notes}</div>
        </CardContent>
      </Card>
    </div>
  );
}
