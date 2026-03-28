import { Model, ObjectId } from 'mongoose';

export interface IApplications {
  jobId: ObjectId;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter: string;
  isDeleted: boolean;
}

export type IApplicationsModules = Model<
  IApplications,
  Record<string, unknown>
>;
