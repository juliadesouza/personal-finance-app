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
import { useEffect, useState } from "react";
import { SelectPayment } from "./SelectPayment";
import { SelectCategory } from "./SelectCategory";
import { SelectPurpose } from "./SelectPurpose";
import { useExpenses } from "@/hooks/use-expenses";
import { toast } from "../ui/toast";

export function AddExpense() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [purposeId, setPurposeId] = useState<string>("");
  const [installments, setInstallments] = useState("1");

  const { createMutation } = useExpenses();

  useEffect(() => {
    if (createMutation.isError) {
      toast.add({
        type: "error",
        description: "The expense could not be created.",
      });
    }
  }, [createMutation.isError]);

  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.add({
        type: "success",
        description: "The expense was created.",
      });
      setOpen(false);
    }
  }, [createMutation.isSuccess]);

  const handleAdd = async () => {
    createMutation.mutate({
      title,
      amount: Number(amount),
      date,
      categoryId: Number(categoryId),
      paymentMethodId: Number(paymentId),
      purposeId: Number(purposeId),
      installments: Number(installments),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger
          render={
            <Button>
              <PlusIcon /> Add Expense
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              New expense
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the expense to add it to your records.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ex: restaurant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="0.00"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </Field>
              <Field>
                <Label htmlFor="amount">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Field>
            </div>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="payment-method">Payment Method</Label>
                <SelectPayment
                  value={paymentId}
                  onChange={(id: string) => setPaymentId(id)}
                />
              </Field>
              <Field>
                <Label htmlFor="installments">Installments</Label>
                <Select
                  id="installments"
                  name="paymentMethod"
                  value={installments}
                  onValueChange={(newValue) => {
                    if (newValue !== null) {
                      setInstallments(newValue);
                    }
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <SelectItem
                        key={`installments-${index + 1}`}
                        value={index + 1}
                      >
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="category">Category</Label>
                <SelectCategory
                  value={categoryId}
                  onChange={(id: string) => setCategoryId(id)}
                />
              </Field>
              <Field>
                <Label htmlFor="purpose">Purpose</Label>
                <SelectPurpose
                  value={purposeId}
                  onChange={(id: string) => setPurposeId(id)}
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
