import SettingsCard from "./SettingsCard";
import { Layers } from "lucide-react";
import { useExpenseTypes } from "@/hooks/use-expense-types";

export function ExpenseTypesCard() {
  const { getTypes } = useExpenseTypes();

  const data = getTypes?.data ?? [];
  const isPending = getTypes?.isPending;

  return (
    <SettingsCard
      title="Expense Types"
      items={data}
      isPending={isPending}
      icon={<Layers />}
      type="expense-type"
    />
  );
}
