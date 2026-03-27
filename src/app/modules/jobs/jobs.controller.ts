import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { jobsService } from './jobs.service';
import sendResponse from '../../utils/sendResponse';
import { uploadToS3 } from '../../utils/s3';

const createJobs = catchAsync(async (req: Request, res: Response) => {
  if (req.file) {
    req.body.thumbnailIcon = await uploadToS3({
      file: req.file,
      fileName: `job/thumbnailIcon/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }

  const result = await jobsService.createJobs(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Jobs created successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await jobsService.getAllJobs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All jobs fetched successfully',
    data: result,
  });
});

const getJobsById = catchAsync(async (req: Request, res: Response) => {
  const result = await jobsService.getJobsById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs fetched successfully',
    data: result,
  });
});
const updateJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await jobsService.updateJobs(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs updated successfully',
    data: result,
  });
});

const deleteJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await jobsService.deleteJobs(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs deleted successfully',
    data: result,
  });
});

export const jobsController = {
  createJobs,
  getAllJobs,
  getJobsById,
  updateJobs,
  deleteJobs,
};
