import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { JobApplication, StatusDate } from "@/utils/types/job";
import { getStatusVariant } from "@/utils/getStatusVariant";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { UserDetail } from "@/utils/types/user-profile";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import axiosInstance from "@/utils/axios";
import { BasicInfoSection } from "./basic-info";
import { DescriptionsSection } from "./descriptions";
import { SkillsExpertiseSection } from "./skills-expertise";
import { EducationExperienceSection } from "./education-experience";
import { LanguagesReferencesSection } from "./languages-references";
import { PortfolioCertificatesSection } from "./portfolio-certificates";

interface ViewApplicationProps {
  application: JobApplication;
  status: StatusDate["status"];
  userId: string;
}

export function ViewApplication({
  application,
  status,
  userId,
}: ViewApplicationProps) {
  const variant = status ? getStatusVariant(status) : "default";
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const fetchUserDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.USER_DETAIL}/${userId}`
      );
      const data = await response.data.data;
      setUserDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMostRecentStatus = () => {
    if (!application.statusDate) return null;
  
    const statuses = Object.entries(application.statusDate);
    if (statuses.length === 0) return null;
  
    const sortedStatuses = statuses.sort(
      (a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime()
    );
  
    return {
      status: sortedStatuses[0][0],
      timestamp: sortedStatuses[0][1],
    };
  };
  
  const mostRecentStatus = getMostRecentStatus();
  const getDateForDisplay = () => {
    if (!mostRecentStatus) return null;
  
    const status = mostRecentStatus.status;
    if (["Apply", "Review", "Shortlist"].includes(status)) {
      // @ts-ignore
      return new Date(application.statusDate[status]).toLocaleDateString("en-GB");
    } else if (["Accept", "Interview"].includes(status)) {
      const date =
        status === "Accept"
          ? application.companyResponse?.startDate
          : application.companyResponse?.interviewDate;
  
      return date ? new Date(date).toLocaleDateString("en-GB") : null;
    }
    return null;
  };
  
  const displayDate = getDateForDisplay();
  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Eye className=" h-[35px] w-[35px] p-2 bg-green-100 hover:bg-green-200 text-green-500 rounded-full " />
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-slate-50 h-full overflow-y-auto dark:bg-[#181f39] dark:border-gray-700 dark:shadow-md border">
        <ScrollArea>
          <DialogHeader className="py-5">
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View applicant information and CV
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info" className={""}>
                Applicant Info
              </TabsTrigger>
              <TabsTrigger value="cv">CV</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="h-full overscroll-y-auto">
              <div className="space-y-2">
                <Card>
                  <CardHeader className="flex gap-4 p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                      <h4 className="text-sm font-medium mb-1">
                        {mostRecentStatus?.status} at {displayDate || "N/A"}
                      </h4>
                      </div>
                      <div className="">
                        <Badge variant={variant}>{status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex gap-4 p-5 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-md">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={application?.userInfo?.profile || ""}
                          alt={application?.userInfo?.profile || ""}
                          className={"w-20 h-20 rounded-full object-fill"}
                          width={100}
                          height={100}
                        />
                        <div className="flex flex-col">
                          <CardTitle>
                            {userDetail?.basic?.name}{" "}
                            {/* {userDetail?.basic?.lastname} */}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <BasicInfoSection basic={userDetail?.basic} />

                <DescriptionsSection descriptions={userDetail?.descriptions} />

                <SkillsExpertiseSection
                  skills={userDetail?.skills}
                  expertise={userDetail?.expertise}
                />
                <EducationExperienceSection
                  educations={userDetail?.educations}
                  experiences={userDetail?.experiences}
                />
                <LanguagesReferencesSection
                  languages={userDetail?.languages}
                  references={userDetail?.references}
                />
                <PortfolioCertificatesSection
                  portfolio={userDetail?.portfolio}
                  certificates={userDetail?.certificates}
                />
              </div>
            </TabsContent>
            <TabsContent value="cv">
              <Card className="relative">
                <CardContent className="pt-6  ">
                  <ScrollArea className="h-full w-full rounded-md border p-4">
                    <iframe
                      src={application?.userInfo?.cv || ""}
                      className="w-full h-screen"
                      title={`${application?.userInfo?.name}'s CV`}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
