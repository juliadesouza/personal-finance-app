import { CircleDashed, Clock, CircleX, CircleCheck } from "lucide-react";

export const GOAL_STATUS_ICON = {
  NOT_STARTED: CircleDashed,
  IN_PROGRESS: Clock,
  CANCELLED: CircleX,
  COMPLETED: CircleCheck,
} as const;
