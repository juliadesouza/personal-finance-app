import { ALL, getMonthLabel } from "@/utils/format";
import { GOAL_STATUS_VALUE_TO_TEXT } from "@/types/goal";
import type { GoalStatus } from "@/types/goal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AddGoal } from "./AddGoal";
import type { Date, Period } from "@/types/date";

interface GoalsFilterProps {
  dateOptions: Date[];
  period: Period;
  status: GoalStatus | null;
  onPeriodChange: (period: Period) => void;
  onStatusChange: (status: GoalStatus | null) => void;
}

export default function GoalsFilter({
  dateOptions,
  period,
  onPeriodChange,
  status,
  onStatusChange,
}: GoalsFilterProps) {
  const months = dateOptions.find((d) => d.year === period.year)?.months ?? [];

  const handleYearChange = (year: string | null) => {
    if (year) onPeriodChange({ year, month: ALL });
  };

  const handleMonthChange = (month: string | null) => {
    if (month) onPeriodChange({ year: period.year, month });
  };

  const handleStatusChange = (newStatus: string | null) => {
    onStatusChange(newStatus === ALL ? null : (newStatus as GoalStatus));
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

        <Select value={status ?? ALL} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue>
              {status ? GOAL_STATUS_VALUE_TO_TEXT[status] : "All statuses"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {Object.entries(GOAL_STATUS_VALUE_TO_TEXT).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AddGoal />
    </div>
  );
}
