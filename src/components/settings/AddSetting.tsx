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

export interface AddSettingProps {
  type: "category" | "purpose" | "payment-method";
}

const TYPES_MAP = {
  category: "Category",
  purpose: "Purpose",
  "payment-method": "Payment Method",
};

export default function AddSetting({ type }: AddSettingProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button variant="ghost" className="cursor-pointer">
              <PlusIcon className="size-4" />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New {TYPES_MAP[type].toLowerCase()}
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the {TYPES_MAP[type].toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ex: Food, Extra, Credit Card"
              />
            </Field>
            <Field>
              <Label htmlFor="description">Color</Label>
              <Input
                id="color"
                name="color"
                placeholder="Ex: #000000"
                type="color"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center justify-between gap-2">
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
        </DialogContent>
      </form>
    </Dialog>
  );
}
