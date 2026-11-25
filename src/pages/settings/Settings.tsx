import PageHeader from "@/components/common/PageHeader";
import { ExpenseCategoriesCard } from "@/components/settings/ExpenseCategoriesCard";
import { PaymentMethodsCard } from "@/components/settings/PaymentMethodsCard";

export default function Settings() {
  return (
    <main className="w-full">
      <PageHeader
        title="Settings"
        description="Manage the preferences that shape your financial experience."
      />
      <div className="grid grid-cols-2 gap-4">
        <ExpenseCategoriesCard />
        <PaymentMethodsCard />
      </div>
    </main>
  );
}
