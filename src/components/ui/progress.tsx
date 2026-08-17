import { cn } from "@/lib/cn";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-line", className)}
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-300"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
