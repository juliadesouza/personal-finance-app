import type { Income } from "@/types/income";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate, formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { SkeletonTable } from "../common/SkeletonTable";

type IncomeTableProps = {
  income: Income[];
  onEdit: (income: Income) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
};
export function IncomeTable({
  income,
  onEdit,
  onDelete,
  isLoading = false,
}: IncomeTableProps) {
  const hasNoData = !isLoading && income.length === 0;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            income.length > 0 &&
            income?.map((income: Income) => (
              <TableRow key={`income-${income.id}`}>
                <TableCell>{formatDate(income.date)}</TableCell>
                <TableCell>{income.title}</TableCell>
                <TableCell>{formatCurrency(Number(income.amount))}</TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => onEdit(income)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => onDelete(income.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isLoading && <SkeletonTable />}
      {hasNoData && (
        <p className="mt-16 text-center text-muted-foreground">
          No expenses found for the selected filters. Try changing your filters
          or adding new expenses.
        </p>
      )}
    </>
  );
}
