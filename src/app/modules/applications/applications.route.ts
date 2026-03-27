
import { Router } from 'express';
import { applicationsController } from './applications.controller';

const router = Router();

router.post('/', applicationsController.createApplications);
router.patch('/:id', applicationsController.updateApplications);
router.delete('/:id', applicationsController.deleteApplications);
router.get('/:id', applicationsController.getApplicationsById);
router.get('/', applicationsController.getAllApplications);

export const applicationsRoutes = router;