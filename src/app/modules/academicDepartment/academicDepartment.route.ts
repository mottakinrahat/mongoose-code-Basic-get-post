
import express from 'express';


import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';


const router = express.Router();
//will call controller function
router.post('/create-academic-department',validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema),AcademicDepartmentControllers.createAcademicDepartment)
router.get('/',AcademicDepartmentControllers.getAllAcademicDepartments)

router.patch(
    '/:departmentId',
    validateRequest(
      AcademicDepartmentValidation.UpdateacademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartment,
  );
  
router.get('/:departmentId',AcademicDepartmentControllers.getSingleAcademicDepartment)
// router.get('/:studentId',StudentControllers.getSingleStudent)
// router.delete('/:studentId',StudentControllers.deleteStudent)
export const AcademicDepartmentRoutes = router;
  