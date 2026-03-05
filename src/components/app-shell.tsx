import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    // 'min-h-dvh' es perfecto para móviles porque se ajusta a la barra del navegador
    <div className="min-h-dvh bg-background text-foreground flex flex-col md:flex-row">
      
      {/* 
         SIDEBAR: 
         En móvil (default) suele ir oculta o arriba. 
         En PC (md:flex) se pone a la izquierda.
      */}
      <div className="md:block shrink-0">
        <Sidebar />
      </div>

      {/* 
         CONTENEDOR PRINCIPAL:
         'min-w-0' evita que los elementos hijos (como las tablas) rompan el layout.
         'flex-1' hace que ocupe todo el espacio sobrante.
      */}
      <div className="min-w-0 flex-1 flex flex-col">
        <Topbar />
        
        {/* 
           MAIN:
           'p-3' en móvil para ganar espacio en los bordes.
           'md:p-6' en PC para que respire.
           'overflow-x-hidden' es vital para que no aparezca scroll lateral feo.
        */}
        <main className="mx-auto w-full max-w-6xl p-3 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
