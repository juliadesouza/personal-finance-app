import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SortableHead, type SortOrder } from "../common/SortableHead";
import type { Saving, SavingSortField } from "@/types/goal";
import { formatCurrency, formatDate } from "@/utils/format";
import { SkeletonTable } from "../common/SkeletonTable";
import { TablePagination } from "../common/TablePagination";

type Sort = { sortBy: SavingSortField; order: SortOrder };

type Pagination = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

type SavingsTableProps = {
  savings: Saving[];
  sort: Sort;
  pagination: Pagination;
  onSort: (field: SavingSortField) => void;
  onPageChange: (page: number) => void;
  onEdit?: (expense: Saving) => void;
  onDelete?: (id: number) => void;
  isLoading: boolean;
};

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
          </TableRow>
        </TableHeader>
        {!isLoading && savings?.length > 0 && (
          <TableBody>
            {savings.map((saving: Saving) => (
              <TableRow key={`saving-${saving.id}`}>
                <TableCell>{formatDate(saving.date)}</TableCell>
                <TableCell>{saving.goal}</TableCell>
                <TableCell>{formatCurrency(saving.amount)}</TableCell>
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
