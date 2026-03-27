import { Router } from 'express';
import { jobsController } from './jobs.controller';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import multer, { memoryStorage } from 'multer';
import parseData from '../../middleware/parseData';
import { jobValidation } from './jobs.validation';

const router = Router();
const upload = multer({ storage: memoryStorage() });

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('thumbnailIcon'),
  parseData(),
  validateRequest(jobValidation.createJobSchema),
  jobsController.createJobs,
);
router.patch('/:id', jobsController.updateJobs);
router.delete('/:id', auth(USER_ROLE.admin), jobsController.deleteJobs);
router.get('/:id', jobsController.getJobsById);
router.get('/', jobsController.getAllJobs);

export const jobsRoutes = router;
