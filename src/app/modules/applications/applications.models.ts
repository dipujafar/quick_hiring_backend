import { model, Schema } from 'mongoose';
import { IApplications, IApplicationsModules } from './applications.interface';

const applicationsSchema = new Schema<IApplications>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Jobs', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String, required: true },
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  },
);

//applicationsSchema.pre('find', function (next) {
//  //@ts-ignore
//  this.find({ isDeleted: { $ne: true } });
//  next();
//});

//applicationsSchema.pre('findOne', function (next) {
//@ts-ignore
//this.find({ isDeleted: { $ne: true } });
// next();
//});

applicationsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

const Applications = model<IApplications, IApplicationsModules>(
  'Applications',
  applicationsSchema,
);
export default Applications;
