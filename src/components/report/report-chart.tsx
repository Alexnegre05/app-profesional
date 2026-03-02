"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { getAllItems } from "@/lib/data";
import { applyFilters, groupByCategory } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

export function ReportChart() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);
  const data = React.useMemo(() => groupByCategory(items), [items]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico por categoría</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip
              formatter={(value: any, name: any) =>
                name === "amount" ? eur(Number(value)) : value
              }
            />
            <Bar dataKey="count" />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}