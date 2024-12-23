import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axiosInstance from "@/utils/axios"
import { API_ENDPOINTS } from "@/utils/const/api-endpoints"
import { Trash } from "lucide-react"

interface DeleteApplicationProps {
  applyId: string
  onStatusUpdate?: () => Promise<void>
}

export function DeleteApplication( { applyId ,onStatusUpdate }: DeleteApplicationProps) {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`${API_ENDPOINTS.JOB_STATUS}/${applyId}`)
            if (onStatusUpdate) {
              await onStatusUpdate()
             }
        } catch (error) {
            console.error("Failed to delete application:", error)
        }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Trash className="h-[35px] w-[35px] p-2 bg-red-100 hover:bg-green-200 text-red-500 rounded-full "/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 p-5">
        <DialogHeader>
          <DialogTitle>Delete Application</DialogTitle>
          <DialogDescription className="mt-2">
          Are you sure you want to delete this application? This action cannot be undone and will permanently remove the applicant information.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose>
          <Button type="button" onClick={handleDelete} variant={"destructive"}>Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
