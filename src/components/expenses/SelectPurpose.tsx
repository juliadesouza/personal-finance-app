import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Purpose } from "@/types/setting";
import { usePurposes } from "@/hooks/use-purposes";

type SelectPurposesProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SelectPurpose({ value, onChange }: SelectPurposesProps) {
  const { getPurposes } = usePurposes();

  const purposes = getPurposes?.data ?? [];

  const selectedPurpose = purposes?.find(
    (item: Purpose) => String(item.id) === String(value),
  );

  const handleOnValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };
  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{selectedPurpose?.title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {purposes?.map((item: Purpose) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
