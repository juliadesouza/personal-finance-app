import { formatCurrency } from "@/utils/format";
import { ProgressBar } from "../common/ProgressBar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import type { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

type DetailedCardProps = {
  title: string;
  description: string;
  amount: number;
  target: number;
  progress: number;
  left: number;
  warningTitle: string;
  warningSubtitle: string;
  icon: ReactNode;
  isLoading?: boolean;
};
export function DetailedCard({
  title,
  description,
  amount,
  target,
  progress,
  left,
  warningTitle,
  warningSubtitle,
  icon,
  isLoading = false,
}: DetailedCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-normal">{title}</span>
          {icon}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-end gap-4">
            <Skeleton className="h-6 w-37.5" />
            <span className="text-xs text-muted-foreground font-normal">/</span>
            <Skeleton className="h-4 w-25" />
            <div className="ml-auto">
              <Skeleton className="h-4 w-7.5" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold pr-1">
                {formatCurrency(amount) ?? 0}
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                / {formatCurrency(target) ?? 0}
              </span>
            </div>
            <span className="font-medium">{progress ?? 0}%</span>
          </div>
        )}

        <ProgressBar progress={progress ?? 0} />
        <div className="bg-sidebar rounded-lg p-4">
          <div className="flex gap-2 items-center mb-2">
            <span className="text-primary font-semibold text-xs uppercase">
              {warningTitle}
            </span>
          </div>
          <p className="text-sm">
            <b className="font-semibold"> {formatCurrency(left) ?? 0} </b>
            {warningSubtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
