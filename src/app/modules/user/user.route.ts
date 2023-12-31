import express from 'express';
import { userController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middleware/validateRequest';



const router = express.Router()



router.post('/create-student',validationMiddleware(createStudentValidationSchema),userController.createStudent)


export const UserRoutes = router