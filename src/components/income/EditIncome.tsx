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
import { useIncome } from "@/hooks/use-income";
import type { IncomeData } from "@/types/income";
import { formatDateForInput } from "@/utils/format";

type EditIncomeProps = {
  id: number;
  open: boolean;
  title: string;
  amount: number;
  date: string;
  onOpenChange: () => void;
};

const incomeSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val.replace(",", "."));
    }
    return val;
  }, z.number().positive("Amount must be greater than zero")),
  date: z.string().min(1, "Date is required"),
});

type IncomeFormInput = z.input<typeof incomeSchema>;
type IncomeSchema = z.output<typeof incomeSchema>;

export function EditIncome({
  id,
  open,
  onOpenChange,
  title,
  amount,
  date,
}: EditIncomeProps) {
  const { register, reset, handleSubmit } = useForm<
    IncomeFormInput,
    unknown,
    IncomeSchema
  >({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      title,
      amount,
      date: formatDateForInput(date),
    },
  });

  const { updateMutation } = useIncome();

  useEffect(() => {
    if (open) {
      reset({ title, amount, date: formatDateForInput(date) });
    }
  }, [open, title, amount, date, reset]);

  const handleEdit = (data: IncomeSchema) => {
    updateMutation.mutate(
      { id, income: data as IncomeData },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "The income was updated.",
          });
          onOpenChange();
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "The income could not be updated.",
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
            <DialogTitle className="text-lg font-medium">
              Edit income
            </DialogTitle>
            <DialogDescription className="mb-4">
              Fill in the details of the income to edit it.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
            </Field>
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
                <Label htmlFor="date">Date</Label>
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
