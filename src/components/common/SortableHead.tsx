import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import { TableHead } from "@/components/ui/table";

export type SortOrder = "asc" | "desc";

interface Props<T extends string> {
  field: T;
  label: string;
  activeField: T;
  order: SortOrder;
  onSort: (field: T) => void;
}

export function SortableHead<T extends string>({
  field,
  label,
  activeField,
  order,
  onSort,
}: Props<T>) {
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
