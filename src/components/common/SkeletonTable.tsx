import { Skeleton } from "../ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-6 flex-1" />
        </div>
      ))}
    </div>
  );
}
