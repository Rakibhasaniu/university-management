import express from 'express';
import { StudentController } from './student.controller';
import validationMiddleware from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router()

// router.post('/create-student',StudentController.createStudent)
router.get('/',StudentController.getAllStudent)
router.get('/:id',StudentController.getSingleStudent)
router.patch('/:id',validationMiddleware(updateStudentValidationSchema), StudentController.updateStudent)
router.delete('/:id',StudentController.deleteStudent)


export const StudentRoutes = router