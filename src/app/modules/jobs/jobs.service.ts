import httpStatus from 'http-status';
import { IJobs } from './jobs.interface';
import Jobs from './jobs.models';
import AppError from '../../error/AppError';
import QueryBuilder from '../../class/builder/QueryBuilder';

const createJobs = async (payload: IJobs) => {
  const result = await Jobs.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create jobs');
  }
  return result;
};

const getAllJobs = async (query: Record<string, any>) => {
  query['isDeleted'] = false;
  const jobsModel = new QueryBuilder(Jobs.find(), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await jobsModel.modelQuery;
  const meta = await jobsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getJobsById = async (id: string) => {
  const result = await Jobs.findById(id);
  if (!result || result?.isDeleted) {
    throw new Error('Jobs not found!');
  }
  return result;
};

const updateJobs = async (id: string, payload: Partial<IJobs>) => {
  const result = await Jobs.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Jobs');
  }
  return result;
};

const deleteJobs = async (id: string) => {
  const result = await Jobs.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete jobs');
  }
  return result;
};

// ----------------------------- feature jobs service -----------------------------
const featureJobs = async (id: string, isFeatured: boolean) => {
  const result = await Jobs.findByIdAndUpdate(
    id,
    { isFeatured },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update job feature status',
    );
  }
  return result;
};

const getFeaturedJobs = async (query: Record<string, any>) => {
  query['isDeleted'] = false;
  query['isFeatured'] = true;
  const result = await Jobs.find(query);
  return result;
};

export const jobsService = {
  createJobs,
  getAllJobs,
  getJobsById,
  updateJobs,
  deleteJobs,
  featureJobs,
  getFeaturedJobs,
};
