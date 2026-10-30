import { formatCurrency } from "@/utils/format";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type SummaryCardProps = {
  title: string;
  subtitle: string;
  value: number;
};

export function SummaryCard({ title, value, subtitle }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-md text-muted-foreground font-normal">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xl font-semibold">{formatCurrency(value)}</span>
        <p className="text-xs text-muted-foreground font-normal">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
