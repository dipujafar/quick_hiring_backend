"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsRoutes = void 0;
const express_1 = require("express");
const jobs_controller_1 = require("./jobs.controller");
const user_constants_1 = require("../user/user.constants");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = __importStar(require("multer"));
const parseData_1 = __importDefault(require("../../middleware/parseData"));
const jobs_validation_1 = require("./jobs.validation");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: (0, multer_1.memoryStorage)() });
router.post('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), upload.single('thumbnailIcon'), (0, parseData_1.default)(), (0, validateRequest_1.default)(jobs_validation_1.jobValidation.createJobSchema), jobs_controller_1.jobsController.createJobs);
router.patch('/:id', jobs_controller_1.jobsController.updateJobs);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), jobs_controller_1.jobsController.deleteJobs);
router.get('/:id', jobs_controller_1.jobsController.getJobsById);
router.get('/', jobs_controller_1.jobsController.getAllJobs);
// ----------------------------- feature jobs routes ------------------------------
router.patch('/feature/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.admin), jobs_controller_1.jobsController.featureJobs);
router.get('/feature/featured', jobs_controller_1.jobsController.getFeaturedJobs);
exports.jobsRoutes = router;
