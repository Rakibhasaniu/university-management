import express from "express";

import { AcademicSemesterController } from "./academicSemester.controller";
import validationMiddleware from "../../middleware/validateRequest";
import { AcademicValidation } from "./academicSemester.validation";


const router = express.Router();

router.post('/create-academic-semester',  validationMiddleware(AcademicValidation.createAcademicSemesterValidationSchema) ,AcademicSemesterController.CreateAcademicSemester)

router.get('/:semesterId',AcademicSemesterController.getSingleAcademicSemester)

router.patch(
    '/:semesterId',
    validationMiddleware(
      AcademicValidation.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterController.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemesterController.getAllAcademicSemesters);


export const AcademicRoutes = router;