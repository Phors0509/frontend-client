import Image from "next/image";
import { FilePenLine } from "lucide-react";
import { ApplyDataLengthParams } from "@/utils/types/job";

type JobItem = {
  id: number;
  title: string;
  value: number;
  imageUrl: string;
};

const JobList: React.FC<{
  applyData: ApplyDataLengthParams[];
}> = ({ applyData }) => {
  return (
    <div className="rounded-lg shadow-lg border  p-2">
      {applyData.map((item: ApplyDataLengthParams) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 last:border-none"
        >
          <div className="flex items-center w-2/3 h-[60px] gap-4">
            <Image
              src={item.image}
              alt={item.title}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p className="text-gray-700 dark:text-white font-medium">
              {item.title}
            </p>
          </div>
          <div className="flex items-center justify-between w-1/3 gap-4">
            <p className="text-gray-500 dark:text-white">{item.length}</p>
            <button>
              <FilePenLine className="w-5 h-5 text-gray-400 dark:text-white hover:text-gray-600 transition-colors" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
