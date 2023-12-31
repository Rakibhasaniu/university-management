import express from "express";

import { AcademicSemesterController } from "./academicSemester.controller";
import validationMiddleware from "../../middleware/validateRequest";
import { AcademicValidation } from "./academicSemester.validation";


const router = express.Router();

router.post('/create-academic-semester',  validationMiddleware(AcademicValidation.createAcademicSemesterValidationSchema) ,AcademicSemesterController.CreateAcademicSemester)



export const AcademicRoutes = router;