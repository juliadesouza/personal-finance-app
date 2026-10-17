import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { SearchIcon, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { AddExpense } from "@/components/expenses/AddExpense";
import PageHeader from "@/components/common/PageHeader";
import type { ExpenseDate, Expense } from "@/types/expense";
import { useExpenses, useExpenseDates } from "@/hooks/use-expenses";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { cn } from "@/utils/clsx";

type DateOption = { year: string; months: string[] };
type Period = { year: string; month: string };

const ALL = "all";

const getMonthLabel = (month: string) =>
  new Date(2000, Number(month) - 1, 1).toLocaleString("en-us", {
    month: "long",
  });

function getDefaultPeriod(dates: DateOption[]): Period {
  if (dates.length === 0) return { year: ALL, month: ALL };

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const yearData = dates.find((d) => d.year === year);

  if (!yearData) {
    return { year: dates[0].year, month: dates[0].months[0] ?? ALL };
  }
  return {
    year,
    month: yearData.months.includes(month)
      ? month
      : (yearData.months[0] ?? ALL),
  };
}

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Period | null>(null);

  const { data: dates } = useExpenseDates();

  const debouncedSearch = useDebouncedValue(search.trim());
  const dateOptions: ExpenseDate[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const { data: expenses } = useExpenses(
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

  return (
    <section className="w-full">
      <PageHeader title="Expenses" description="Track your daily expenses." />
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
                  <SelectItem key={m} value={m}>
                    {getMonthLabel(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputGroup className="flex-1">
              <InputGroupInput
                placeholder="Search by name, category or payment method..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <AddExpense />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Installments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses?.map((expense: Expense) => (
                <TableRow key={`expense-${expense.id}`}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>R$ {expense.amount}</TableCell>
                  <TableCell>
                    <span
                      className="px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: expense.category.color }}
                    >
                      {expense.category.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <span
                      className="px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: expense.purpose.color }}
                    >
                      {expense.purpose.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <span
                      className="px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: expense.payment.color }}
                    >
                      {expense.payment.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    {expense.installmentNumber}/{expense.installmentsTotal}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
}
