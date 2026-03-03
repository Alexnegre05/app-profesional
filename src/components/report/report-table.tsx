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
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold">Registros filtrados</CardTitle>
        <div className="text-sm font-medium bg-cocoa px-3 py-1 rounded-full">
          {items.length} resultados
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl overflow-hidden border border-cocoa">
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow className="border-none hover:bg-secondary">
                <TableHead className="text-white font-bold">ID</TableHead>
                <TableHead className="text-white font-bold">Título</TableHead>
                <TableHead className="text-white font-bold">Categoría</TableHead>
                <TableHead className="text-white font-bold">Responsable</TableHead>
                <TableHead className="text-white font-bold">Fecha</TableHead>
                <TableHead className="text-right text-white font-bold">Importe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it, index) => (
                <TableRow 
                  key={it.id} 
                  className={`border-cocoa ${index % 2 === 0 ? 'bg-mocha' : 'bg-cocoa/50'} hover:bg-transparent`}
                >
                  <TableCell className="font-bold">
                    <Link className="text-primary underline decoration-primary/50" href={`/detalle/${it.id}`}>
                      {it.id}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[320px] truncate font-medium">{it.title}</TableCell>
                  <TableCell>{it.category}</TableCell>
                  <TableCell>{it.owner}</TableCell>
                  <TableCell>{new Date(it.date).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell className="text-right font-black text-primary">
                    {eur(it.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
