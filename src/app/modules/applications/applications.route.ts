import { Router } from 'express';
import { applicationsController } from './applications.controller';
import validateRequest from '../../middleware/validateRequest';
import { ApplicationJobValidation } from './applications.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ApplicationJobValidation.createApplicationJobSchema),
  applicationsController.createApplications,
);
router.patch('/:id', applicationsController.updateApplications);
router.delete('/:id', applicationsController.deleteApplications);
router.get('/:id', applicationsController.getApplicationsById);
router.get('/', applicationsController.getAllApplications);

export const applicationsRoutes = router;
