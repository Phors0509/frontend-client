"use client";
import ChartComponent from "@/components/chart";
import PieChartComponent from "@/components/pie-chart";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { RiMailVolumeLine, RiPassValidLine } from "react-icons/ri";
import JobList from "@/components/jobList";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useAuth } from "@/context/AuthContext";
import { ApplyDataLengthParams, IJob } from "@/utils/types/job";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
const arrOfMonth: string[] = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const defaultMonthly = [
  { month: "Jan", count: 0 },
  { month: "Feb", count: 0 },
  { month: "Mar", count: 0 },
  { month: "Apr", count: 0 },
  { month: "May", count: 0 },
  { month: "Jun", count: 0 },
  { month: "Jul", count: 0 },
  { month: "Aug", count: 0 },
  { month: "Sep", count: 0 },
  { month: "Oct", count: 0 },
  { month: "Nov", count: 0 },
  { month: "Dec", count: 0 },
];
export interface ApplyMonthlyParams {
  [key: string]: string | number;
}

//=====for get month with number of monnth
const getMonth = (month: string): string => {
  const date = new Date(2024, parseInt(month) - 1, 1);
  return date.toLocaleString("default", { month: "short" });
};
//====function for generate diff color for diagram
const generateColors = (count: number): string[] => {
  const colors = [];
  const hueStep = Math.floor(360 / count); // Divide the 360-degree color wheel evenly
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${i * hueStep}, 70%, 50%)`); // Adjust saturation and lightness as needed
  }
  return colors;
};
const Chart = () => {
  const { user } = useAuth();
  const [length, setLength] = useState<{
    applicant: number;
    interview: number;
    pass: number;
  }>({ applicant: 0, interview: 0, pass: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [applyData, setApplyData] = useState<ApplyDataLengthParams[]>([]);
  const [applyMonthly, setApplyMontly] =
    useState<ApplyMonthlyParams[]>(defaultMonthly);
  const [colors, setColors] = useState<string[]>([]);
  async function fetchLength() {
    try {
      const jobResponse = await axiosInstance.get(`${API_ENDPOINTS.JOBS}`);
      const jobs = jobResponse.data.data;
      const lengthRes: {
        data: { Apply: number; Interview: number; Accept: number };
      } = await axiosInstance.get(
        `${API_ENDPOINTS.JOB_APPLY_LENGTH}?id={"companyId":"${user?._id}"}&filter={"userInfo.status":["Apply","Interview","Accept"]}`
      );
      setLength({
        applicant: lengthRes.data.Apply,
        interview: lengthRes.data.Interview,
        pass: lengthRes.data.Accept,
      });
      const jobIdArr = jobs.map((job: IJob) => job._id);

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.JOB_APPLY_LENGTH}?filter=${encodeURIComponent(
          JSON.stringify({ jobId: jobIdArr })
        )}`
      );
      let jobArr = jobs.map((job: IJob) => ({
        title: job.title,
        image: user?.profile,
        id: job._id,
        length: 0,
      }));
      jobArr = jobArr.map((job: ApplyDataLengthParams) => ({
        ...job,
        length: response.data[job.id],
      }));
      jobArr.sort(
        (a: ApplyDataLengthParams, b: ApplyDataLengthParams) =>
          b.length - a.length
      );
      setApplyData(jobArr);
      const responseMonthly = await axiosInstance.get(
        `${API_ENDPOINTS.JOB_APPLY_LENGTH}?id=${encodeURIComponent(
          JSON.stringify({ jobId: jobIdArr })
        )}&filter=${encodeURIComponent(
          JSON.stringify({ appliedAt: arrOfMonth })
        )}`
      );
      const jobTitleMap: { [key: string]: string } = {};
      jobs.forEach((job: IJob) => {
        jobTitleMap[job._id!] = job.title!;
      });
      const monthlyArr: ApplyMonthlyParams[] = [];
      for (let i = 1; i <= 12; i++) {
        const stringIndex: string = i.toString().padStart(2, "0");
        monthlyArr.push({
          month: getMonth(stringIndex),
        });
        jobIdArr.forEach((jobId: string) => {
          monthlyArr[i - 1][jobTitleMap[jobId]] = responseMonthly.data[jobId][
            stringIndex
          ]
            ? responseMonthly.data[jobId][stringIndex]
            : 0;
        });
      }
      setApplyMontly(monthlyArr);
      setColors(generateColors(Object.keys(monthlyArr[0]).length));
    } catch (err) {
      console.log("error:::", err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    user?._id && fetchLength();
    //eslint-disable-next-line
  }, [user?._id]);
  return (
    <>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="flex w-full float-right gap-6 mt-[31px] ">
          <div className="w-2/3">
            <div className="flex flex-col w-full float-right h-auto gap-[32px]">
              {/*cover three of card */}
              <div className="flex w-full h-[130px] 2xl:h-[180px] gap-[20px] ">
                <Card className="w-1/3 flex flex-col rounded-[5px] bg-green-200 justify-center dark:text-black p-[10px]">
                  <User className="w-[23px] h-[23px] text-blue-400" />
                  <span className="text-[21px] font-bold">
                    {length.applicant}
                  </span>
                  <div className="text-[13px] text-gray-500">Apply</div>
                </Card>
                <Card className="w-1/3 flex flex-col rounded-[5px] bg-orange-100 justify-center dark:text-black p-[10px]">
                  <RiMailVolumeLine className="w-[23px] h-[23px] text-blue-400" />
                  <span className="text-[21px] font-bold">
                    {length.interview}
                  </span>
                  <div className="text-[13px] text-gray-500">interview</div>
                </Card>
                <Card className="w-1/3 flex flex-col rounded-[5px] bg-pink-100 justify-center dark:text-black p-[10px]">
                  <RiPassValidLine className="w-[23px] h-[23px] text-blue-400" />
                  <span className="text-[21px] font-bold">{length.pass}</span>
                  <div className="text-[13px] text-gray-500">Passed</div>
                </Card>
              </div>
              <div className="w-full flex flex-col gap-[32px] ">
                <div className="w-full">
                  <ChartComponent applyMonthly={applyMonthly} colors={colors} />
                </div>
                <div className="w-full ">
                  <JobList applyData={applyData} />
                </div>
              </div>
            </div>
          </div>
          {/* cover chart  and pieChart*/}
          <div className="flex flex-col w-1/3 gap-[32px]">
            <div className="w-full">
              <Card className="flex relative h-[130px] items-center bg-blue-500 px-[17px] rounded-lg overflow-hidden w-full max-w-xl">
                <div className="text-white">
                  <h2 className="text-[16px] font-bold">
                    Most <br /> Applied Job
                  </h2>
                  <p className="mt-2 text-[12px ]">
                    {applyData[0] ? applyData[0].title : "Default"}
                  </p>
                </div>
                <div
                  className="bg-[rgba(255,174,22,1)] w-[calc(50%-10px)] h-full absolute right-0"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)",
                  }}
                ></div>
              </Card>
            </div>
            <div className="">
              <PieChartComponent applyData={applyData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Chart;
