import { cn } from "@/utils/clsx";

type ProgressBarProps = {
  progress: number;
  className?: string;
};

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className="flex items-center">
      <div className="bg-stone-200 h-3 flex-1 overflow-hidden rounded-full">
        <div
          className={cn(
            "bg-primary h-full rounded-full transition-all duration-300",
            className,
          )}
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
          }}
        />
      </div>

      <span className="text-sm font-medium tabular-nums" />
    </div>
  );
}
