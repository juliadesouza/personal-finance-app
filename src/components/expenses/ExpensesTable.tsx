import type { Expense, ExpenseSortField, SortOrder } from "@/types/expense";
import { formatDate, formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { TriangleAlert, MoreHorizontalIcon } from "lucide-react";
import { SortableHead } from "../common/SortableHead";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { TablePagination } from "../common/TablePagination";

type Sort = { sortBy: ExpenseSortField; order: SortOrder };

type Pagination = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

type ExpensesTableProps = {
  expenses: Expense[];
  sort: Sort;
  pagination?: Pagination;
  onSort: (field: ExpenseSortField) => void;
  onPageChange: (page: number) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
};

import { SkeletonTable } from "../common/SkeletonTable";

export default function ExpensesTable({
  expenses,
  sort,
  pagination,
  onSort,
  onPageChange,
  onEdit,
  onDelete,
  isLoading = false,
}: ExpensesTableProps) {
  const sortProps = {
    activeField: sort.sortBy,
    order: sort.order,
    onSort,
  };

  const hasNoData = !isLoading && expenses.length === 0;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <SortableHead field="date" label="Date" {...sortProps} />
            <SortableHead field="title" label="Title" {...sortProps} />
            <TableHead>Amount</TableHead>
            <SortableHead field="category" label="Category" {...sortProps} />
            <SortableHead field="purpose" label="Purpose" {...sortProps} />
            <SortableHead
              field="payment"
              label="Payment Method"
              {...sortProps}
            />
            <TableHead>Installments</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {!isLoading && expenses.length > 0 && (
          <TableBody>
            {expenses?.map((expense: Expense) => (
              <TableRow key={`expense-${expense.id}`}>
                <TableCell>
                  {expense.isSimulation && (
                    <TriangleAlert className="size-5 text-warning" />
                  )}
                </TableCell>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{formatCurrency(Number(expense.amount))}</TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: expense.category.color }}
                  >
                    {expense.category.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: expense.purpose.color }}
                  >
                    {expense.purpose.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: expense.payment.color }}
                  >
                    {expense.payment.title}
                  </span>
                </TableCell>
                <TableCell>
                  {expense.installmentNumber}/{expense.installmentsTotal}
                </TableCell>
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
                        onClick={() => onEdit(expense)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => onDelete(expense.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      {isLoading && <SkeletonTable />}
      {hasNoData && (
        <p className="mt-16 text-center text-muted-foreground">
          No expenses found for the selected filters. Try changing your filters
          or adding new expenses.
        </p>
      )}
      {!isLoading && !hasNoData && pagination && (
        <TablePagination {...pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
