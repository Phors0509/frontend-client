"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { Jobs } from "@/utils/types/form-type";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import JobForm from "@/components/jobs/job-form";

const UpdateJobPage = ({ params }: { params: { jobId: string } }) => {
  const [jobData, setJobData] = useState<Jobs>();
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("Fetching job data for Job ID:", params.jobId); // Log the jobId
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.JOB_ENDPOINT}/${params.jobId}`
        );
        setJobData(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!isLoading && (
        <JobForm formTitle="Update Job" existingData={jobData} typeOfForm="PUT" />
      )}
    </>
  );
};

export default UpdateJobPage;
