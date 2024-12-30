"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { TableSkeleton } from "@/components/applicant/table-skeleton";
import { IJob, JobApplication } from "@/utils/types/job";

const ApplicantPage = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobApplications = async () => {
    try {
      setIsLoading(true);
      const jobsResponse = await axiosInstance.get<{ data: IJob[] }>(
        API_ENDPOINTS.JOBS
      );
      const fetchedJobs = jobsResponse.data.data;

      const applicationsPromises = fetchedJobs.map((job) =>
        axiosInstance
          .get<{
            data: JobApplication[];
          }>(`${API_ENDPOINTS.JOB_APPLY}?jobId=${job._id}`)
          .then((response) =>
            response.data.data.map((application) => ({ ...application }))
          )
      );

      const applicationsResponses = await Promise.all(applicationsPromises);
      const allApplications = applicationsResponses.flat();

      setJobApplications(allApplications);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      setError("Failed to load job applications");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJobApplications();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={jobApplications}
          columns={columns(fetchJobApplications)}
        />
      )}
    </>
  );
};

export default ApplicantPage;
