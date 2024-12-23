"use client";

import { Calendar, momentLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";
import { EventModal } from "./EventModal";
import { InterviewEvent } from "@/utils/types/calendar";
import { eventStyleGetter } from "./CalendarStyle";
import { JobApplication } from "@/utils/types/job";

const localizer = momentLocalizer(moment);

const InterviewCalendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(
    null
  );
  const [currentView, setCurrentView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<InterviewEvent[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!user?._id) return;
      console.log("user id:", user._id);
      try {
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.JOB_APPLY}?companyId=${user._id}&filter=Interview`
        );
        const applications: JobApplication[] = response.data.data.map(
          (application: JobApplication) => {
            return {
              _id: application._id,
              status: application.userInfo?.status,
              title: application.userInfo?.name,
              jobType: application.jobInfo?.position,
              interviewLocation: application.companyResponse?.interviewLocation,
              interviewDate: application.companyResponse?.interviewDate
                ? new Date(
                    application.companyResponse.interviewDate
                  ).toISOString() // Convert Date to ISO string
                : undefined,
              // Add more transformations or mappings here
            };
          }
        );
        // Function to generate the label for a given day relative to the current date
        const getDayLabel = (date: Date): string => {
          const currentDate = new Date();
          // Normalize times to ignore time differences and focus on dates
          currentDate.setHours(0, 0, 0, 0);
          date.setHours(0, 0, 0, 0);

          const diffTime = date.getTime() - currentDate.getTime(); // Time difference in milliseconds
          const diffDays = Math.round(diffTime / (1000 * 3600 * 24)); // Convert time difference to days

          if (diffDays === 0) {
            return "Today";
          } else if (diffDays === 1) {
            return "Tomorrow";
          } else if (diffDays === -1) {
            return "Yesterday";
          } else if (diffDays > 0) {
            return `${diffDays} days from today`; // Future dates
          } else {
            return `${Math.abs(diffDays)} days ago`; // Past dates
          }
        };
        // Example: Creating event objects with dynamic day labels
        const events: InterviewEvent[] = applications.map((apply: any) => {
          const interviewDate = apply.interviewDate
            ? new Date(apply.interviewDate)
            : new Date();

          // Generate the dynamic label based on the days from the current date
          const dayLabel = getDayLabel(interviewDate);

          return {
            _id: apply._id || "",
            title: `${apply.title} - ${dayLabel}`,
            start: apply.interviewDate,
            end: apply.interviewDate
              ? new Date(apply.interviewDate)
              : new Date(),
            candidateName: apply.candidateName,
            jobType: apply.jobType,
            interviewDate: apply.interviewDate,
            interviewLocation: apply.interviewLocation,
            status: apply.status,
            dayLabel,
          };
        });
        console.log("user:", events);
        setEvents(events);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, [user?._id]);

  const handleSelectEvent = (event: InterviewEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  
  return (
    <div className="calendar-container dark:bg-gray-900 p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        className="dark:text-white  rounded-lg shadow-lg"
      />

      {showModal && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default InterviewCalendar;
