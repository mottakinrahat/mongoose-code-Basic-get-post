import { AcademicSemester } from './academicSemester.model';
import express from 'express';
import { StudentControllers } from '../student/student.controller';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidations } from './academicSemesterSchema.validation';
import validateRequest from '../../middleware/validateRequest';


const router = express.Router();
//will call controller function
router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester)
router.get('/',AcademicSemesterControllers.getAllAcademicSemester)

router.patch(
    '/:semesterId',
    validateRequest(
      AcademicSemesterValidations.createAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  
router.get('/:semesterId',AcademicSemesterControllers.getSingleAcademicSemester)
// router.get('/:studentId',StudentControllers.getSingleStudent)
// router.delete('/:studentId',StudentControllers.deleteStudent)
export const AcademicSemesterRoutes = router;
  