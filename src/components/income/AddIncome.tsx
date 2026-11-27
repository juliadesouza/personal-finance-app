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
import { useIncome } from "@/hooks/use-income";
import { toast } from "../ui/toast";
import type { IncomeData } from "@/types/income";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";

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
  const { createIncome } = useIncome();

  const isLoading = createIncome?.isPending || false;

  const handleOpenChange = () => {
    if (isLoading) return;

    setOpen((curr) => !curr);
    reset(defaultValues);
  };

  const handleAdd = (data: IncomeSchema) => {
    createIncome.mutate(data as IncomeData, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Your income has been added successfully.",
        });
        setOpen(false);
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "We couldn't add your income. Please try again.",
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
            <PlusIcon /> Add Income
          </Button>
        }
      />
      <DialogContent className="sm-max-w-md" showCloseButton={false}>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New Income
            </DialogTitle>
            <DialogDescription>
              Add the details below to keep your income records up to date.
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
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...register("date")} />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
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
