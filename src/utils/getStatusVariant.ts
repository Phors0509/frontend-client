import { StatusDate } from "./types/job";

export function getStatusVariant(
  status: StatusDate["status"]
): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" {
  switch (status) {
    case "Apply":
      return "default";
    case "Review":
      return "secondary";
    case "Interview":
      return "warning";
    case "Accept":
      return "success";
    default:
      return "default";
  }
}
