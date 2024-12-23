// components/CustomFileInput.tsx
import React, { useState } from "react";
import { File, Trash } from "lucide-react";
import { SlCloudUpload } from "react-icons/sl";

const CustomFileInput: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  return (
    <div className="flex flex-col items-start space-y-2 ">
      {/* Custom file input container */}
      <div className="relative flex items-center">
        {/* Hidden file input */}
        <input
          id="picture"
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
        />
        {/* Visible button for file selection */}
        <div className=" p-2 border-dashed border-2 border-orange-400 rounded-sm">
          <div className=" text-[50px] flex justify-center text-orange-400">
            <SlCloudUpload />
          </div>
          <div className="w-[80px] m-auto ">
            <button
              type="button"
              className=" text-orange-400 font-bold flex justify-center "
              onClick={() => document.getElementById("picture")?.click()}
            >
              Choose File
            </button>
          </div>
          <p className=" text-center">
            or drag and drop SVG, PNG, JPG or GIF (max, 800 X 800px)
          </p>
        </div>
      </div>

      {/* Display selected file name */}
      {fileName && (
        <div className="text-gray-700 flex w-full justify-between p-2 bg-orange-100">
          <div className="flex gap-1 ">
            <File className="text-[24px] text-orange-400 " />{" "}
            <span className="font-semibold text-black flex items-center ">
              {fileName}
            </span>
          </div>
          <div className="text-red-500">
            <Trash />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
