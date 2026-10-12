import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types/setting";
import { useCategories } from "@/hooks/use-categories";

interface SelectCategoryProps {
  value?: string;
  onChange: (value: string) => void;
}

export function SelectCategory({ value, onChange }: SelectCategoryProps) {
  const { data: categories } = useCategories();

  const selectedCategory = categories?.find(
    (item: Category) => String(item.id) === String(value),
  );

  const handleOnValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{selectedCategory?.title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {categories?.map((item: Category) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
