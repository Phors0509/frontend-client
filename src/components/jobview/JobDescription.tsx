interface JobDescriptionProps {
  job_description: string;
  profile:string;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ job_description }) => (
  <div className=" p-6">
    <h3 className="text-xl font-semibold mb-4">Job Description</h3>
    <p>{job_description}</p>
  </div>
);
