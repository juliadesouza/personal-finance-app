import { formatDate, formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import {
  EllipsisVerticalIcon,
  Calendar,
  SparklesIcon,
  PlusIcon,
} from "lucide-react";
import { ProgressBar } from "../common/ProgressBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { AddSaving } from "./AddSaving";
import { EditGoal } from "./EditGoal";
import { useState } from "react";
import { toast } from "../ui/toast";
import { useGoals } from "@/hooks/use-goals";

type GoalCardProps = {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  left: number;
  saving: number;
  dueDate: string;
};

export function GoalCard({
  id,
  title,
  currentAmount,
  targetAmount,
  progress,
  left,
  saving,
  dueDate,
}: GoalCardProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDepositModal, setOpenDepositModal] = useState(false);

  const { deleteMutation } = useGoals();

  const handleEditModal = () => {
    setOpenEditModal((curr) => !curr);
  };

  const handleDepositModal = () => {
    setOpenDepositModal((curr) => !curr);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          type: "success",
          description: "The goal was deleted.",
        }),
      onError: () =>
        toast.add({
          type: "error",
          description: "The goal could not be deleted.",
        }),
    });
  };

  return (
    <>
      <AddSaving
        id={id}
        open={openDepositModal}
        onOpenChange={handleDepositModal}
      />
      <EditGoal
        id={id}
        title={title}
        currentAmount={currentAmount}
        targetAmount={targetAmount}
        dueDate={dueDate}
        open={openEditModal}
        onOpenChange={handleEditModal}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl">
            {title}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 cursor-pointer"
                  >
                    <EllipsisVerticalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleEditModal}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="size-4" /> {formatDate(dueDate)}
          </CardDescription>
          <CardContent className="mt-4 px-0">
            <div>
              <span className="text-xl font-semibold pr-1">
                {formatCurrency(currentAmount)}
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                / {formatCurrency(targetAmount)}
              </span>
            </div>
            <div>
              <ProgressBar progress={progress} />
              <div className="flex justify-between mt-2 mb-4">
                <span>{formatCurrency(left)} left</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="bg-sidebar rounded-lg p-4">
                <div className="flex gap-2 items-center mb-2">
                  <SparklesIcon className="size-4 text-primary" />
                  <span className="text-primary font-semibold text-xs">
                    MONTHLY SUGGESTION
                  </span>
                </div>
                <p className="text-xs">
                  Save
                  <b className="font-semibold"> {formatCurrency(saving)} </b>
                  per month to reach your goal on time.
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full cursor-pointer"
                onClick={handleDepositModal}
              >
                <PlusIcon />
                Add saving
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
