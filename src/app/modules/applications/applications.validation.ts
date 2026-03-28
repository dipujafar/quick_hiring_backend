import { z } from 'zod';
export const createApplicationJobSchema = z.object({
  body: z.object({
    jobId: z
      .string({ required_error: 'Job ID is required' })
      .min(1, 'Job ID is required'),
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email'),
    resumeUrl: z
      .string({ required_error: 'Resume URL is required' })
      .url('Invalid resume URL'),
    coverLetter: z.string().optional(),
  }),
});

export const ApplicationJobValidation = {
  createApplicationJobSchema,
};
