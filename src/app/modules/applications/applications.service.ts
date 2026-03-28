import httpStatus from 'http-status';
import { IApplications } from './applications.interface';
import Applications from './applications.models';
import QueryBuilder from '../../class/builder/QueryBuilder';
import AppError from '../../error/AppError';

const createApplications = async (payload: IApplications) => {
  const result = await Applications.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create applications');
  }
  return result;
};

const getAllApplications = async (query: Record<string, any>) => {
  query['isDeleted'] = false;
  const applicationsModel = new QueryBuilder(
    Applications.find().populate(['jobId']),
    query,
  )
    .search([])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await applicationsModel.modelQuery;
  const meta = await applicationsModel.countTotal();

  return {
    data,
    meta,
  };
};

const getApplicationsById = async (id: string) => {
  const result = await Applications.findById(id);
  if (!result || result?.isDeleted) {
    throw new Error('Applications not found!');
  }
  return result;
};

const updateApplications = async (
  id: string,
  payload: Partial<IApplications>,
) => {
  const result = await Applications.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new Error('Failed to update Applications');
  }
  return result;
};

const deleteApplications = async (id: string) => {
  const result = await Applications.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete applications');
  }
  return result;
};

export const applicationsService = {
  createApplications,
  getAllApplications,
  getApplicationsById,
  updateApplications,
  deleteApplications,
};
