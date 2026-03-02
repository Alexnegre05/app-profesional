"use client";

import * as React from "react";
import { getAllItems } from "@/lib/data";
import { defaultFilters, getOwners, type ReportFilters } from "@/lib/report";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// mini-store simple para que otros componentes lean los filtros
let listeners: Array<() => void> = [];
let current: ReportFilters = defaultFilters();

export function useReportFilters() {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    const fn = () => force((x) => x + 1);
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
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
    <Card>
      <CardContent className="p-4 md:p-5">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              value={filters.status}
              onValueChange={(v) => setFilters({ ...filters, status: v as any })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="open">Abiertas</SelectItem>
                <SelectItem value="closed">Cerradas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select
              value={filters.category}
              onValueChange={(v) => setFilters({ ...filters, category: v as any })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Responsable</Label>
            <Select
              value={filters.owner}
              onValueChange={(v) => setFilters({ ...filters, owner: v as any })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {owners.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Desde</Label>
            <Input
              type="date"
              value={filters.from ?? ""}
              onChange={(e) => setFilters({ ...filters, from: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label>Hasta</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filters.to ?? ""}
                onChange={(e) => setFilters({ ...filters, to: e.target.value || undefined })}
              />
              <Button
                variant="secondary"
                onClick={() => setFilters(defaultFilters())}
                title="Restablecer"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}