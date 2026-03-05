import { HelpButton } from "@/components/help-button";

export function PageHeader({
  title,
  description,
  helpKey,
}: {
  title: string;
  description?: string;
  helpKey: string;
}) {
  return (
    /* 
       'items-center' para que el botón de ayuda y el título estén en la misma línea visual.
       'pb-2' para separar la cabecera del contenido.
    */
    <div className="flex items-center justify-between gap-3 md:gap-4 pb-2">
      
      {/* 'min-w-0' y 'flex-1' permiten que el texto se ajuste al ancho disponible */}
      <div className="min-w-0 flex-1">
        {/* 
           'truncate' o 'break-words' para que títulos largos no rompan el layout.
           'text-lg md:text-xl' para que en el móvil no sea un texto gigantesco.
        */}
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight truncate">
          {title}
        </h1>
        
        {description ? (
          /* 'line-clamp-1' para que la descripción no ocupe 3 líneas en el móvil */
          <p className="text-xs md:text-sm text-white/60 line-clamp-1 md:line-clamp-none">
            {description}
          </p>
        ) : null}
      </div>

      {/* 'shrink-0' asegura que el botón "?" NO se haga pequeño si el título es largo */}
      <div className="shrink-0">
        <HelpButton helpKey={helpKey} />
      </div>

    </div>
  );
}
