"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/utils/getStatusVariant";
import { ViewApplication } from "@/components/applicant/view-application";
import { UpdateStatus } from "@/components/applicant/update-status";
import { JobApplication, StatusDate } from "@/utils/types/job";
import { DeleteApplication } from "@/components/applicant/delete-application";

export const columns: (
  refetch?: () => Promise<void>
) => ColumnDef<JobApplication>[] = (refetch) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="border-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Profile",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 justify-center">
      <Image
        src={row.original.userInfo?.profile || ""}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
        width={40}
        height={40}
        />
        </div>
    ),
  },
  {
    accessorKey: "userInfo.name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-gray-500 font-bold">
        {row.original.userInfo?.name}
      </div>
    ),
  },
  {
    accessorKey:"jobInfo?.title",
    header: "Job Title",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-gray-500 font-bold">
        {row.original.jobInfo?.title}
      </div>
    ),
  },
  {
    header: "Applied On",
    cell: ({ row }) => (
      <div className="text-gray-700 dark:text-gray-500 font-bold">
        {row.original.appliedAt
          ? new Date(row.original.appliedAt).toLocaleDateString("en-GB")
          : "N/A"}
      </div>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.userInfo?.status as
        | StatusDate["status"]
        | undefined;
      const variant = status ? getStatusVariant(status) : "default";
      return <Badge variant={variant}>{status || "Unknown"}</Badge>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.userId || "";
      return (
        <div className="flex items-center justify-center gap-2">
          <ViewApplication
            application={row.original}
            status={
              (row.original.userInfo?.status as StatusDate["status"]) ||
              undefined
            }
            userId={userId}
          />
          <UpdateStatus
            applyId={row.original._id || ""}
            currentStatus={
              typeof row.original.userInfo?.status === "string"
                ? row.original.userInfo?.status
                : undefined
            }
            onStatusUpdate={refetch}
          />
          <DeleteApplication applyId={row.original._id || ""} onStatusUpdate={refetch}/>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
