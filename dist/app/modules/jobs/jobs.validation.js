"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobValidation = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        category: zod_1.z.string().min(1, 'Category is required'),
        company: zod_1.z.string().min(1, 'Company  is required'),
        employment_type: zod_1.z.string().min(1, 'Employment type is required'),
        job_type: zod_1.z.string().min(1, 'Job type is required'),
        gender: zod_1.z.string().min(1, 'At least one gender must be specified'),
        education: zod_1.z
            .string()
            .min(1, 'At least one education requirement is required'),
        salaryMin: zod_1.z.string().regex(/^\d+$/, 'Salary must be a number'),
        salaryMax: zod_1.z.string().regex(/^\d+$/, 'Salary must be a number'),
        division: zod_1.z.string().min(1, 'Division is required'),
        street: zod_1.z.string().min(1, 'Street is required'),
        deadline: zod_1.z.string().min(1, 'Deadline is required'),
        experience: zod_1.z.string().min(1, 'Experience is required'),
        requirements: zod_1.z.string().min(1, 'Requirements are required'),
        responsibilities: zod_1.z.string().min(1, 'Responsibilities are required'),
        benefits: zod_1.z.string().min(1, 'Benefits are required'),
    }),
});
exports.jobValidation = {
    createJobSchema: exports.createJobSchema,
};
