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
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Inicio"
        description="Demo para interfaz organizada, informes, ayuda contextual y distribución."
        helpKey="home"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: Qué hace la peña de DAM2? */}
        <Card className="bg-accent/30 border-border text-white shadow-lg backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">
                Qué hace la peña de DAM2?
              </CardTitle>
              <Switch className="data-[state=checked]:bg-primary" />
            </div>
          </CardHeader>

          <CardContent className="text-sm space-y-6">
            <p className="text-muted-foreground">
              Aplicar theme, mejorar layout, ordenar acciones en menús/toolbar,
              y generar APK (Capacitor).
            </p>

            <Progress value={60} className="h-2 bg-black/20 [&>div]:bg-primary" />

            <Button className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Acción principal
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Pistas */}
        <Card className="bg-mocha border-border text-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                Pistas
              </CardTitle>
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-primary text-xs">JD</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>

          <CardContent className="text-sm space-y-6">
            <p className="text-muted-foreground">
              Revisa{" "}
              <Link
                href="/informe"
                className="font-semibold text-primary hover:text-secondary transition-colors"
              >
                /informe
              </Link>{" "}
              para filtros, KPIs y gráfico.
            </p>

            <Slider defaultValue={[60]} max={100} step={1} className="[&_[role=slider]]:bg-primary" />

            <Button variant="secondary" className="bg-secondary text-secondary-foreground hover:opacity-90">
              Ver informe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
