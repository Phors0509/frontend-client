/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Jobs } from "@/utils/types/form-type";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useJob } from "@/context/JobContext";
import JobDelete from "@/components/jobDelete";

export const columns: ColumnDef<Jobs>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div
          className="
        text-gray-500 font-bold"
        >
          {row.original.title || "No Title Available"}
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const positions = row.original.position;
      return (
        <>
          <div
            className="
          text-gray-500 font-bold"
          >
            {positions && positions.length > 0
              ? positions.join(", ")
              : "No types available"}{" "}
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Posted Date",
    cell: ({ row }) => {
      return (
        <div
          className="
        text-gray-500 font-bold"
        >
          {row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <div>Job Type</div>;
    },
    cell: ({ getValue }) => {
      const jobTypes = getValue<string[]>();
      return (
        <div
          className="
        text-gray-500 font-bold"
        >
          {jobTypes?.map((type, index) => <div key={index}>{type}</div>)}
        </div>
      );
    },
  },

  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ getValue }) => {
      const deadlineAt = getValue<string>();
      const formatDate = (isoDataString: string) => {
        const date = new Date(isoDataString);
        return date.toISOString().slice(0, 10);
      };
      return (
        <div
          className="
        text-gray-500 font-bold"
        >
          {formatDate(deadlineAt)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobFromCol = row.original;
      const { fetchJobs } = useJob();
      const router = useRouter();
      return (
        <>
          <div className="flex gap-2 ">
            <Eye
              onClick={() => {
                router.push(`/dashboard/viewJob/${jobFromCol._id}`);
              }}
              className=" h-[35px] w-[35px] p-2 bg-green-100 hover:bg-green-200 text-green-500 rounded-full "
            />
            <SquarePen
              className=" h-[35px] w-[35px] p-2 bg-green-100 hover:bg-green-200 text-green-900 rounded-full"
              onClick={() => {
                router.push(`/dashboard/update/${jobFromCol._id}`);
              }}
            />
            <JobDelete
              jobFromCol={jobFromCol}
              fetchJobs={fetchJobs}
              router={router}
            ></JobDelete>
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
