export const JOB_TYPES = ['Contract', 'Internship'] as const;
export const WORK_MODES = ['Remote', 'On-Site', 'Hybrid'] as const;
export const SCHEDULES = ['Full-Time', 'Part-Time', 'Flexible-Hours', 'Project-Based'] as const;

export type JobType = (typeof JOB_TYPES)[number];
export type WorkMode = (typeof WORK_MODES)[number];
export type Schedule = (typeof SCHEDULES)[number];