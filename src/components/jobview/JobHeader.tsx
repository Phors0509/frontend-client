import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export const JobHeader: React.FC = () => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900">Job View</h1>
    {/* <div className="flex gap-2">
      <Button variant="outline" className="bg-teal-700 text-white hover:bg-teal-800">
        <Mail className="mr-2 h-4 w-4" />
        Add New Job
      </Button>
    </div> */}
  </div>
);