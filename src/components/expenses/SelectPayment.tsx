import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentMethod } from "@/types/setting";
import { usePayments } from "@/hooks/use-payments";

interface SelectPaymentProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectPayment({ value, onChange }: SelectPaymentProps) {
  const { data: payments } = usePayments();

  const selectedPayment = payments?.find(
    (item: PaymentMethod) => String(item.id) === String(value),
  );

  const handleOnValueChange = (newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{selectedPayment?.title}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {payments?.map((item: PaymentMethod) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
