"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllItems } from "@/lib/data";
import { applyFilters } from "@/lib/report";
import { useReportFilters } from "./report-filters";
import { eur } from "@/lib/utils";

export function ReportTable() {
  const { filters } = useReportFilters();
  const items = React.useMemo(() => applyFilters(getAllItems(), filters), [filters]);

  return (
    <Card className="bg-mocha border-none shadow-none text-white rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 p-4 md:p-6">
        <CardTitle className="text-lg font-bold">Registros filtrados</CardTitle>
        <div className="text-xs md:text-sm font-medium bg-cocoa px-3 py-1 rounded-full text-white/80">
          {items.length} resultados
        </div>
      </CardHeader>
      
      <CardContent className="p-0 md:p-6 md:pt-0">
        {/* 
           CAMBIO CLAVE: 
           'overflow-x-auto' permite deslizar la tabla con el dedo en el móvil.
           'w-full' asegura que ocupe todo el ancho.
        */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-none md:rounded-xl overflow-hidden border-t border-b md:border border-cocoa">
              <Table className="min-w-[600px] md:min-w-full">
                <TableHeader className="bg-secondary">
                  <TableRow className="border-none hover:bg-secondary">
                    <TableHead className="text-white font-bold h-10 px-4">ID</TableHead>
                    <TableHead className="text-white font-bold h-10">Título</TableHead>
                    <TableHead className="text-white font-bold h-10">Categoría</TableHead>
                    <TableHead className="text-white font-bold h-10">Responsable</TableHead>
                    <TableHead className="text-white font-bold h-10">Fecha</TableHead>
                    <TableHead className="text-right text-white font-bold h-10 px-4">Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((it, index) => (
                    <TableRow 
                      key={it.id} 
                      className={`border-cocoa ${index % 2 === 0 ? 'bg-mocha' : 'bg-cocoa/50'} hover:bg-transparent h-12`}
                    >
                      <TableCell className="font-bold px-4">
                        <Link className="text-primary underline decoration-primary/50" href={`/detalle/${it.id}`}>
                          {it.id}
                        </Link>
                      </TableCell>
                      {/* Ajustamos el ancho máximo en móvil para que no empuje demasiado la tabla */}
                      <TableCell className="max-w-[200px] md:max-w-[320px] truncate font-medium">
                        {it.title}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{it.category}</TableCell>
                      <TableCell className="whitespace-nowrap">{it.owner}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {new Date(it.date).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right font-black text-primary px-4 whitespace-nowrap">
                        {eur(it.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        {/* Aviso visual para el móvil si hay muchos datos */}
        <div className="md:hidden text-center py-2 text-[10px] text-white/30 italic">
          Desliza hacia los lados para ver más datos ← →
        </div>
      </CardContent>
    </Card>
  );
}
