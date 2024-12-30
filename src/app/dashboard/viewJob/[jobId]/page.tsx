"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { JobDetails, JobTechnicalDetail } from "@/utils/types/job"; // Import the JobDetails type
import { JobHeader } from "@/components/jobview/JobHeader";
import { JobOverview } from "@/components/jobview/JobOverview";
import { JobDescription } from "@/components/jobview/JobDescription";
import { JobDetail } from "@/components/jobview/JobDetails";
import { JobViewSkeleton } from "@/components/jobview/jobViewSkeleton";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
const MyJobComponent = ({ params }: { params: { jobId: string } }) => {
  const [jobDetails, setJobDetails] = useState<JobDetails[]>([]);
  const [jobData, setJobData] = useState<JobTechnicalDetail | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch job details from API
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.JOB_ENDPOINT}/${params.jobId}`
        );

        // Access the 'data' object
        const data = response.data.data;

        console.log("Fetched Data:", data);

        // Map only the required fields into the JobDetails array
        const formattedDetails: JobDetails[] = [
          { label: "Job Title", value: data?.title || "N/A" },
          { label: "job_opening", value: data?.job_opening || "N/A" },
          { label: "Job Type",  value: data?.type?.length > 1 
            ? <span className="p-2">{data?.type.join(",")}</span> 
            : data?.type || "N/A" },
          { label: "Posted Date", value: formatDate(data?.createdAt) || "N/A" },
          {
            label: "Last Apply Date",
            value: formatDate(data?.updatedAt) || "N/A",
          },
          { label: "Closed Date", value: formatDate(data?.deadline) || "N/A" },
        ];
        setJobDetails(formattedDetails);

        const formattedJobData: JobTechnicalDetail = {
          jobRole: data?.position || "N/A",
          minSalary: data?.min_salary || "N/A",
          maxSalary: data?.max_salary || "N/A",
          locality: data?.location || "N/A",
          benefit: data?.benefit || "N/A",
          company: data?.company || "N/A",
          jobId: data?._id || "N/A",
        };
        setJobData(formattedJobData);
        console.log("ffsf", formattedJobData);

        const jobDesc: any = {
          job_description: data?.description || "N/A",
        };

        // Update job description state
        setJobDescription(jobDesc.job_description);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.jobId]);

  if (isLoading) {
    return <JobViewSkeleton />;
  }
  return (
    <div className="py-6">
      <div className="flex flex-col gap-3 sm:flex-col sm:gap-6 xl:flex-row xl:gap-6">
        <div className="w-full xl:w-1/3 space-y-6 text-[16px]">
          <JobOverview details={jobDetails} />
        </div>
        <div className="w-full bg-white text-[16px] rounded-lg mb-2 shadow-md xl:w-2/3 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border">
          <JobDescription job_description={jobDescription} profile="" />
          <JobDetail details={jobData} />
        </div>
      </div>
    </div>
  );
};

export default MyJobComponent;
