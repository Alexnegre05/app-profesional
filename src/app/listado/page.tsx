import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getAllItems } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ListadoPage() {
  const items = getAllItems();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Listado"
        description="Acciones principales en toolbar, navegación a detalle."
        helpKey="listado"
      />

      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.id} className="hover:bg-accent/40 transition-colors">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium truncate">{it.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {it.category} · {it.owner} · {new Date(it.date).toLocaleDateString("es-ES")}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={it.status === "open" ? "default" : "secondary"}>
                  {it.status === "open" ? "Abierta" : "Cerrada"}
                </Badge>
                <Link className="text-sm underline" href={`/detalle/${it.id}`}>
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