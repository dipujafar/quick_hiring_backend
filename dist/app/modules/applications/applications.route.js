"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationsRoutes = void 0;
const express_1 = require("express");
const applications_controller_1 = require("./applications.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const applications_validation_1 = require("./applications.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(applications_validation_1.ApplicationJobValidation.createApplicationJobSchema), applications_controller_1.applicationsController.createApplications);
router.patch('/:id', applications_controller_1.applicationsController.updateApplications);
router.delete('/:id', applications_controller_1.applicationsController.deleteApplications);
router.get('/:id', applications_controller_1.applicationsController.getApplicationsById);
router.get('/', applications_controller_1.applicationsController.getAllApplications);
exports.applicationsRoutes = router;
