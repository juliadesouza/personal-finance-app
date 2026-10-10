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
import { useEffect, useState } from "react";
import type { CategoryData } from "@/types/category";

export interface AddSettingProps {
  type: "category" | "payment-method";
  onAdd: (data: CategoryData) => Promise<void>;
}

const TYPES_MAP = {
  category: "Category",
  "payment-method": "Payment Method",
};

const PLACEHOLDERS_MAP = {
  category: "Clothing...",
  "payment-method": "Credit card...",
};

export default function AddSetting({ type, onAdd }: AddSettingProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const handleAdd = async () => {
    try {
      await onAdd({ title, color } as CategoryData);
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    setTitle("");
    setColor("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                placeholder={PLACEHOLDERS_MAP[type]}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Color</Label>
              <Input
                id="color"
                name="color"
                placeholder="Ex: #000000"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
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
            <Button
              type="submit"
              className="cursor-pointer flex-1"
              onClick={handleAdd}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
