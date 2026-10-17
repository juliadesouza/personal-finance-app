import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { CategoryData, PaymentMethodData } from "@/types/setting";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface AddSettingProps {
  type: "category" | "payment-method";
  onAdd: (data: CategoryData | PaymentMethodData) => Promise<void>;
}

const TYPES_MAP = {
  category: "Category",
  "payment-method": "Payment Method",
};

const PLACEHOLDERS_MAP = {
  category: "Clothing...",
  "payment-method": "Credit card...",
};

const settingSchema = z.object({ title: z.string().min(3), color: z.string() });

type SettingSchema = z.infer<typeof settingSchema>;

const defaultValues = { title: "", color: "" };

export default function AddSetting({ type, onAdd }: AddSettingProps) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<SettingSchema>({
    resolver: zodResolver(settingSchema),
    defaultValues,
  });

  const handleAdd = async (data: SettingSchema) => {
    try {
      await onAdd(data);
    } finally {
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" className="cursor-pointer">
            <PlusIcon className="size-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New {TYPES_MAP[type].toLowerCase()}
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the {TYPES_MAP[type].toLowerCase()}.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="flex flex-row items-center gap-2 mt-4">
            <Field className="flex-1">
              <Label htmlFor="description">Color</Label>
              <Input
                {...register("color")}
                id="color"
                placeholder="Ex: #000000"
                type="color"
              />
            </Field>
            <Field className="flex-5">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                id="title"
                placeholder={PLACEHOLDERS_MAP[type]}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center justify-between gap-2 mt-4">
            <DialogClose
              render={
                <Button variant="outline" className="cursor-pointer flex-1">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" className="cursor-pointer flex-1">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
