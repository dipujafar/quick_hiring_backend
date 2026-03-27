
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';  
import { applicationsService } from './applications.service';
import sendResponse from '../../utils/sendResponse';
import { storeFile } from '../../utils/fileHelper';
import { uploadToS3 } from '../../utils/s3';

const createApplications = catchAsync(async (req: Request, res: Response) => {
 const result = await applicationsService.createApplications(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Applications created successfully',
    data: result,
  });

});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {

 const result = await applicationsService.getAllApplications(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All applications fetched successfully',
    data: result,
  });

});

const getApplicationsById = catchAsync(async (req: Request, res: Response) => {
 const result = await applicationsService.getApplicationsById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications fetched successfully',
    data: result,
  });

});
const updateApplications = catchAsync(async (req: Request, res: Response) => {
const result = await applicationsService.updateApplications(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications updated successfully',
    data: result,
  });

});


const deleteApplications = catchAsync(async (req: Request, res: Response) => {
 const result = await applicationsService.deleteApplications(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications deleted successfully',
    data: result,
  });

});

export const applicationsController = {
  createApplications,
  getAllApplications,
  getApplicationsById,
  updateApplications,
  deleteApplications,
};