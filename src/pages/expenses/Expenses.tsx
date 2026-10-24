import { Fragment } from "react";
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
import type { Expense } from "@/types/expense";
import { useExpenses, useExpenseDates } from "@/hooks/use-expenses";
import useDebouncedValue from "@/hooks/use-debounced-value";
import { toast } from "@/components/ui/toast";
import { EditExpense } from "@/components/expenses/EditExpense";
import { getMonthLabel, formatCurrency } from "@/utils/format";
import { type Period, type Date } from "@/types/date";
import { getDefaultPeriod, ALL } from "@/utils/format";

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Period | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { data: dates } = useExpenseDates();

  const debouncedSearch = useDebouncedValue(search.trim());
  const dateOptions: Date[] = dates ?? [];
  const period = selected ?? getDefaultPeriod(dateOptions);
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const { data: expenses, deleteMutation } = useExpenses(
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

  const handleEditModal = () => {
    setOpenEditModal((curr) => !curr);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The expense was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The expense could not be deleted.",
        }),
    });
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
                placeholder="Search by title, category or payment method..."
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
                <Fragment key={`expense-group-${expense.id}`}>
                  <EditExpense
                    id={expense.id}
                    open={openEditModal}
                    onOpenChange={handleEditModal}
                    title={expense.title}
                    amount={expense.amount}
                    categoryId={expense.category.id}
                    paymentMethodId={expense.payment.id}
                    purposeId={expense.purpose.id}
                  />
                  <TableRow key={`expense-${expense.id}`}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{formatCurrency(expense.amount)}</TableCell>
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
                            onClick={handleEditModal}
                          >
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={() => handleDelete(expense.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
}
