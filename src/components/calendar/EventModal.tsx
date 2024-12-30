import {
  X,
  Clock4,
  MapPin,
  CalendarHeart,
  User,
  BriefcaseBusiness,
} from "lucide-react";

import { formatEventTime } from "@/utils/calendar-helpers";
import { InterviewEvent } from "@/utils/types/calendar";

interface EventModalProps {
  event: InterviewEvent;
  onClose: () => void;
}

export const EventModal = ({ event, onClose }: EventModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white bg-orange-400 px-1 rounded-md dark:text-white">
            Interview Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-x-2">
            <div className="p-1">
              <User className="h-[20px]" />
            </div>
            <div>
              <label className="block text-[16px] font-medium dark:text-gray-200">
                Candidate Name
              </label>
              <p className="text-gray-900 text-[14px] dark:text-gray-100">
                {event.title}
              </p>
            </div>
          </div>
          {/* Position */}
          <div className="flex items-start gap-x-2">
            <div className="p-1">
              <BriefcaseBusiness className="h-[20px]" />
            </div>
            <div>
              <label className="block text-[16px] font-medium dark:text-gray-200">
                Position
              </label>
              <p className="text-gray-900 text-[14px] dark:text-gray-100">
                {event.jobType}
              </p>
            </div>
          </div>
          {/* Date */}
          <div className="flex items-start gap-x-2">
            <div className="p-1">
              <CalendarHeart className="h-[20px]" />
            </div>
            <div>
              <label className="block text-[16px] font-medium dark:text-gray-200">
                Date
              </label>
              <p className="text-gray-900 text-[14px] dark:text-gray-100">
                {event.interviewDate
                  ? event.interviewDate.toDateString()
                  : "Interview date not set"}
              </p>
            </div>
          </div>
          {/* Location and Interview Time */}
          <div className="flex justify-between">
            {/* Location */}
            <div className="flex items-start gap-x-2">
              <div className="p-1">
                <MapPin className="h-[20px]" />
              </div>
              <div>
                <label className="block text-[16px] font-medium dark:text-gray-200">
                  Location
                </label>
                <p className="text-gray-900 text-[14px] dark:text-gray-100">
                  {event.interviewLocation}
                </p>
              </div>
            </div>

            {/* Interview Time */}
            <div className="flex items-start gap-x-2">
              <div className="p-1">
                <Clock4 className="h-[20px]" />
              </div>
              <div>
                <label className="block text-[16px] font-medium dark:text-gray-200">
                  Interview Time
                </label>
                <p className="text-gray-900 flex gap-1 items-center text-[14px] dark:text-gray-100">
                  {event.start && event.end
                    ? `${formatEventTime(event.start)} - ${formatEventTime(event.end)}`
                    : "Time not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
