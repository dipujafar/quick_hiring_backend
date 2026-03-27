import { Model } from 'mongoose';

export interface IApplications {
  isDeleted: boolean;
}

export type IApplicationsModules = Model<
  IApplications,
  Record<string, unknown>
>;
