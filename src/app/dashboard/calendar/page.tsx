"use client";
import { CalendarSkeleton } from "@/components/calendar/CalendarSkeleton";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import { useAuth } from "@/context/AuthContext";

const CalendarPage = () => {
  const {isLoading} =useAuth()

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return <div>{<InterviewCalendar />}</div>;
};

export default CalendarPage;
