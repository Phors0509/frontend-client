import moment from 'moment-timezone';
import { InterviewEvent, JobApplication } from './types/calendar';

export const convertToEvents = (applications: JobApplication[]): InterviewEvent[] => {
  return applications
    .filter(app => app.interviewDate && app.status === 'interview') // Only process applications with interview dates
    .map(app => {
      const startDateTime = moment.tz(
        `${app.interviewDate} ${app.interviewTime || '09:00'}`,
        'YYYY-MM-DD HH:mm',
        'Asia/Phnom_Penh'
      );

      // Set end time to 1 hour after start if not specified
      const endDateTime = moment(startDateTime).add(1, 'hour');

      return {
        id: app._id,
        title: `Interview: ${app.candidateName}`,
        start: startDateTime.toDate(),
        end: endDateTime.toDate(),
        candidateName: app.candidateName,
        jobTitle: app.jobTitle,
        status: app.status,
      };
    });
};

export const formatEventTime = (date: Date): string => {
  return moment(date).format('HH:mm');
};
