import { formatCurrency } from "@/utils/format";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type WalletOverviewCardProps = {
  title: string;
  subtitle: string;
  value: number;
  isLoading: boolean;
};

export function WalletOverviewCard({
  title,
  value,
  subtitle,
  isLoading,
}: WalletOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xl font-semibold">
          {isLoading ? (
            <Skeleton className="h-4 w-37.5 rounded-md" />
          ) : (
            (formatCurrency(value) ?? "N/A")
          )}
        </span>
        <p className="text-xs text-muted-foreground font-normal">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
