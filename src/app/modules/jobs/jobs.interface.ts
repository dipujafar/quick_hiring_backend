import { Model } from 'mongoose';

export interface IJobs {
  title: string;
  thumbnailIcon: string;
  description: string;
  category: string;
  company: string;
  employment_type: string;
  job_type: string;
  gender: string;
  education: string;
  salaryMin: string;
  salaryMax: string;
  division: string;
  street: string;
  deadline: string;
  experience: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  status: string;
  isDeleted: boolean;
}

export type IJobsModules = Model<IJobs, Record<string, unknown>>;
