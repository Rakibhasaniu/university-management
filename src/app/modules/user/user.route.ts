import express from 'express';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { userController } from './user.controller';
import { createAdminValidationSchema } from '../admin/admin.validation';




const router = express.Router()



router.post('/create-student',validationMiddleware(createStudentValidationSchema),userController.createStudent)
router.post(
    '/create-faculty',
    validationMiddleware(createFacultyValidationSchema),
    userController.createFaculty
  );
  
  router.post(
    '/create-admin',
    validationMiddleware(createAdminValidationSchema),
    userController.createAdmin,
  );


export const UserRoutes = router