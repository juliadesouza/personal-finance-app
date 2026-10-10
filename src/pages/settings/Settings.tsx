import PageHeader from "@/components/common/PageHeader";
import SettingsCard from "@/components/settings/SettingsCard";
import { TagIcon, CreditCardIcon } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import CategoriesCard from "@/components/settings/CategoriesCard";

export default function Settings() {
  return (
    <main className="w-full">
      <PageHeader
        title="Settings"
        description="Manage your account settings."
      />
      <div className="grid grid-cols-2 gap-4">
        <CategoriesCard />
        {/* <SettingsCard
          title="Payment Methods"
          icon={<CreditCardIcon />}
          items={paymentMethods}
          type="payment-method"
          onAdd={handleAddPaymentMethod}
        /> */}
      </div>
    </main>
  );
}

/*

 <div className="flex items-center justify-between gap-2">
           <div className="flex items-center gap-2">
            <Tag />
            <h2 className="text-lg font-medium">Categories</h2>
           </div>
           <div>
            <Button className="cursor-pointer">
                <PlusIcon />
            </Button>
           </div>
        </div>
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center justify-between gap-2">
                <CircleSmall fill="red" color="red"/>
                <span>Category 1</span>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
*/
