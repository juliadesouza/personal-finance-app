import { useCategories } from "@/hooks/use-categories";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { usePurposes } from "@/hooks/use-purposes";
import { usePayments } from "@/hooks/use-payments";
import type { Category, Purpose, PaymentMethod } from "@/types/setting";

export default function FilterExpenses() {
  const { data: categories } = useCategories();
  const { data: purposes } = usePurposes();
  const { data: payments } = usePayments();

  return (
    <form className="flex items-center gap-2 mb-8">
      <Select items={categories}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories?.map((item: Category) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select items={purposes}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Purpose" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {purposes?.map((item: Purpose) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select items={payments}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {payments?.map((item: PaymentMethod) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </form>
  );
}
