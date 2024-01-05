import express from 'express';
import { userController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middleware/validateRequest';
import validationMiddleware from 'src\app\middleware\validateRequest';



const router = express.Router()



router.post('/create-student',validationMiddleware(createStudentValidationSchema),userController.createStudent)
router.post(
    '/create-faculty',
    validationMiddleware(createFacultyValidationSchema),
    UserControllers.createFaculty,
  );
  
  router.post(
    '/create-admin',
    validationMiddleware(createAdminValidationSchema),
    UserControllers.createAdmin,
  );


export const UserRoutes = router