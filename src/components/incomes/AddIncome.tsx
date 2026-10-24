import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useIncomes } from "@/hooks/use-incomes";
import { toast } from "../ui/toast";
import type { IncomeData } from "@/types/income";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const defaultValues = {
  title: "",
  amount: undefined,
  date: "",
};

type IncomeFormInput = z.input<typeof incomeSchema>;
type IncomeSchema = z.output<typeof incomeSchema>;

export function AddIncome() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<
    IncomeFormInput,
    undefined,
    IncomeSchema
  >({ resolver: zodResolver(incomeSchema), defaultValues });
  const { createMutation } = useIncomes();

  const handleOpenChange = () => {
    setOpen((curr) => !curr);
    reset(defaultValues);
  };

  const handleAdd = (data: IncomeSchema) => {
    createMutation.mutate(data as IncomeData, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "The income was created.",
        });

        setOpen(false);
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "The income could not be created.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon /> Add Income
          </Button>
        }
      />
      <DialogContent className="sm-max-w-md">
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New Income
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the income to add it to your records.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-8 mb-8">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Ex: salary"
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
          <DialogFooter>
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
