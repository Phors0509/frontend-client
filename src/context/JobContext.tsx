"use client";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext<any | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const fetchJobs = async () => {
        try {
            console.log("JOB JOB JOB ")
        setIsLoading(true);
        const res = await axiosInstance.get(`${API_ENDPOINTS.JOBS}`);
        setJobs(res.data.data);
        } catch (error) {
        console.error("Fetch jobs failed:", error);
        } finally {
        setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchJobs();
    }, []);
    
    return (
        <JobContext.Provider value={{ jobs, isLoading, fetchJobs }}>
        {children}
        </JobContext.Provider>
    );
}

export const useJob = () => {
    const context = useContext(JobContext);
    if (context === undefined) {
        throw new Error("useJob must be used within a JobProvider");
    }
    return context;
};