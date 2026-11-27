import { formatDate, formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon, Calendar, SparklesIcon } from "lucide-react";
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
import { EditGoal } from "./EditGoal";
import { useState, type CSSProperties } from "react";
import { toast } from "../ui/toast";
import { useGoals } from "@/hooks/use-goals";
import { Skeleton } from "../ui/skeleton";
import type { GoalStatus } from "@/types/goal";

const GOAL_STATUS: Record<string, CSSProperties> = {
  NOT_STARTED: { borderColor: "var(--warning)" },
  IN_PROGRESS: { borderColor: "var(--success)" },
  CANCELLED: { borderColor: "var(--destructive)" },
  COMPLETED: { borderColor: "#8055c7" },
};

interface GoalCardProps {
  id: number;
  title: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  left: number;
  saving: number;
  startDate: string;
  dueDate: string;
  isLoading?: boolean;
  status: GoalStatus;
}

export function LoadingGoalCard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-xl">
            <Skeleton className="h-4 flex-1" />
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <Calendar className="size-4" /> <Skeleton className="h-4 w-24" />
          </CardDescription>
          <CardContent className="mt-4 px-0">
            <div className="mt-8">
              <span className="text-xl font-semibold pr-1">
                <Skeleton className="h-4 flex-1" />
              </span>
            </div>
            <div>
              <div className="flex justify-between mt-2 mb-4">
                <Skeleton className="h-4 w-50" />
                <Skeleton className="h-4 w-25" />
              </div>
              <div className="bg-sidebar rounded-lg p-4">
                <div className="flex gap-2 items-center mb-2">
                  <SparklesIcon className="size-4 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
export function GoalCard({
  id,
  title,
  currentAmount,
  targetAmount,
  progress,
  left,
  saving,
  startDate,
  dueDate,
  status,
}: GoalCardProps) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const style = GOAL_STATUS[status];

  const { deleteGoal } = useGoals();

  const handleEditModal = () => {
    setOpenEditModal((curr) => !curr);
  };

  const handleDelete = (id: number) => {
    deleteGoal.mutate(id, {
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
      <EditGoal
        id={id}
        title={title}
        currentAmount={currentAmount}
        targetAmount={targetAmount}
        startDate={startDate}
        dueDate={dueDate}
        open={openEditModal}
        onOpenChange={handleEditModal}
        status={status}
      />
      <Card className="relative">
        <CardHeader>
          <hr
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 rounded-full w-30"
            style={style}
          />
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
                {formatCurrency(currentAmount) ?? 0}
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                / {formatCurrency(targetAmount) ?? 0}
              </span>
            </div>
            <div>
              <ProgressBar progress={progress ?? 0} />
              <div className="flex justify-between mt-2 mb-4">
                <span>{formatCurrency(left) ?? 0} left</span>
                <span className="font-bold">{progress ?? 0}%</span>
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
                  <b className="font-semibold">{formatCurrency(saving) ?? 0}</b>
                  per month to reach your goal on time.
                </p>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
