import { FacultyValidations, createFacultyValidationSchema } from './../Faculty/faculty.validation';
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router = express.Router();

//will call controller function
router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post('/create-admin');

export const userRoutes = router;
