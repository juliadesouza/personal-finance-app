import { cn } from "@/utils/clsx";

type ProgressBarProps = {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  height?: number;
  progressColor?: string;
  backgroundColor?: string;
};

export function ProgressBar({
  progress,
  className,
  showPercentage = false,
  height = 12,
  progressColor,
  backgroundColor,
}: ProgressBarProps) {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-full relative",
          !backgroundColor && "bg-stone-200",
        )}
        style={{
          height: `${height}px`,
          ...(backgroundColor && { backgroundColor }),
        }}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            !progressColor && "bg-primary",
            className,
          )}
          style={{
            width: `${normalizedProgress}%`,
            ...(progressColor && { backgroundColor: progressColor }),
          }}
        >
          {showPercentage && normalizedProgress > 0 && (
            <span
              className="absolute inset-y-0 flex items-center justify-center text-[12px] font-normal text-white"
              style={{ width: `${normalizedProgress}%` }}
            >
              {Math.round(normalizedProgress)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
