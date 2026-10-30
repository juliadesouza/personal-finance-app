import PageHeader from "@/components/common/PageHeader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AddGoal } from "@/components/goals/AddGoal";
import { useGoals } from "@/hooks/use-goals";
import type { Goal } from "@/types/goal";
import { Calendar, EllipsisVerticalIcon, SparklesIcon } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Fragment, useState } from "react";
import { EditGoal } from "@/components/goals/EditGoal";
import { formatDate } from "@/utils/format";
import { AddSaving } from "@/components/goals/AddSaving";

export default function Goals() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDepositModal, setOpenDepositModal] = useState(false);

  const { data: goals, deleteMutation } = useGoals();

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
    <section className="w-full">
      <PageHeader
        title="Goals"
        description="Create financial goals and track your savings."
      />
      <main>
        <div className="flex items-center justify-between mb-8">
          <AddGoal />
        </div>
        <div className="grid grid-cols-4">
          {goals?.map((goal: Goal) => (
            <Fragment key={`goal-group-${goal.id}`}>
              <AddSaving
                id={goal.id}
                open={openDepositModal}
                onOpenChange={handleDepositModal}
              />
              <EditGoal
                id={goal.id}
                title={goal.title}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                dueDate={goal.dueDate}
                open={openEditModal}
                onOpenChange={handleEditModal}
              />
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-xl">
                    {goal.title}
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
                          onClick={handleDepositModal}
                        >
                          Add
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={handleEditModal}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() => handleDelete(goal.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="size-4" /> {formatDate(goal.dueDate)}
                  </CardDescription>
                  <CardContent className="mt-4 px-0">
                    <div>
                      <span className="text-2xl font-bold pr-1">
                        {formatCurrency(goal.currentAmount)}
                      </span>
                      <span className="text-sm text-primary font-semibold">
                        / {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="bg-stone-200 h-3 flex-1 overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, Math.max(0, goal.progress))}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium tabular-nums" />
                      </div>
                      <div className="flex justify-between mt-2 mb-4">
                        <span>{formatCurrency(goal.left)} left</span>
                        <span className="font-bold">{goal.progress}%</span>
                      </div>
                      <div className="bg-sidebar rounded-lg p-4">
                        <div className="flex gap-2 items-center mb-2">
                          <SparklesIcon className="size-5 text-primary" />
                          <span className="text-primary font-semibold text-sm">
                            MONTHLY SUGGESTION
                          </span>
                        </div>
                        <p>
                          Save
                          <b className="font-semibold">
                            {" "}
                            {formatCurrency(goal.saving)}{" "}
                          </b>
                          per month to reach your goal on time.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            </Fragment>
          ))}
        </div>
      </main>
    </section>
  );
}
