import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { jobsRoutes } from '../modules/jobs/jobs.route';
import { applicationsRoutes } from '../modules/applications/applications.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/jobs',
    route: jobsRoutes,
  },
  {
    path: '/applications',
    route: applicationsRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
