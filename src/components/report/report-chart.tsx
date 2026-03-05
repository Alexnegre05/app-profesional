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
      {/* Ajustamos el padding lateral para que el gráfico no toque los bordes en el móvil */}
      <CardContent className="h-[320px] pb-6 px-2 md:px-6">
        <ResponsiveContainer width="100%" height="100%">
          {/* Añadimos margen izquierdo para que los números del eje Y no se corten */}
          <BarChart data={data} margin={{ left: -10, right: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-cocoa)" vertical={false} />
            
            <XAxis 
              dataKey="category" 
              stroke="currentColor" 
              fontSize={10} // Un poco más pequeño para móvil
              tickLine={false} 
              axisLine={false} 
              className="opacity-50"
              interval={0} // Obliga a mostrar todas las categorías
              angle={-45}  // Rota el texto para que quepa en la pantalla del móvil
              textAnchor="end"
              height={60}  // Espacio extra para el texto rotado
            />
            <YAxis 
              stroke="currentColor" 
              fontSize={10} // Un poco más pequeño para móvil
              tickLine={false} 
              axisLine={false}
              className="opacity-50"
              width={40}
            />
            
            <Tooltip
              contentStyle={{ backgroundColor: "var(--color-cocoa)", border: "none", borderRadius: "8px" }}
              itemStyle={{ color: "white" }}
              cursor={{ fill: "var(--color-secondary)", opacity: 0.1 }}
              formatter={(value: any, name: any) =>
                name === "amount" ? [eur(Number(value)), "Importe"] : [value, "Cantidad"]
              }
            />
            
            <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Cantidad" />
            <Bar dataKey="amount" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} name="Importe" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
