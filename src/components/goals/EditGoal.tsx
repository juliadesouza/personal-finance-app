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
import {
  type GoalData,
  type GoalStatus,
  GOAL_STATUS_VALUE_TO_TEXT,
} from "@/types/goal";
import { formatDateForInput } from "@/utils/format";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EditGoalProps {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  dueDate: string;
  status: GoalStatus;
  open: boolean;
  onOpenChange: () => void;
}

const goalSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  currentAmount: z.preprocess((val) => {
    if (val === undefined || val === "") return 0;
    if (typeof val === "string") return Number(val.replace(",", "."));
    return val;
  }, z.number().nonnegative("Amount cannot be negative")),
  targetAmount: z.preprocess((val) => {
    if (typeof val === "string") return Number(val.replace(",", "."));
    return val;
  }, z.number().positive("Target amount must be greater than zero")),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "CANCELLED", "COMPLETED"]),
});

type GoalFormInput = z.input<typeof goalSchema>;
type GoalSchema = z.output<typeof goalSchema>;

export function EditGoal({
  id,
  title,
  currentAmount,
  targetAmount,
  startDate,
  dueDate,
  status,
  open,
  onOpenChange,
}: EditGoalProps) {
  const { register, reset, handleSubmit, setValue, watch } = useForm<
    GoalFormInput,
    unknown,
    GoalSchema
  >({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title,
      currentAmount,
      targetAmount,
      startDate: formatDateForInput(startDate),
      dueDate: formatDateForInput(dueDate),
      status,
    },
  });

  const { updateGoal } = useGoals();
  const isLoading = updateGoal?.isPending || false;

  const selectedStatus = watch("status");

  useEffect(() => {
    if (open) {
      reset({
        title,
        currentAmount,
        targetAmount,
        startDate: formatDateForInput(startDate),
        dueDate: formatDateForInput(dueDate),
        status,
      });
    }
  }, [
    open,
    title,
    currentAmount,
    targetAmount,
    startDate,
    dueDate,
    reset,
    status,
  ]);

  const handleEdit = (data: GoalSchema) => {
    updateGoal.mutate(
      { id, goal: data as GoalData },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "The goal was updated.",
          });
          onOpenChange();
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "The goal could not be updated.",
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
            <DialogTitle className="text-lg font-medium">Edit goal</DialogTitle>
            <DialogDescription className="mb-4">
              Fill in the details of the goal to edit it.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
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
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
              </Field>
              <Field>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" {...register("dueDate")} />
              </Field>
            </div>
            <Field>
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue={status}
                onValueChange={(value) =>
                  setValue("status", value as GoalStatus)
                }
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue>
                    {GOAL_STATUS_VALUE_TO_TEXT[selectedStatus] ??
                      "Select status"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
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
