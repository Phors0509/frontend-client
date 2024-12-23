import axiosInstance from "@/utils/axios";

export const uploadToS3 = async (file: File): Promise<string | undefined> => {
    console.log("filename calllll upload", file);
    if (!file) {
        return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
        console.log("filename is perform :::::::", formData);
        const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/users/uploadFile`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("response s3 :::::::::::::::::::::::;;;", response.data);
        if (!response) {
            console.log("something wrong with uploading");
        }
        return response.data;
    } catch (err) {
        console.error("Error during file upload:", err);
        throw new Error("File upload failed");
    }
};
