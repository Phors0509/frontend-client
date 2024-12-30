import { Badge } from "@/components/ui/badge";
import { JobTechnicalDetail } from "@/utils/types/job";

interface JobDetailsProps {
  details: JobTechnicalDetail | null;
}

export const JobDetail: React.FC<JobDetailsProps> = ({ details }) => {
  if (!details) {
    return <div className="text-gray-500">Job details not available.</div>;
  }

  const DetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | string[] | object | null | undefined;
  }) => (
    <div className="grid grid-cols-2 gap-4">
      <span className="text-gray-600 dark:text-gray-200">{label} :</span>
      <span className="text-gray-900 dark:text-gray-400">
        {typeof value === "object" && !Array.isArray(value)
          ? JSON.stringify(value) // Safely render objects as a string
          : Array.isArray(value)
          ? value.map((item, i) => (
              <Badge key={i} variant="orange">
                {item}
              </Badge>
            ))
          : value || "N/A"} 
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
        <Badge variant={"orange"}>Job ID: {details.jobId}</Badge>
      </div>
    </div>
  );
};
