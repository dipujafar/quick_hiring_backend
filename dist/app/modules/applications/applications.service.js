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
exports.applicationsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const applications_models_1 = __importDefault(require("./applications.models"));
const QueryBuilder_1 = __importDefault(require("../../class/builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const createApplications = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applications_models_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create applications');
    }
    return result;
});
const getAllApplications = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query['isDeleted'] = false;
    const applicationsModel = new QueryBuilder_1.default(applications_models_1.default.find().populate(['jobId']), query)
        .search([])
        .filter()
        .paginate()
        .sort()
        .fields();
    const data = yield applicationsModel.modelQuery;
    const meta = yield applicationsModel.countTotal();
    return {
        data,
        meta,
    };
});
const getApplicationsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applications_models_1.default.findById(id);
    if (!result || (result === null || result === void 0 ? void 0 : result.isDeleted)) {
        throw new Error('Applications not found!');
    }
    return result;
});
const updateApplications = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applications_models_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new Error('Failed to update Applications');
    }
    return result;
});
const deleteApplications = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applications_models_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete applications');
    }
    return result;
});
exports.applicationsService = {
    createApplications,
    getAllApplications,
    getApplicationsById,
    updateApplications,
    deleteApplications,
};
