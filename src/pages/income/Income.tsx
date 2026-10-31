import PageHeader from "@/components/common/PageHeader";
import { AddIncome } from "@/components/income/AddIncome";
import { EditIncome } from "@/components/income/EditIncome";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { useIncome, useIncomeDates } from "@/hooks/use-income";
import { type Period, type Date } from "@/types/date";
import type { Income } from "@/types/income";
import {
  getDefaultPeriod,
  ALL,
  getMonthLabel,
  formatCurrency,
  formatDate,
} from "@/utils/format";
import { MoreHorizontalIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Income() {
  const [selected, setSelected] = useState<Period | null>(null);
  const [search, setSearch] = useState("");
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  const { data: dates } = useIncomeDates();

  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const debouncedSearch = useDebouncedValue(search.trim());
  const { data: income, deleteMutation } = useIncome(
    {
      year: period.year === ALL ? undefined : Number(period.year),
      month: period.month === ALL ? undefined : Number(period.month),
      ...(debouncedSearch && { search: debouncedSearch }),
    },
    { enabled: !!dates },
  );
  const handleYearChange = (year: string | null) => {
    if (year) setSelected({ year, month: ALL });
  };

  const handleMonthChange = (month: string | null) => {
    if (month) setSelected({ year: period.year, month });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The income was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The income could not be deleted.",
        }),
    });
  };

  return (
    <section className="w-full">
      <PageHeader title="Income" description="Track your daily income." />
      <main>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-1 mr-2">
            <Select value={period.year} onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue>
                  {period.year === ALL ? "All years" : period.year}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All years</SelectItem>
                {dateOptions.map((d) => (
                  <SelectItem key={d.year} value={d.year}>
                    {d.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={period.month}
              onValueChange={handleMonthChange}
              disabled={period.year === ALL}
            >
              <SelectTrigger>
                <SelectValue>
                  {period.month === ALL
                    ? "All months"
                    : getMonthLabel(period.month)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All months</SelectItem>
                {months.map((m) => (
                  <SelectItem value={m} key={m}>
                    {getMonthLabel(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputGroup className="flex-1">
              <InputGroupInput
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <AddIncome />
        </div>
        <div>
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setEditingIncome(income)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() => handleDelete(income.id)}
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
          {editingIncome && (
            <EditIncome
              id={editingIncome?.id}
              open
              onOpenChange={() => setEditingIncome(null)}
              title={editingIncome?.title}
              amount={editingIncome?.amount}
              date={editingIncome?.date}
            />
          )}
        </div>
      </main>
    </section>
  );
}
