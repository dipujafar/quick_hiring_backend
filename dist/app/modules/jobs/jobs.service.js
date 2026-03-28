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
exports.jobsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jobs_models_1 = __importDefault(require("./jobs.models"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../class/builder/QueryBuilder"));
const createJobs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_models_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create jobs');
    }
    return result;
});
const getAllJobs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query['isDeleted'] = false;
    const jobsModel = new QueryBuilder_1.default(jobs_models_1.default.find(), query)
        .search([])
        .filter()
        .paginate()
        .sort()
        .fields();
    const data = yield jobsModel.modelQuery;
    const meta = yield jobsModel.countTotal();
    return {
        data,
        meta,
    };
});
const getJobsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_models_1.default.findById(id);
    if (!result || (result === null || result === void 0 ? void 0 : result.isDeleted)) {
        throw new Error('Jobs not found!');
    }
    return result;
});
const updateJobs = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_models_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new Error('Failed to update Jobs');
    }
    return result;
});
const deleteJobs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_models_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete jobs');
    }
    return result;
});
// ----------------------------- feature jobs service -----------------------------
const featureJobs = (id, isFeatured) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield jobs_models_1.default.findByIdAndUpdate(id, { isFeatured }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update job feature status');
    }
    return result;
});
const getFeaturedJobs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query['isDeleted'] = false;
    query['isFeatured'] = true;
    const result = yield jobs_models_1.default.find(query);
    return result;
});
exports.jobsService = {
    createJobs,
    getAllJobs,
    getJobsById,
    updateJobs,
    deleteJobs,
    featureJobs,
    getFeaturedJobs,
};
