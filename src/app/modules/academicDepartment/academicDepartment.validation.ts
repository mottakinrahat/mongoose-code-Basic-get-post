import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'academic faculty is required',
    }),
  }),
});
const UpdateacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
      })
      .optional(),
      academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'academi faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  UpdateacademicDepartmentValidationSchema,
};
