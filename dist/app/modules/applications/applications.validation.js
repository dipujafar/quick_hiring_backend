"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationJobValidation = exports.createApplicationJobSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobId: zod_1.z
            .string({ required_error: 'Job ID is required' })
            .min(1, 'Job ID is required'),
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .min(1, 'Name is required'),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Invalid email'),
        resumeUrl: zod_1.z
            .string({ required_error: 'Resume URL is required' })
            .url('Invalid resume URL'),
        coverLetter: zod_1.z.string().optional(),
    }),
});
exports.ApplicationJobValidation = {
    createApplicationJobSchema: exports.createApplicationJobSchema,
};
