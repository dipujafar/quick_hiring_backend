"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const jobs_service_1 = require("./jobs.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const s3_1 = require("../../utils/s3");
const createJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.body.thumbnailIcon = yield (0, s3_1.uploadToS3)({
            file: req.file,
            fileName: `job/thumbnailIcon/${Math.floor(100000 + Math.random() * 900000)}`,
        });
    }
    const result = yield jobs_service_1.jobsService.createJobs(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Jobs created successfully',
        data: result,
    });
}));
const getAllJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_service_1.jobsService.getAllJobs(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'All jobs fetched successfully',
        data: result,
    });
}));
const getJobsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_service_1.jobsService.getJobsById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Jobs fetched successfully',
        data: result,
    });
}));
const updateJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_service_1.jobsService.updateJobs(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Jobs updated successfully',
        data: result,
    });
}));
const deleteJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_service_1.jobsService.deleteJobs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Jobs deleted successfully',
        data: result,
    });
}));
// ----------------------------- feature jobs controller ------------------------------
const featureJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isFeatured } = req.body;
    const id = req.params.id;
    const result = yield jobs_service_1.jobsService.featureJobs(id, isFeatured || true);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Jobs feature status updated successfully',
        data: result,
    });
}));
const getFeaturedJobs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_service_1.jobsService.getFeaturedJobs(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Featured jobs fetched successfully',
        data: result,
    });
}));
exports.jobsController = {
    createJobs,
    getAllJobs,
    getJobsById,
    updateJobs,
    deleteJobs,
    featureJobs,
    getFeaturedJobs,
};
