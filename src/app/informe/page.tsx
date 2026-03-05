import { PageHeader } from "@/components/page-header";
import { ReportFilters } from "@/components/report/report-filters";
import { KpiCards } from "@/components/report/kpi-cards";
import { ReportChart } from "@/components/report/report-chart";
import { ReportTable } from "@/components/report/report-table";

export default function InformePage() {
  return (
    /* 
       Añadimos 'w-full' y 'overflow-x-hidden' para evitar que el gráfico 
       o la tabla estiren la pantalla del móvil hacia los lados.
    */
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 min-h-screen bg-background text-white w-full overflow-x-hidden">
      <PageHeader
        title="Informe"
        description="Filtros, KPIs y visualización de datos."
        helpKey="informe"
      />

      {/* 1. Sección de Filtros: Reducimos padding en móvil (p-4) para ganar espacio */}
      <section className="bg-secondary p-4 md:p-6 rounded-2xl border-none shadow-none">
        <ReportFilters />
      </section>

      {/* 2. KPIs: El grid se gestiona dentro de KpiCards (que ya hicimos responsive) */}
      <div className="w-full">
        <KpiCards />
      </div>

      {/* 
         3. Gráficos y Tablas: 
         'grid-cols-1' -> Una debajo de otra en el OPPO.
         'lg:grid-cols-2' -> Lado a lado en el ordenador.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bloque Izquierdo: Gráfico */}
        <div className="bg-primary p-4 md:p-6 rounded-2xl border-none shadow-none text-white flex flex-col">
           <h3 className="font-bold mb-4 text-white text-lg px-2">Evolución Temporal</h3>
           {/* 'bg-mocha/50' para legibilidad, quitamos padding lateral extra en móvil */}
           <div className="bg-mocha/50 p-2 md:p-4 rounded-xl flex-1">
              <ReportChart />
           </div>
        </div>
        
        {/* Bloque Derecho: Tabla */}
        <div className="bg-primary p-4 md:p-6 rounded-2xl border-none shadow-none text-white flex flex-col">
           <h3 className="font-bold mb-4 text-white text-lg px-2">Registros Detallados</h3>
           <div className="bg-mocha/50 p-2 md:p-4 rounded-xl flex-1 overflow-hidden">
              <ReportTable />
           </div>
        </div>
      </div>

      {/* 
          Añadimos un espacio extra al final para que la barra inferior 
          del móvil no tape la última parte de la tabla.
      */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
