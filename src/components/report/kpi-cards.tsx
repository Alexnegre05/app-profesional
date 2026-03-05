"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllItems } from "@/lib/data";
import { applyFilters, computeKpis } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

export function KpiCards() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);
  const kpi = React.useMemo(() => computeKpis(items), [items]);

  return (
    /* 
       CAMBIO CLAVE: 
       'grid-cols-2' -> 2 columnas en móviles.
       'md:grid-cols-4' -> 4 columnas en PC.
       'gap-3 md:gap-4' -> Espacio más ajustado en móvil para aprovechar la pantalla.
    */
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      
      {/* 1. Registros - Rojo Fuerte */}
      <Card className="bg-primary border-none shadow-none text-white rounded-2xl flex flex-col justify-between overflow-hidden">
        <CardHeader className="pb-1 p-4 md:p-6">
          <CardTitle className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider">
            Registros
          </CardTitle>
        </CardHeader>
        {/* 'text-2xl' en móvil para que quepa bien el número, 'md:text-3xl' en PC */}
        <CardContent className="text-2xl md:text-3xl font-black p-4 pt-0 md:p-6 md:pt-0">
          {kpi.total}
        </CardContent>
      </Card>

      {/* 2. Abiertas - Rojo Suave */}
      <Card className="bg-secondary border-none shadow-none text-white rounded-2xl flex flex-col justify-between overflow-hidden">
        <CardHeader className="pb-1 p-4 md:p-6">
          <CardTitle className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider">
            Abiertas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl md:text-3xl font-black p-4 pt-0 md:p-6 md:pt-0">
          {kpi.open}
        </CardContent>
      </Card>

      {/* 3. Cerradas - Rojo Fuerte */}
      <Card className="bg-primary border-none shadow-none text-white rounded-2xl flex flex-col justify-between overflow-hidden">
        <CardHeader className="pb-1 p-4 md:p-6">
          <CardTitle className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider">
            Cerradas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl md:text-3xl font-black p-4 pt-0 md:p-6 md:pt-0">
          {kpi.closed}
        </CardContent>
      </Card>

      {/* 4. Total importe - Rojo Suave */}
      <Card className="bg-secondary border-none shadow-none text-white rounded-2xl flex flex-col justify-between overflow-hidden">
        <CardHeader className="pb-1 p-4 md:p-6">
          <CardTitle className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider">
            Total importe
          </CardTitle>
        </CardHeader>
        {/* 'truncate' y 'text-xl' para asegurar que el símbolo de € no se salga de la tarjeta en móviles pequeños */}
        <CardContent className="text-xl md:text-3xl font-black p-4 pt-0 md:p-6 md:pt-0 truncate">
          {eur(kpi.amountTotal)}
        </CardContent>
      </Card>
    </div>
  );
}
