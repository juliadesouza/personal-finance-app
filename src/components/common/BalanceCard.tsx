import { formatCurrency } from "@/utils/format";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "../ui/card";
import type { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

type SummaryCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  isLoading: boolean;
};

export function BalanceCard({
  title,
  value,
  icon,
  isLoading = false,
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-normal">{title}</CardTitle>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardContent>
        <span className="text-lg font-semibold">
          {isLoading ? (
            <Skeleton className="h-4 w-37.5" />
          ) : (
            (formatCurrency(value) ?? "N/A")
          )}
        </span>
      </CardContent>
    </Card>
  );
}
