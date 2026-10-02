import PageHeader from "@/components/common/PageHeader";
import SettingsCard from "@/components/settings/SettingsCard";
import { CreditCardIcon, Tag, TagIcon, TargetIcon } from "lucide-react";

const categories = [
  {
    id: "asuahsuahs",
    name: "Category 1",
    color: "red",
  },
  {
    id: "asuahsuahs2",
    name: "Category 2",
    color: "blue",
  },
  {
    id: "asuahsuahs3",
    name: "Category 3",
    color: "green",
  },
];

const purposes = [
  {
    id: "asuahsuahs1",
    name: "Purpose 1",
    color: "pink",
  },
  {
    id: "asuahsuahs2",
    name: "Purpose 2",
    color: "purple",
  },
  {
    id: "asuahsuahs3",
    name: "Purpose 3",
    color: "yellow",
  },
];

const paymentMethods = [
  {
    id: "asuahsuahs1",
    name: "Payment Method 1",
    color: "red",
  },
  {
    id: "asuahsuahs2",
    name: "Payment Method 2",
    color: "blue",
  },
  {
    id: "asuahsuahs3",
    name: "Payment Method 3",
    color: "green",
  },
];

export default function Settings() {
  return (
    <main className="w-full">
      <PageHeader
        title="Settings"
        description="Manage your account settings."
      />
      <div className="grid grid-cols-3 gap-4">
        <SettingsCard
          title="Categories"
          icon={<TagIcon />}
          items={categories}
          type="category"
        />
        <SettingsCard
          title="Purposes"
          icon={<TargetIcon />}
          items={purposes}
          type="purpose"
        />
        <SettingsCard
          title="Payment Methods"
          icon={<CreditCardIcon />}
          items={paymentMethods}
          type="payment-method"
        />
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
