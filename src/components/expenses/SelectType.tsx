import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Type } from "@/types/setting";
import { useExpenseTypes } from "@/hooks/use-expense-types";

interface SelectTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectType({ value, onChange }: SelectTypeProps) {
  const { getTypes } = useExpenseTypes();

  const types = getTypes?.data ?? [];

  const selectedType = types?.find(
    (item: Type) => String(item.id) === String(value),
  );

  const handleOnValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };
  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{selectedType?.title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {types?.map((item: Type) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
