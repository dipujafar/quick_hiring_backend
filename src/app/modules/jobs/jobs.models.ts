import { model, Schema } from 'mongoose';
import { IJobs, IJobsModules } from './jobs.interface';

const jobsSchema = new Schema<IJobs>(
  {
    title: { type: String, required: true },
    thumbnailIcon: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    employment_type: { type: String, required: true },
    job_type: { type: String, required: true },
    gender: { type: String, required: true },
    education: { type: String, required: true },
    salaryMin: { type: String, required: true },
    salaryMax: { type: String, required: true },
    division: { type: String, required: true },
    street: { type: String, required: true },
    deadline: { type: String, required: true },
    experience: { type: String, required: true },
    requirements: { type: String, required: true },
    responsibilities: { type: String, required: true },
    benefits: { type: String, required: true },
    status: { type: String, required: true, default: 'active' },
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  },
);

jobsSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

jobsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Jobs = model<IJobs, IJobsModules>('Jobs', jobsSchema);
export default Jobs;
