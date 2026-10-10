import PageHeader from "@/components/common/PageHeader";
import CategoriesCard from "@/components/settings/CategoriesCard";
import PaymentMethodsCard from "@/components/settings/PaymentMethodsCard";

export default function Settings() {
  return (
    <main className="w-full">
      <PageHeader
        title="Settings"
        description="Manage your account settings."
      />
      <div className="grid grid-cols-2 gap-4">
        <CategoriesCard />
        <PaymentMethodsCard />
      </div>
    </main>
  );
}
