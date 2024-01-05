import express from 'express';

import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import validationMiddleware from '../../middleware/validateRequest';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationMiddleware(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;