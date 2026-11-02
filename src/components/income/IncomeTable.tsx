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

type IncomeTableProps = {
  income: Income[];
  onEdit: (income: Income) => void;
  onDelete: (id: number) => void;
};
export function IncomeTable({ income, onEdit, onDelete }: IncomeTableProps) {
  return (
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
        {income?.map((income: Income) => (
          <TableRow key={`income-${income.id}`}>
            <TableCell>{formatDate(income.date)}</TableCell>
            <TableCell>{income.title}</TableCell>
            <TableCell>{formatCurrency(income.amount)}</TableCell>
            <TableCell>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
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
  );
}
