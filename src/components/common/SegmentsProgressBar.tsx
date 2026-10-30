import { cn } from "@/utils/clsx";

type ProgressSegment = {
  label: string;
  percentage: number;
  color: string;
};

type SegmentsProgressBarProps = {
  segments: ProgressSegment[];
  className?: string;
};

export function SegmentsProgressBar({
  segments = [],
  className,
}: SegmentsProgressBarProps) {
  const items = segments.reduce<(ProgressSegment & { start: number })[]>(
    (acc, segment) => {
      const start =
        acc.length > 0
          ? acc[acc.length - 1].start + acc[acc.length - 1].percentage
          : 0;

      return [...acc, { ...segment, start }];
    },
    [],
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="bg-stone-200 h-3 flex overflow-hidden rounded-full">
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              width: `${segment.percentage}%`,
              backgroundColor: segment.color,
            }}
            className="h-full transition-all duration-300"
          />
        ))}
      </div>

      <div className="relative h-10">
        {items.map((item) => (
          <div
            key={item.label}
            className="absolute flex flex-col"
            style={{ left: `${item.start}%` }}
          >
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-sm font-semibold tabular-nums">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
