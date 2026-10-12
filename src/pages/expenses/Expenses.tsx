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
import {
  SearchIcon,
  MoreHorizontalIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AddExpense } from "@/components/expenses/AddExpense";
import PageHeader from "@/components/common/PageHeader";
import { useExpenses } from "@/hooks/use-expenses";
import type { Expense } from "@/types/expense";
import FilterExpenses from "@/components/expenses/FilterExpenses";

type Date = {
  year: string;
  months: string[];
};

const getMonthLabel = (year: string, month: string) => {
  return new Date(Number(year), Number(month), 1).toLocaleString("en-us", {
    month: "long",
  });
};
export default function Expenses() {
  const { expenses, dates } = useExpenses();

  const [showFilters, setShowFilters] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  // Deriva os anos e meses com segurança
  const years = dates?.data?.map((date: Date) => date.year) || [];
  const currentYearData =
    dates?.data?.find((d: Date) => d.year === year) || dates?.data?.[0];
  const months = currentYearData?.months || [];

  // Efeito para definir o padrão com base no ano/mês atual ou fallback
  useEffect(() => {
    if (dates?.data && dates.data.length > 0 && !year) {
      const now = new Date();
      const currentYearStr = now.getFullYear().toString();
      const currentMonthStr = String(now.getMonth() + 1).padStart(2, "0");

      const foundYearObj = dates.data.find(
        (d: Date) => d.year === currentYearStr,
      );

      if (foundYearObj) {
        setYear(currentYearStr);

        if (foundYearObj.months.includes(currentMonthStr)) {
          setMonth(currentMonthStr);
        } else {
          setMonth(foundYearObj.months[0]);
        }
      } else {
        const fallbackYear = dates.data[0].year;
        setYear(fallbackYear);
        setMonth(dates.data[0].months[0]);
      }
    }
  }, [dates, year]);

  const handleYearChange = (value: string | null) => {
    if (!value) return;
    const yearData = dates?.data?.find((date: Date) => date.year === value);
    setYear(value);
    if (yearData && yearData.months.length > 0) {
      setMonth(yearData.months[0]);
    }
  };

  const handleMonthChange = (value: string | null) => {
    if (value) {
      setMonth(value);
    }
  };
  return (
    <section className="w-full">
      <PageHeader title="Expenses" description="Track your daily expenses." />
      <main>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-1 mr-2">
            <Select value={month} onValueChange={handleMonthChange}>
              <SelectTrigger>
                <SelectValue>{getMonthLabel(year, month)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month: string) => (
                  <SelectItem key={`month-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={handleYearChange}>
              <SelectTrigger>
                <SelectValue>{year}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {years?.map((year: string) => (
                  <SelectItem key={`year-${year}`} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="cursor-pointer"
            >
              <SlidersHorizontalIcon />
            </Button>
            <form className="flex-1">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>
          <AddExpense />
        </div>
        {showFilters && <FilterExpenses />}
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
              {expenses?.data?.map((expense: Expense) => (
                <TableRow key={`expense-${expense.id}`}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>R$ {expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.purpose}</TableCell>
                  <TableCell>{expense.payment}</TableCell>
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
