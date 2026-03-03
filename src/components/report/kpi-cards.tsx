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
    <div className="grid gap-4 md:grid-cols-4">
      {/* 1. Registros - Rojo Fuerte */}
      <Card className="bg-primary border-none shadow-none text-white rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold opacity-90">Registros</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-black">{kpi.total}</CardContent>
      </Card>

      {/* 2. Abiertas - Rojo Suave */}
      <Card className="bg-secondary border-none shadow-none text-white rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold opacity-90">Abiertas</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-black">{kpi.open}</CardContent>
      </Card>

      {/* 3. Cerradas - Rojo Fuerte */}
      <Card className="bg-primary border-none shadow-none text-white rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold opacity-90">Cerradas</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-black">{kpi.closed}</CardContent>
      </Card>

      {/* 4. Total importe - Rojo Suave */}
      <Card className="bg-secondary border-none shadow-none text-white rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold opacity-90">Total importe</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-black">{eur(kpi.amountTotal)}</CardContent>
      </Card>
    </div>
  );
}
