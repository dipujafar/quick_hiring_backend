
import { model, Schema } from 'mongoose';
import { IApplications, IApplicationsModules } from './applications.interface';

const applicationsSchema = new Schema<IApplications>(
  {
    isDeleted: { type: 'boolean', default: false },
  },
  {
    timestamps: true,
  }
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
  applicationsSchema
);
export default Applications;