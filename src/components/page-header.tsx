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
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <HelpButton helpKey={helpKey} />
    </div>
  );
}