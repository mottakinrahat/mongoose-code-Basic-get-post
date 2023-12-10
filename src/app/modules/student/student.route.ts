import express from 'express';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();
//will call controller function
router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch('/:id',validateRequest(StudentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);
export const StudentRoutes = router;
