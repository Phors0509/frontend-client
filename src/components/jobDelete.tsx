import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { Trash,X } from "lucide-react";
import React from "react";

const JobDelete = ({ jobFromCol, fetchJobs, router }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = async () => {
    if (!jobFromCol._id) {
      alert("Invalid job ID.");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.JOB_ENDPOINT}/${jobFromCol._id}`
      );
      await axiosInstance.delete(
        `${API_ENDPOINTS.APPLY_DELETE_MANY}/${jobFromCol._id}`
      );
      await fetchJobs();
      console.log("Delete Response:", response.data);
      router.push("/dashboard/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete the job. Please try again.");
    } finally {
      setIsOpen(false); // Close the modal after the operation
    }
  };

  return (
    <>
      {/* Trigger button */}
      <Trash
        onClick={() => setIsOpen(true)}
        className="h-[35px] w-[35px] p-2 bg-red-100 hover:bg-green-200 text-red-500 rounded-full "
      />

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b dark:border-gray-300 px-4 py-2 flex justify-between items-center">
              <h2 className="text-lg font-semibold dark:text-black">Confirm Delete</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X/>
              </button>
            </div>
            <div className="p-4 text-[16px] dark:text-black">
              Are you sure you want to delete this job? 
            </div>
            <div className="flex justify-end gap-2  px-4 py-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md dark:text-black hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDelete;
