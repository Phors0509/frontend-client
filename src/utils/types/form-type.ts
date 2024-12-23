export type Jobs = {
  _id?: string;
  company?: { _id: string };
  title?: string;
  position?: string[];
  workMode?: string[];
  requirement?: string;
  location?: string;
  job_opening?: number;
  max_salary?: number;
  min_salary?: number;
  description?: string;
  address?: string;
  type?: string[];
  schedule?: string[];
  required_experience?: string[];
  benefit?: string[];
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  
};
