"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { Jobs } from "@/utils/types/form-type";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import JobForm from "@/components/jobs/job-form";
import JobFormSkeleton from "@/components/jobs/JobFormSkeleton";

const UpdateJobPage = ({ params }: { params: { jobId: string } }) => {
  const [jobData, setJobData] = useState<Jobs>();
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.JOB_ENDPOINT}/${params.jobId}`
        );
        setJobData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? ( <JobFormSkeleton/> ) : ( <JobForm formTitle="Update Job" existingData={jobData} typeOfForm="PUT" /> )}
    </>
  );
};

export default UpdateJobPage;
