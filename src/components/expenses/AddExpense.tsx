import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { SelectPayment } from "./SelectPayment";
import { SelectCategory } from "./SelectCategory";
import { SelectPurpose } from "./SelectPurpose";
import { useExpenses } from "@/hooks/use-expenses";
import { toast } from "../ui/toast";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import type { ExpenseData } from "@/types/expense";
import { zodResolver } from "@hookform/resolvers/zod";

const expenseSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  date: z.string().min(1, "Date is required"),
  categoryId: z.coerce.number().positive("Select a category"),
  paymentMethodId: z.coerce.number().positive("Select a payment method"),
  purposeId: z.coerce.number().positive("Select a purpose"),
  installments: z.coerce.number().int().min(1).max(12),
});

const defaultValues = {
  title: "",
  amount: undefined,
  date: "",
  categoryId: undefined,
  paymentMethodId: undefined,
  purposeId: undefined,
  installments: 1,
};

type ExpenseFormInput = z.input<typeof expenseSchema>;
type ExpenseSchema = z.output<typeof expenseSchema>;

export function AddExpense() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<
    ExpenseFormInput,
    undefined,
    ExpenseSchema
  >({
    resolver: zodResolver(expenseSchema),
    defaultValues,
  });
  const { createMutation } = useExpenses();

  const handleOpenChange = () => {
    setOpen((curr) => !curr);
    reset(defaultValues);
  };

  const handleAdd = (data: ExpenseSchema) => {
    createMutation.mutate(data as ExpenseData, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "The expense was created.",
        });

        setOpen(false);
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "The expense could not be created.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon /> Add Expense
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New expense
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the expense to add it to your records.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-8 mb-8">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Ex: restaurant"
                {...register("title")}
              />
            </Field>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  {...register("amount")}
                />
              </Field>
              <Field>
                <Label htmlFor="amount">Date</Label>
                <Input id="date" type="date" {...register("date")} />
              </Field>
            </div>
            <div className="flex items-center gap-2">
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
              <Field>
                <Label htmlFor="installments">Installments</Label>
                <Controller
                  name="installments"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(Number(value));
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, index) => (
                          <SelectItem
                            key={`installments-${index + 1}`}
                            value={String(index + 1)}
                          >
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
