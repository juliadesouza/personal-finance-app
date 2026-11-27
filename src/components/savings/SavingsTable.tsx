import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SortableHead, type SortOrder } from "../common/SortableHead";
import type { Saving, SavingSortField } from "@/types/saving";
import { formatCurrency, formatDate } from "@/utils/format";
import { SkeletonTable } from "../common/SkeletonTable";
import { TablePagination } from "../common/TablePagination";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

type Sort = { sortBy: SavingSortField; order: SortOrder };

type Pagination = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

interface SavingsTableProps {
  savings: Saving[];
  sort: Sort;
  pagination: Pagination;
  onSort: (field: SavingSortField) => void;
  onPageChange: (page: number) => void;
  onEdit: (saving: Saving) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export function SavingsTable({
  savings,
  sort,
  pagination,
  onSort,
  onPageChange,
  onEdit,
  onDelete,
  isLoading = false,
}: SavingsTableProps) {
  const sortProps = {
    activeField: sort.sortBy,
    order: sort.order,
    onSort,
  };
  const hasNoData = !isLoading && savings.length === 0;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead field="date" label="Date" {...sortProps} />
            <SortableHead field="goal" label="Goal" {...sortProps} />
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {!isLoading && savings?.length > 0 && (
          <TableBody>
            {savings.map((saving: Saving) => (
              <TableRow key={`saving-${saving.id}`}>
                <TableCell>{formatDate(saving.date)}</TableCell>
                <TableCell>{saving.goal.title}</TableCell>
                <TableCell>{formatCurrency(saving.amount)}</TableCell>
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
                        onClick={() => onEdit(saving)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => onDelete(saving.id)}
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
          You haven't made any savings contributions yet. Add your first
          contribution.
        </p>
      )}
      {!isLoading && !hasNoData && pagination && (
        <TablePagination {...pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
