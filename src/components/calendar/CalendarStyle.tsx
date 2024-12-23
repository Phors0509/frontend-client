import { InterviewEvent } from "@/utils/types/calendar";

export const eventStyleGetter = (event: InterviewEvent) => {
  const date = event.start ? new Date(event.start) : new Date(); 
  const dayOfWeek = date.getDay(); 

  // Define a color map for days of the week
  const dayColors = [
    "#FF9800", // Sunday (orange)
    "#2196F3", // Monday (blue)
    "#4CAF50", // Tuesday (green)
    "#FFC107", // Wednesday (amber)
    "#8965E5", // Thursday (purple)
    "#00A1FF", // Friday 
    "#00CEB6", // Saturday (cyan)
  ];
  return {
    style: {
      backgroundColor: dayColors[dayOfWeek],
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0",
      fontSize:"14px",
      display: "block",
    },
  };
};
