"use client";
import { CalendarSkeleton } from "@/components/calendar/CalendarSkeleton";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CalendarSkeleton />;
  } else {
    return <InterviewCalendar />;
  }
};

export default CalendarPage;
