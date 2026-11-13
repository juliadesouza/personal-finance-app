import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGoals } from "@/hooks/use-goals";
import type { Goal } from "@/types/goal";

type SelectGoalProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SelectGoal({ value, onChange }: SelectGoalProps) {
  const { goalsQuery } = useGoals();
  const { data } = goalsQuery;

  const selectedGoal = data?.find(
    (item: Goal) => String(item.id) === String(value),
  );

  const handleOnValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue>{selectedGoal?.title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data?.map((item: Goal) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
