export enum EmploymentType {
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
}

export enum EmploymentSchedule {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
  FLEXIBLE_HOURS = "Flexible-Hours",
  PROJECT_BASED = "Project-Based",
}

export enum WorkMode {
  REMOTE = "Remote",
  ON_SITE = "On-Site",
  HYBRID = "Hybrid",
}

export interface StatusDate {
  status: "Apply" | "Review" | "Interview" | "Shortlist" | "Accept";
}
export interface JobDetails {
  label: string;
  value: string;
}
export interface IJob {
  _id?: string;
  companyId?: string;
  profile?: string;
  title?: string;
  position?: string[];
  workMode?: WorkMode[];
  location?: string;
  requirement?: string;
  description?: string;
  address?: string;
  min_salary?: number;
  max_salary?: number;
  job_opening?: number;
  type?: EmploymentType[];
  schedule?: EmploymentSchedule[];
  required_experience?: string[];
  benefit?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deadline?: Date;
}
export interface JobTechnicalDetail {
  jobRole: string;
  minSalary: string;
  maxSalary: string;
  locality: string;
  company: string;
  jobId: string;
  benefit?: string[];
}

export interface UserInfo {
  profile: string;
  name: string;
  status: string;
  cv: string;
}

export interface jobShortList {
  interviewLocation: string
  interviewDate: string
  startDate: string
}
export interface JobApplication {
  _id?: string;
  userId?: string;
  jobId?: string;
  companyId: string;
  userInfo?: UserInfo;
  jobInfo?: IJob;
  statusDate?: StatusDate;
  appliedAt?: string;
  companyResponse?: jobShortList;
  updatedAt?: string;
}
export interface Job {
  title: string;
  company: string;
  location: string;
  details: JobDetails[];
  requirements: string[];
  technicalDetails: JobTechnicalDetail;
}

//=====apply type in chart=========

export interface ApplyDataLengthParams {
  title: string,
  image: string
  id: string
  length: 0
}
