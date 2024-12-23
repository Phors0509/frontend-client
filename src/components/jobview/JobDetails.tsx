import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobTechnicalDetail } from "@/utils/types/job";
import { Share2, Printer } from "lucide-react";

interface JobDetailsProps {
  details: JobTechnicalDetail | null;
}

export const JobDetail: React.FC<JobDetailsProps> = ({ details }) => {
  // Fallback UI if details is null
  if (!details) {
    return <div className="text-gray-500">Job details not available.</div>;
  }

  // Updated DetailRow to handle different data types
  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | string[] | object | null | undefined;
  }) => (
    <div className="grid grid-cols-2 gap-4">
      <span className="text-gray-600">{label} :</span>
      <span className="text-gray-900">
        {typeof value === "object" && !Array.isArray(value)
          ? JSON.stringify(value) // Safely render objects as a string
          : Array.isArray(value)
          ? value.map((item, i) => (
              <Badge key={i} variant="orange">
                {item}
              </Badge>
            ))
          : value || "N/A"} {/* Display "N/A" for null or undefined */}
      </span>
    </div>
  );

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-xl font-semibold">Job Details</h2>
      </div>

      {/* Job Details */}
      <div className="space-y-2 px-6">
        <DetailRow label="Job Role" value={details.jobRole} />
        <DetailRow label="Min Salary" value={details.minSalary} />
        <DetailRow label="Max Salary" value={details.maxSalary} />
        <DetailRow label="Locality" value={details.locality} />
        {/* <DetailRow label="Company Name" value={details.company?.name} />
        <DetailRow
          label="Company Contact"
          value={details.company?.contact || "N/A"}
        /> */}
      </div>

      {/* Footer */}
      <div className="mt-4 p-4 border-t  px-6 border-gray-200">
        <span className="text-sm text-white bg-orange-400 p-1 rounded-md ">Job ID: {details.jobId}</span>
      </div>
    </div>
  );
};
