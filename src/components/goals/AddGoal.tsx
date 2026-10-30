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
import { useGoals } from "@/hooks/use-goals";
import { toast } from "../ui/toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { GoalData } from "@/types/goal";

const goalSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  currentAmount: z.preprocess((val) => {
    if (val === undefined || val === "") return 0;

    if (typeof val === "string") {
      return Number(val.replace(",", "."));
    }

    return val;
  }, z.number().nonnegative("Amount cannot be negative")),
  targetAmount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val.replace(",", "."));
    }
    return val;
  }, z.number().positive("Target amount must be greater than zero")),
  dueDate: z.string().min(1, "Due date is required"),
});

const defaultValues = {
  title: "",
  currentAmount: 0,
  targetAmount: undefined,
  dueDate: "",
} satisfies Partial<GoalFormInput>;

type GoalFormInput = z.input<typeof goalSchema>;
type GoalSchema = z.output<typeof goalSchema>;

export function AddGoal() {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<
    GoalFormInput,
    undefined,
    GoalSchema
  >({ resolver: zodResolver(goalSchema), defaultValues });

  const { createMutation } = useGoals();

  const handleOpenChange = () => {
    setOpen((curr) => !curr);
    reset(defaultValues);
  };

  const handleAdd = (data: GoalSchema) => {
    createMutation.mutate(data as GoalData, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "The goal was created.",
        });
        setOpen(false);
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "The goal could not be created.",
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
            <PlusIcon /> Add Goal
          </Button>
        }
      />
      <DialogContent className="sm-max-w-md">
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">New Goal</DialogTitle>
            <DialogDescription>
              Fill in the details of the goal to add it to your records.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-8 mb-8">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Ex: MacBook Pro"
                {...register("title")}
              />
            </Field>
            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="currentAmount">Current Amount</Label>
                <Input
                  id="currentAmount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  {...register("currentAmount")}
                />
              </Field>
              <Field>
                <Label htmlFor="targetAmount">Target Amount</Label>
                <Input
                  id="targetAmount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  {...register("targetAmount")}
                />
              </Field>
            </div>

            <div className="flex items-center gap-2">
              <Field>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" {...register("dueDate")} />
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
