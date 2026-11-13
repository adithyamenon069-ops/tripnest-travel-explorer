import type { ReactNode } from "react";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div role="status" className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-muted/50 px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-sun-soft text-sun-foreground">
        <Compass className="size-7" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
