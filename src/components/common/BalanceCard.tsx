import { formatCurrency } from "@/utils/format";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "../ui/card";
import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
};

export function BalanceCard({ title, value, icon }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-normal">{title}</CardTitle>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardContent>
        <span className="text-lg font-semibold">{formatCurrency(value)}</span>
      </CardContent>
    </Card>
  );
}
