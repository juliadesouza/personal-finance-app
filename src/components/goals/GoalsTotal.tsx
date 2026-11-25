import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GOAL_STATUS_VALUE_TO_TEXT, type GoalStatus } from "@/types/goal";
import { GOAL_STATUS_ICON } from "./GoalStatus";
import { Skeleton } from "../ui/skeleton";

type Item = {
  status: GoalStatus;
  amount: number;
};

type GoalTotalProps = {
  items: Item[];
  isLoading: boolean;
};

const GOAL_STATUS_ICON_CLASSES = {
  NOT_STARTED: "size-5 text-warning",
  IN_PROGRESS: "size-5 text-success",
  CANCELLED: "size-5 text-destructive",
  COMPLETED: "size-5 text-[#8055c7]",
} as const;

const GOAL_STATUS_CIRCLE = {
  NOT_STARTED: "p-1  bg-[#fff0d6] rounded-full",
  IN_PROGRESS: "p-1 bg-[#e2f0e4]  rounded-full",
  CANCELLED: "p-1 bg-[#fce5e5]  rounded-full",
  COMPLETED: "p-1 bg-[#eee5fa]  rounded-full",
} as const;

const GOAL_STATUS_TEXT = {
  NOT_STARTED: "text-warning font-medium",
  IN_PROGRESS: "text-success font-medium",
  CANCELLED: "text-destructive font-medium",
  COMPLETED: "text-[#8055c7] font-medium",
} as const;

export function GoalsTotal({ items, isLoading }: GoalTotalProps) {
  const total = items.reduce((acc: number, curr: Item) => acc + curr.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total goals</CardTitle>
        <CardDescription className="text-2xl font-semibold text-black mt-4">
          {isLoading ? <Skeleton className="h-4 w-25" /> : total}
        </CardDescription>
        <CardContent className="grid grid-cols-2 p-0 mt-4">
          {!isLoading &&
            items.map((item: Item) => {
              const StatusIcon = GOAL_STATUS_ICON[item.status];
              const iconClassname = GOAL_STATUS_ICON_CLASSES[item.status];
              const circleClassname = GOAL_STATUS_CIRCLE[item.status];
              const textClassname = GOAL_STATUS_TEXT[item.status];

              return (
                <div className="flex items-center gap-3 border rounded-full p-1">
                  <div className={circleClassname}>
                    <StatusIcon className={iconClassname} />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={textClassname}>
                      {GOAL_STATUS_VALUE_TO_TEXT[item.status]}
                    </span>
                    <span className="text-md font-semibold text-black">
                      {item.amount}
                    </span>
                  </div>
                </div>
              );
            })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
