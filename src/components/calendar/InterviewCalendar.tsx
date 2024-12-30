import React from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
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

      try {
        const response = await axiosInstance.get(
          `${API_ENDPOINTS.JOB_APPLY}?companyId=${user._id}&filter=Interview`
        );

        const applications: JobApplication[] = response.data.data.map(
          (application: JobApplication) => ({
            _id: application._id,
            status: application.userInfo?.status,
            title: application.userInfo?.name,
            jobType: application.jobInfo?.position,
            interviewLocation: application.companyResponse?.interviewLocation,
            interviewDate: application.companyResponse?.interviewDate
              ? new Date(application.companyResponse.interviewDate)
              : undefined,
          })
        );

        const events: InterviewEvent[] = applications.map((apply: any) => ({
          _id: apply._id || "",
          title: apply.title,
          start: apply.interviewDate || new Date(),
          end: apply.interviewDate || new Date(),
          candidateName: apply.candidateName,
          jobType: apply.jobType,
          interviewLocation: apply.interviewLocation,
          status: apply.status,
        }));

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
        components={{
          toolbar: CustomToolbar,
        }}
        className="rounded-lg shadow-lg dark:text-white"
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
