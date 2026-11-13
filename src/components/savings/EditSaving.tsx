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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useSavings } from "@/hooks/use-savings";
import { Spinner } from "@/components/ui/spinner";
import { SelectGoal } from "./SelectGoal";
import type { SavingData } from "@/types/saving";
import { formatDateForInput } from "@/utils/format";

const savingSchema = z.object({
  goalId: z.coerce.number().positive("Select a goal"),
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

type EditExpenseProps = {
  id: number;
  amount: number;
  date: string;
  goalId: number;
  open: boolean;
  onOpenChange: () => void;
};

export function EditSaving({
  id,
  amount,
  date,
  goalId,
  open,
  onOpenChange,
}: EditExpenseProps) {
  const { register, reset, handleSubmit, control } = useForm<
    SavingFormInput,
    unknown,
    SavingSchema
  >({
    resolver: zodResolver(savingSchema),
    defaultValues: {
      amount,
      date: formatDateForInput(date),
      goalId,
    },
  });

  const { updateSaving } = useSavings();
  const isLoading = updateSaving?.isPending || false;

  useEffect(() => {
    if (open) {
      reset({
        amount,
        goalId,

        date: formatDateForInput(date),
      });
    }
  }, [open, amount, date, reset, goalId]);

  const handleEdit = (data: SavingSchema) => {
    updateSaving.mutate(
      { id, saving: data as SavingData },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "The saving was updated.",
          });
          onOpenChange();
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "The saving could not be updated.",
          });
          onOpenChange();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <form onSubmit={handleSubmit(handleEdit)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Edir saving
            </DialogTitle>
            <DialogDescription className="mb-4">
              Fill in the value of the saving to edit it.
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
            <Field>
              <Label htmlFor="goalId">Goal</Label>
              <Controller
                name="goalId"
                control={control}
                render={({ field }) => (
                  <SelectGoal
                    value={field.value ? String(field.value) : ""}
                    onChange={(value) => field.onChange(Number(value))}
                  />
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex items-center justify-between gap-2 mt-4">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  className="cursor-pointer flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              className="cursor-pointer flex-1"
              disabled={isLoading}
            >
              Confirm {isLoading && <Spinner data-icon="inline-start" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
