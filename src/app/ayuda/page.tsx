import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AyudaPage() {
  return (
    <div className="space-y-6 p-6 min-h-screen bg-background">
      <PageHeader
        title="Centro de ayuda"
        description="Manual HTML + ayuda por secciones (contextual)."
        helpKey="ayuda"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Tarjeta Roja Principal (Primary) */}
        <Card className="bg-primary border-none text-primary-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Manual (HTML)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <p className="text-white/90">
              Incluye tu manual en <code>public/help/manual.html</code>.
            </p>
            <a 
              className="inline-block px-4 py-2 bg-white text-primary rounded-md font-bold" 
              href="/help/manual.html" 
              target="_blank" 
              rel="noreferrer"
            >
              Abrir manual.html
            </a>
          </CardContent>
        </Card>

        {/* Tarjeta Roja Secundaria (Secondary) */}
        <Card className="bg-secondary border-none text-secondary-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Ayuda contextual</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/90">
            <p>
              Usa el botón <span className="text-white font-bold">“?”</span> en cada pantalla para abrir ayuda específica.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
