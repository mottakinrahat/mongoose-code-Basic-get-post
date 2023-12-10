import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();
//will call controller function
router.post(
  '/create-course',
  validateRequest(CourseValidations.CourseValidationSchema),
  CourseControllers.createAcademicCourse,
);
router.get('/', CourseControllers.getAllCourses);
router.delete('/:id', CourseControllers.deleteCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);
// router.get('/:studentId',StudentControllers.getSingleStudent)
// router.delete('/:studentId',StudentControllers.deleteStudent)
export const CourseRoutes = router;
