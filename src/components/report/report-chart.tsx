"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getAllItems } from "@/lib/data";
import { applyFilters, groupByCategory } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

export function ReportChart() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);
  const data = React.useMemo(() => groupByCategory(items), [items]);

  return (
    <Card className="bg-mocha border-none shadow-none text-white rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Gráfico por categoría</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px] pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Rejilla usando el color cocoa (marrón muy oscuro) */}
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-cocoa)" vertical={false} />
            
            {/* Ejes usando el color blanco del texto (foreground) */}
            <XAxis 
              dataKey="category" 
              stroke="currentColor" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              className="opacity-50"
            />
            <YAxis 
              stroke="currentColor" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              className="opacity-50"
            />
            
            {/* Tooltip usando fondo cocoa para que no se vea blanco */}
            <Tooltip
              contentStyle={{ backgroundColor: "var(--color-cocoa)", border: "none", borderRadius: "8px" }}
              itemStyle={{ color: "white" }}
              cursor={{ fill: "var(--color-secondary)", opacity: 0.1 }}
              formatter={(value: any, name: any) =>
                name === "amount" ? [eur(Number(value)), "Importe"] : [value, "Cantidad"]
              }
            />
            
            {/* Barras intercalando el Rojo Fuerte (Primary) y el Rojo Suave (Secondary) */}
            <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Cantidad" />
            <Bar dataKey="amount" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} name="Importe" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
