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
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Registros filtrados</CardTitle>
        <div className="text-sm text-muted-foreground">{items.length} resultados</div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Importe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((it) => (
              <TableRow key={it.id}>
                <TableCell className="font-medium">
                  <Link className="underline" href={`/detalle/${it.id}`}>{it.id}</Link>
                </TableCell>
                <TableCell className="max-w-[320px] truncate">{it.title}</TableCell>
                <TableCell>{it.category}</TableCell>
                <TableCell>{it.owner}</TableCell>
                <TableCell>{new Date(it.date).toLocaleDateString("es-ES")}</TableCell>
                <TableCell className="text-right">{eur(it.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}