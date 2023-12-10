
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './AcademicFaculty.validation';
import { AcademicFacultyControllers } from './AcademicFaculty.controller';



const router = express.Router();
//will call controller function
router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty)
router.get('/',AcademicFacultyControllers.getAllAcademicFaculties)

router.patch(
    '/:facultyId',
    validateRequest(
      AcademicFacultyValidation.UpdateacademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
  );
  
router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty)
// router.get('/:studentId',StudentControllers.getSingleStudent)
// router.delete('/:studentId',StudentControllers.deleteStudent)
export const AcademicFacultyRoutes = router;
  