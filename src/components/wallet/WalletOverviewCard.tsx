import { formatCurrency } from "@/utils/format";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type WalletOverviewCardProps = {
  title: string;
  subtitle: string;
  value: number;
};

export function WalletOverviewCard({
  title,
  value,
  subtitle,
}: WalletOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xl font-semibold">{formatCurrency(value)}</span>
        <p className="text-xs text-muted-foreground font-normal">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
