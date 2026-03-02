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
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Registros</CardTitle></CardHeader>
        <CardContent className="text-2xl font-semibold">{kpi.total}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Abiertas</CardTitle></CardHeader>
        <CardContent className="text-2xl font-semibold">{kpi.open}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Cerradas</CardTitle></CardHeader>
        <CardContent className="text-2xl font-semibold">{kpi.closed}</CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Total importe</CardTitle></CardHeader>
        <CardContent className="text-2xl font-semibold">{eur(kpi.amountTotal)}</CardContent>
      </Card>
    </div>
  );
}