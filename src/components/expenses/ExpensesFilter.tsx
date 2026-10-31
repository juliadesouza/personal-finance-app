import { ALL, getMonthLabel } from "@/utils/format";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AddExpense } from "./AddExpense";
import type { Period, Date } from "@/types/date";

type ExpensesFilterProps = {
  dateOptions: Date[];
  period: Period;
  search: string;
  onPeriodChange: (period: Period) => void;
  onSearchChange: (value: string) => void;
};

export default function ExpensesFilter({
  dateOptions,
  period,
  search,
  onPeriodChange,
  onSearchChange,
}: ExpensesFilterProps) {
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const handleYearChange = (year: string | null) => {
    if (year) onPeriodChange({ year, month: ALL });
  };

  const handleMonthChange = (month: string | null) => {
    if (month) onPeriodChange({ year: period.year, month });
  };

  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <AddExpense />
    </div>
  );
}
