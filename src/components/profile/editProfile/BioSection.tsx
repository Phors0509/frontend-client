import React from 'react';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

interface BioSectionProps {
  description?: string;
  onChange: (description: string) => void;
}

export function BioSection({ description, onChange }: BioSectionProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        Bio
      </label>
      <RichTextEditor
        content={description ?? ''}
        onChange={onChange}
      />
    </div>
  );
}