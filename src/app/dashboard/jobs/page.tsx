"use client";
import { useJob } from "@/context/JobContext";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TableSkeleton } from "@/components/applicant/table-skeleton";

const JobsPage = () => {
  const {jobs, isLoading} = useJob();
  return ( 
    <>
      { isLoading ? (<TableSkeleton/>) : ( <DataTable data={jobs || []} columns={columns} /> ) }
    </>
   );
};

export default JobsPage;
