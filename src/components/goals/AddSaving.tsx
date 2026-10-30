import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { FieldGroup, Field } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useGoals } from "@/hooks/use-goals";
import type { SavingData } from "@/types/goal";

type AddSavingProps = {
  id: number;
  open: boolean;
  onOpenChange: () => void;
};

const savingSchema = z.object({
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val.replace(",", "."));
    }
    return val;
  }, z.number().positive("Amount must be greater than zero")),
  date: z.string().min(1, "Date is required"),
});

type SavingFormInput = z.input<typeof savingSchema>;
type SavingSchema = z.output<typeof savingSchema>;

const defaultValues = {
  amount: 0,
  date: "",
} satisfies Partial<SavingFormInput>;

export function AddSaving({ id, open, onOpenChange }: AddSavingProps) {
  const { register, reset, handleSubmit } = useForm<
    SavingFormInput,
    unknown,
    SavingSchema
  >({
    resolver: zodResolver(savingSchema),
    defaultValues,
  });

  const { savingMutation } = useGoals();

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const handleEdit = (data: SavingSchema) => {
    savingMutation.mutate(
      { id, saving: data as SavingData },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "The saving was added.",
          });
          onOpenChange();
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "The saving could not be completed.",
          });
          onOpenChange();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleEdit)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Edit goal</DialogTitle>
            <DialogDescription className="mb-4">
              Fill in the value of the saving.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  {...register("amount")}
                />
              </Field>
              <Field>
                <Label htmlFor="amount">Date</Label>
                <Input id="date" type="date" {...register("date")} />
              </Field>
            </div>
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
