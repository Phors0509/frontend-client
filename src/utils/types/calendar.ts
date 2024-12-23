export interface JobApplication {
  _id?: string; // Unique identifier for the application
  candidateName: string; // Name of the candidate
  jobTitle: string; // Title of the job being applied for
  interviewDate?: string; // Date of the interview in 'YYYY-MM-DD' format (optional)
  interviewTime?: string; // Time of the interview in 'HH:mm' format (optional)
  status?: string
}
export interface InterviewEvent {
  _id?: string;
  title?: string;
  start?: Date;
  end?: Date;
  jobType?: string;
  interviewDate?: Date;
  interviewLocation?: string;
  status?: string;
}

export interface JobApply {
  _id: string;
  candidateName?: string;
  interviewDate?: Date;
  interviewLocation?: string;
  status?: string;
}

