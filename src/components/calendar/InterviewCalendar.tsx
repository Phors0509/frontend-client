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
import { Button } from "../ui/button";

const localizer = momentLocalizer(moment);

// Custom Toolbar Component
const CustomToolbar = ({ date, view, onNavigate, onView }: any) => {
  const goToBack = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToToday = () => {
    onNavigate("TODAY");
  };

  const handleViewChange = (newView: View) => {
    onView(newView);
  };

  const formattedDate = moment(date).format("MMMM YYYY");

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-[#1e2746] shadow-md rounded-lg ">
      <div className="flex gap-2">
        <Button onClick={goToBack} className="hover:bg-orange-300 hover:text-white ">
          &lt; Prev
        </Button>
        <Button onClick={goToToday} className="hover:bg-orange-300 hover:text-white">
          Today
        </Button>
        <Button onClick={goToNext} className="hover:bg-orange-300 hover:text-white">
          Next &gt;
        </Button>
      </div>
      <div className="text-lg font-bold">{formattedDate}</div>
      <div className="flex gap-2">
        <Button
          onClick={() => handleViewChange("month")}
          className={`hover:bg-orange-300 hover:text-white ${view === "month" ? "bg-orange-400 text-white" : "hover:bg-orange-300 hover:text-white"}`}
        >
          Month
        </Button>
        <Button
          onClick={() => handleViewChange("week")}
          className={`hover:bg-orange-300 hover:text-white ${view === "week" ? "bg-orange-400 text-white" : "hover:bg-orange-300 hover:text-white"}`}
        >
          Week
        </Button>
        <Button
          onClick={() => handleViewChange("day")}
          className={`hover:bg-orange-300 hover:text-white ${view === "day" ? "bg-orange-400 text-white" : ""}`}
        >
          Day
        </Button>
        <Button
          onClick={() => handleViewChange("agenda")}
          className={`hover:bg-orange-300 hover:text-white ${view === "agenda" ? "bg-orange-400 text-white" : ""}`}
        >
          Agenda
        </Button>
      </div>
    </div>
  );
};

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
            // Convert the interviewDate to Cambodia time
            const interviewDateInCambodia = application.companyResponse
              ?.interviewDate
              ? moment(application.companyResponse?.interviewDate).tz(
                  "Asia/Phnom_Penh"
                )
              : undefined;
            return {
              _id: application._id,
              status: application.userInfo?.status,
              title: application.userInfo?.name,
              jobType: application.jobInfo?.position,
              interviewLocation: application.companyResponse?.interviewLocation,
              interviewTime: interviewDateInCambodia?.format("h:mm A"),
              start: application.companyResponse?.interviewDate
                ? new Date(
                    application.companyResponse.interviewDate
                  ).toISOString() // Convert Date to ISO string
                : undefined,
              end: application.companyResponse?.interviewDate
                ? new Date(
                    application.companyResponse.interviewDate
                  ).toISOString() // Convert Date to ISO string
                : undefined,
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

        const convertToCambodiaISO = (utcTime: string): string => {
          const utcDate = new Date(utcTime);

          // Convert to Cambodia timezone (UTC+7)
          const cambodiaTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

          // Return the time in ISO format without milliseconds and 'Z'
          return cambodiaTime.toISOString().split(".")[0]; // Removes milliseconds and 'Z'
        };
        // Example: Creating event objects with dynamic day labels
        const events: InterviewEvent[] = applications.map((apply: any) => {
          const interviewDate = apply.interviewDate
            ? new Date(apply.interviewDate)
            : new Date();

          //covert time in cambo
          const utcTime = apply.start;
          const cambodiaTimeISO = convertToCambodiaISO(utcTime);

          const dayLabel = getDayLabel(interviewDate);
          return {
            _id: apply._id || "",
            title: `${apply.title} - ${getDayLabel(interviewDate)}`,
            start: new Date(cambodiaTimeISO),
            end: new Date(cambodiaTimeISO),
            jobType: apply.jobType,
            interviewDate: apply.interviewDate,
            interviewLocation: apply.interviewLocation,
            interviewTime: apply.interviewTime,
            status: apply.status,
            dayLabel: getDayLabel(interviewDate),
          };
        });
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
    <div className="p-5 calendar-container dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border rounded-[5px] ">
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
        className="rounded-lg shadow-lg dark:text-white"
        components={{ toolbar: CustomToolbar }}
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
