import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PencilIcon, SquarePen } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import axiosInstance from "@/utils/axios"
import { API_ENDPOINTS } from "@/utils/const/api-endpoints"

interface UpdateStatusProps {
  applyId: string
  currentStatus?: string
  onStatusUpdate?: () => Promise<void> 
}

type Status = "Apply" | "Review" | "Interview" | "Shortlist" | "Accept"

export function UpdateStatus({ applyId, currentStatus ,onStatusUpdate }: UpdateStatusProps) {
  const [status, setStatus] = useState<Status>(currentStatus as Status)
  const [startDate, setStartDate] = useState<Date>()
  const [interviewDate, setInterviewDate] = useState<Date>() 
  const [interviewLocation, setInterviewLocation] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async () => {
    try {
        const response = await axiosInstance.put(`${API_ENDPOINTS.JOB_STATUS}/${applyId}`, {
            status: status,
            startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
            interviewDate: interviewDate ? format(interviewDate, "yyyy-MM-dd") : undefined,
            interviewLocation,
          })
      if (response) {
        setIsOpen(false)
        if (onStatusUpdate) {
         await onStatusUpdate()
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <SquarePen className=" h-[35px] w-[35px] p-2 bg-green-100 hover:bg-green-200 text-green-900 rounded-full"/>
      </DialogTrigger>
      <DialogContent className="bg-slate-50">
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apply">Apply</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Shortlist">Shortlist</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Accept">Accept</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {status === "Interview" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !interviewDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {interviewDate ? format(interviewDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={interviewDate}
                      onSelect={setInterviewDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Location</label>
                <Input
                  placeholder="Enter interview location"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                />
              </div>
            </>
          )}

          {status === "Accept" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white" onClick={handleSubmit}>
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}