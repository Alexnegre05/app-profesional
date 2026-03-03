import { PageHeader } from "@/components/page-header";
import { ReportFilters } from "@/components/report/report-filters";
import { KpiCards } from "@/components/report/kpi-cards";
import { ReportChart } from "@/components/report/report-chart";
import { ReportTable } from "@/components/report/report-table";

export default function InformePage() {
  return (
    <div className="space-y-8 p-6 min-h-screen bg-background text-white">
      <PageHeader
        title="Informe"
        description="Filtros, KPIs y visualización de datos sin elementos blancos."
        helpKey="informe"
      />

      {/* 1. Sección de Filtros: Cambiado de blanco a Rojo Suave (secondary) para intercalar */}
      <section className="bg-secondary p-6 rounded-2xl border-none shadow-none">
        <ReportFilters />
      </section>

      {/* 2. KPIs: Debes entrar en KpiCards.tsx y cambiar el bg-white por bg-primary y bg-secondary intercalados */}
      <div className="grid gap-6">
        <KpiCards />
      </div>

      {/* 3. Gráficos y Tablas: Usamos Rojo Fuerte (primary) para intercalar con la sección de arriba */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bloque Izquierdo: Rojo Fuerte */}
        <div className="bg-primary p-6 rounded-2xl border-none shadow-none text-white">
           <h3 className="font-bold mb-4 text-white text-lg">Evolución Temporal</h3>
           {/* El fondo del gráfico en mocha para que las líneas se vean bien */}
           <div className="bg-mocha/50 p-4 rounded-xl">
              <ReportChart />
           </div>
        </div>
        
        {/* Bloque Derecho: Rojo Fuerte (o puedes poner secondary si quieres más variedad) */}
        <div className="bg-primary p-6 rounded-2xl border-none shadow-none text-white">
           <h3 className="font-bold mb-4 text-white text-lg">Registros Detallados</h3>
           <div className="bg-mocha/50 p-4 rounded-xl">
              <ReportTable />
           </div>
        </div>
      </div>
    </div>
  );
}
