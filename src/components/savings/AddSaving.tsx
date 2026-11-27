import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { FieldGroup, Field } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useSavings } from "@/hooks/use-savings";
import { Spinner } from "@/components/ui/spinner";
import { SelectGoal } from "./SelectGoal";
import type { SavingData } from "@/types/saving";
import { PlusIcon } from "lucide-react";

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

const defaultValues = {
  goalId: undefined,
  amount: 0,
  date: "",
} satisfies Partial<SavingFormInput>;

export function AddSaving() {
  const [open, setOpen] = useState(false);

  const { register, reset, handleSubmit, control } = useForm<
    SavingFormInput,
    unknown,
    SavingSchema
  >({
    resolver: zodResolver(savingSchema),
    defaultValues,
  });

  const { createSaving } = useSavings();
  const isLoading = createSaving?.isPending || false;

  const handleOpenChange = () => {
    setOpen((curr) => !curr);
    reset(defaultValues);
  };

  const handleAdd = (data: SavingSchema) => {
    createSaving.mutate(data as SavingData, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Savings has been added successfully.",
        });
        setOpen(false);
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "We couldn't add to savings. Please try again.",
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="cursor-pointer">
            <PlusIcon /> Add to savings
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Add to savings
            </DialogTitle>
            <DialogDescription className="mb-4">
              Enter the amount you'd like to add to your savings.
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
