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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectPayment } from "./SelectPayment";
import { SelectCategory } from "./SelectCategory";
import { SelectPurpose } from "./SelectPurpose";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useExpenses } from "@/hooks/use-expenses";
import { type ExpenseData } from "@/types/expense";
import { formatDateForInput } from "@/utils/format";

type EditExpenseProps = {
  id: number;
  title: string;
  amount: number;
  date: string;
  categoryId: number;
  purposeId: number;
  paymentMethodId: number;
  open: boolean;
  onOpenChange: () => void;
};

const expenseSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val.replace(",", "."));
    }
    return val;
  }, z.number().positive("Amount must be greater than zero")),
  categoryId: z.coerce.number().positive("Select a category"),
  paymentMethodId: z.coerce.number().positive("Select a payment method"),
  purposeId: z.coerce.number().positive("Select a purpose"),
  date: z.string().min(1, "Date is required"),
});

type ExpenseFormInput = z.input<typeof expenseSchema>;
type ExpenseSchema = z.output<typeof expenseSchema>;

export function EditExpense({
  id,
  title,
  amount,
  date,
  categoryId,
  purposeId,
  paymentMethodId,
  open,
  onOpenChange,
}: EditExpenseProps) {
  const { register, control, reset, handleSubmit } = useForm<
    ExpenseFormInput,
    unknown,
    ExpenseSchema
  >({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title,
      amount,
      categoryId,
      paymentMethodId,
      purposeId,
      date: formatDateForInput(date),
    },
  });

  const { updateMutation } = useExpenses();

  useEffect(() => {
    if (open) {
      reset({
        title,
        amount,
        categoryId,
        paymentMethodId,
        purposeId,
        date: formatDateForInput(date),
      });
    }
  }, [
    open,
    title,
    amount,
    date,
    categoryId,
    paymentMethodId,
    purposeId,
    reset,
  ]);

  const handleEdit = (data: ExpenseSchema) => {
    updateMutation.mutate(
      { id, expense: data as ExpenseData },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "The expense was updated.",
          });
          onOpenChange();
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "The expense could not be updated.",
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
              Edit expense
            </DialogTitle>
            <DialogDescription className="mb-4">
              Fill in the details of the expense to edit it.
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
                <Label htmlFor="payment-method">Payment Method</Label>
                <Controller
                  name="paymentMethodId"
                  control={control}
                  render={({ field }) => (
                    <SelectPayment
                      value={field.value ? String(field.value) : ""}
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  )}
                />
              </Field>
            </div>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <SelectCategory
                      value={field.value ? String(field.value) : ""}
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor="purpose">Purpose</Label>
                <Controller
                  name="purposeId"
                  control={control}
                  render={({ field }) => (
                    <SelectPurpose
                      value={field.value ? String(field.value) : ""}
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  )}
                />
              </Field>
            </div>
            <div className="flex items-center gap-2">
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
