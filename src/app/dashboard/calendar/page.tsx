"use client";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import { useState, useEffect } from "react";

const CalendarPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {
        //ts-ignore
        <InterviewCalendar/>
      }
    </div>
  );
};

export default CalendarPage;