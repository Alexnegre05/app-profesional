import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  return (
    // Añadimos 'w-full' y quitamos 'p-6' fijo para usar 'px-4' en móviles y 'md:p-6' en PC
    <div className="w-full px-4 py-6 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto overflow-x-hidden">
      <PageHeader
        title="Inicio"
        description="Demo para interfaz organizada, informes, ayuda contextual y distribución."
        helpKey="home"
      />

      {/* Grid: 1 columna en móvil (default), 2 columnas en tablets/PC (md) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* Card 1: Qué hace la peña de DAM2? */}
        <Card className="bg-accent/30 border-border text-white shadow-lg backdrop-blur-sm flex flex-col justify-between h-full">
          <CardHeader className="p-4 md:p-6">
            <div className="flex justify-between items-center gap-2">
              <CardTitle className="text-lg md:text-xl break-words leading-tight">
                Qué hace la peña de DAM2?
              </CardTitle>
              <Switch className="data-[state=checked]:bg-primary shrink-0" />
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6 text-sm space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Aplicar theme, mejorar layout, ordenar acciones en menús/toolbar,
              y generar APK (Capacitor).
            </p>

            <div className="w-full">
               <Progress value={60} className="h-2 bg-black/20 [&>div]:bg-primary" />
            </div>

            <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Acción principal
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Pistas */}
        <Card className="bg-mocha border-border text-white shadow-lg flex flex-col justify-between h-full">
          <CardHeader className="p-4 md:p-6">
            <div className="flex justify-between items-center gap-2">
              <CardTitle className="text-lg md:text-xl">
                Pistas
              </CardTitle>
              <Avatar className="h-8 w-8 border border-border shrink-0">
                <AvatarFallback className="bg-primary text-xs">JD</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6 text-sm space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Revisa{" "}
              <Link
                href="/informe"
                className="font-semibold text-primary hover:text-secondary transition-colors"
              >
                /informe
              </Link>{" "}
              para filtros, KPIs y gráfico.
            </p>

            <div className="w-full py-2">
              <Slider defaultValue={[60]} max={100} step={1} className="[&_[role=slider]]:bg-primary" />
            </div>

            <Button variant="secondary" className="w-full md:w-auto bg-secondary text-secondary-foreground hover:opacity-90">
              Ver informe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
