"use client";

import * as React from "react";
import { getAllItems } from "@/lib/data";
import { defaultFilters, getOwners, type ReportFilters } from "@/lib/report";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ... (Mantenemos la lógica de useReportFilters igual)
let listeners: Array<() => void> = [];
let current: ReportFilters = defaultFilters();

export function useReportFilters() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const fn = () => force((x) => x + 1);
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  }, []);
  return {
    filters: current,
    setFilters: (next: ReportFilters) => {
      current = next;
      listeners.forEach((l) => l());
    },
  };
}

export function ReportFilters() {
  const { filters, setFilters } = useReportFilters();
  const owners = React.useMemo(() => getOwners(), []);
  const items = React.useMemo(() => getAllItems(), []);
  const categories = React.useMemo(() => {
    const s = new Set(items.map((x) => x.category));
    return Array.from(s).sort();
  }, [items]);

  return (
    <Card className="bg-secondary border-none shadow-none text-white rounded-2xl">
      <CardContent className="p-4 md:p-5">
        {/* 
           CAMBIO CLAVE: 
           'grid-cols-2' -> En móvil van de dos en dos.
           'md:grid-cols-5' -> En PC vuelve a la fila única.
        */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end">
          
          <div className="space-y-1.5">
            <Label className="font-bold text-xs md:text-sm">Estado</Label>
            <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v as any })}>
              <SelectTrigger className="bg-mocha border-none text-white h-10 w-full"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-mocha border-none text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Abiertas</SelectItem>
                <SelectItem value="closed">Cerradas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-xs md:text-sm">Categoría</Label>
            <Select value={filters.category} onValueChange={(v) => setFilters({ ...filters, category: v as any })}>
              <SelectTrigger className="bg-mocha border-none text-white h-10 w-full"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-mocha border-none text-white">
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-xs md:text-sm">Responsable</Label>
            <Select value={filters.owner} onValueChange={(v) => setFilters({ ...filters, owner: v as any })}>
              <SelectTrigger className="bg-mocha border-none text-white h-10 w-full"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-mocha border-none text-white">
                <SelectItem value="all">Todos</SelectItem>
                {owners.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-xs md:text-sm">Desde</Label>
            <Input type="date" className="bg-mocha border-none text-white h-10 [color-scheme:dark] w-full text-xs md:text-sm" value={filters.from ?? ""} onChange={(e) => setFilters({ ...filters, from: e.target.value || undefined })} />
          </div>

          {/* En móvil, este último bloque ocupará las 2 columnas para que el botón no quede aplastado */}
          <div className="space-y-1.5 col-span-2 md:col-span-1">
            <Label className="font-bold text-xs md:text-sm">Hasta</Label>
            <div className="flex gap-2">
              <Input type="date" className="bg-mocha border-none text-white h-10 [color-scheme:dark] flex-1 text-xs md:text-sm" value={filters.to ?? ""} onChange={(e) => setFilters({ ...filters, to: e.target.value || undefined })} />
              <Button className="bg-primary text-white border-none h-10 font-bold px-3" onClick={() => setFilters(defaultFilters())}>Reset</Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
