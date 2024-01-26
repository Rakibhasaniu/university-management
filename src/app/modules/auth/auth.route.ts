import express from 'express';
import validationMiddleware from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/login',validationMiddleware(AuthValidation.loginValidationSChema),AuthControllers.loginUser)



export const AcademicSemesterRoutes = router;