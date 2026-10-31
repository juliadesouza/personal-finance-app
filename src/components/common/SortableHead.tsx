import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import type { ExpenseSortField, SortOrder } from "@/types/expense";

type Props = {
  field: ExpenseSortField;
  label: string;
  activeField: ExpenseSortField;
  order: SortOrder;
  onSort: (field: ExpenseSortField) => void;
};

export function SortableHead({
  field,
  label,
  activeField,
  order,
  onSort,
}: Props) {
  const active = field === activeField;
  const Icon = !active
    ? ArrowUpDownIcon
    : order === "asc"
      ? ArrowUpIcon
      : ArrowDownIcon;

  return (
    <TableHead
      aria-sort={
        active ? (order === "asc" ? "ascending" : "descending") : "none"
      }
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 hover:text-foreground cursor-pointer"
      >
        {label}
        <Icon className={`size-4 ${active ? "" : "opacity-40"}`} />
      </button>
    </TableHead>
  );
}
