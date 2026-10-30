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
}: DetailedCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg text-primary font-semibold">{title}</span>
          {icon}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold pr-1">
              {formatCurrency(amount)}
            </span>
            <span className="text-xs text-muted-foreground font-normal">
              / {formatCurrency(target)}
            </span>
          </div>
          <span className="font-medium">{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
        <div className="bg-sidebar rounded-lg p-4">
          <div className="flex gap-2 items-center mb-2">
            <span className="text-primary font-semibold text-xs uppercase">
              {warningTitle}
            </span>
          </div>
          <p className="text-sm">
            <b className="font-semibold"> {formatCurrency(left)} </b>
            {warningSubtitle}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
