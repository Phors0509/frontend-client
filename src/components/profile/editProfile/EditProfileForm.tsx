import React, { useState } from 'react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { LocationSection } from './LocationSection';
import { SocialLinksSection } from './SocialLinksSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageUpload } from './ImageUpload';
import { uploadToS3 } from '@/services/upload.service';
import { BioSection } from './BioSection';
import { ProfileData } from '@/utils/types/profile';
interface EditProfileFormProps {
  initialData?: ProfileData;
  onSubmit: (data: ProfileData) => void;
}

export function EditProfileForm({ initialData, onSubmit }: EditProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData | null>(initialData || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profile: previewUrl
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData) return;
      let profileUrl = formData.profile;
      if (selectedFile) {
        const uploadResult = await uploadToS3(selectedFile);
        if (uploadResult) {
          profileUrl = uploadResult;
        }
      }
      await onSubmit({
        ...formData,
        profile: profileUrl,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className='h-screen'>
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Personal Information</h2>
      <div className="space-y-8 ">
        <PersonalInfoSection 
          formData={formData} 
          onChange={handleInputChange}
        />

        <BioSection description={formData?.description} onChange={handleDescriptionChange} />

          <LocationSection
            location={formData?.location}
            onChange={(location) => setFormData((prev) => ({ ...prev, location })) }
          />

          <SocialLinksSection
            socialLinks={formData?.social_links}
            contact={formData?.contact}
            onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
          />

          <ImageUpload currentImage={formData?.profile} onFileSelect={handleFileSelect} />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </ScrollArea>
  );
}
