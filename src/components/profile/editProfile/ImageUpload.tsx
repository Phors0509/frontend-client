import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ImageUploadProps {
  currentImage?: string;
  onFileSelect: (file: File) => void;
}

export function ImageUpload({ currentImage, onFileSelect }: ImageUploadProps) {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    // Validate file size (max 5MB)
    onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Profile Picture
      </label>
      
      {/* Image Preview */}
      {(currentImage ) && (
        <div className='flex justify-center items-center w-full bg-slate-100 rounded-md p-1'>
          <div className="relative w-32 h-32">
            <Image
              src={currentImage}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
              width={200}
              height={200}
              />
        </div>
      </div>
      )}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Upload Your Image</AccordionTrigger>
            <AccordionContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {currentImage ? "Change picture" : "Choose a profile picture"}
                  </span>
                  <span className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </span>
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  );
}
