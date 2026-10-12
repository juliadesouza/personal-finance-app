import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleSmall, Trash } from "lucide-react";
import React, { cloneElement } from "react";
import AddSetting from "./AddSetting";
import { type AddSettingProps } from "./AddSetting";
import { Skeleton } from "../ui/skeleton";
import { type CategoryData, type PaymentMethodData } from "@/types/setting";
import { Button } from "../ui/button";
interface SettingsCardProps {
  title: string;
  icon: React.ReactNode;
  items: {
    id: string;
    title: string;
    color: string;
  }[];
  type: AddSettingProps["type"];
  isPending: boolean;
  onAdd: (data: CategoryData | PaymentMethodData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function SettingsCard({
  title,
  icon,
  items = [],
  type,
  isPending,
  onAdd,
  onDelete,
}: SettingsCardProps) {
  return (
    <div className="flex flex-col border rounded-lg px-4 pt-4 pb-4">
      <div className="flex items-center justify-between gap-2 border-b pb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-sidebar p-1.5 rounded-md">
            {cloneElement(
              icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
              { className: "size-4.5 text-primary" },
            )}
          </div>
          <h2 className="text-md font-medium">{title}</h2>
        </div>
        <AddSetting type={type} onAdd={onAdd} />
      </div>
      {isPending && (
        <div className="flex flex-col gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton className="h-6" key={idx} />
          ))}
        </div>
      )}
      {!isPending && (
        <Table>
          <TableBody>
            {items.map(({ id, title: name, color }) => (
              <TableRow key={id} className="hover:bg-transparent">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CircleSmall
                      fill={color}
                      color={color}
                      className="size-4"
                    />
                    <span>{name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-end">
                  <Button
                    variant="ghost"
                    className="cursor-pointer h-fit w-fit p-1 m-0 b-1"
                    onClick={() => onDelete(Number(id))}
                  >
                    <Trash className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
