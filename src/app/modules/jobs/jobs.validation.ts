import { z } from 'zod';

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    company: z.string().min(1, 'Company  is required'),
    employment_type: z.string().min(1, 'Employment type is required'),
    job_type: z.string().min(1, 'Job type is required'),
    gender: z.string().min(1, 'At least one gender must be specified'),
    education: z
      .string()
      .min(1, 'At least one education requirement is required'),
    salaryMin: z.string().regex(/^\d+$/, 'Salary must be a number'),
    salaryMax: z.string().regex(/^\d+$/, 'Salary must be a number'),
    division: z.string().min(1, 'Division is required'),
    street: z.string().min(1, 'Street is required'),
    deadline: z.string().min(1, 'Deadline is required'),
    experience: z.string().min(1, 'Experience is required'),
    requirements: z.string().min(1, 'Requirements are required'),
    responsibilities: z.string().min(1, 'Responsibilities are required'),
    benefits: z.string().min(1, 'Benefits are required'),
  }),
});

export const jobValidation = {
  createJobSchema,
};
