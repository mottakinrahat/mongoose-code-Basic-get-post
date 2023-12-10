import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDB = async (query: Record<string>, unknown) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { idDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try{

  session.startTransaction();

  const updateBasicInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true, session },
  );
  if (!updateBasicInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
  }
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletePreRequisites } },
        },
      },
      { new: true, runValidators: true, session },
    );
    if (!deletedPreRequisiteCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
    }
    //filter out the new course fields
    const newPreRequisites = preRequisiteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );

    const newPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
      },
      { new: true, runValidators: true, session },
    );
    if (!newPreRequisiteCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
  
    return result;
  
  }
  await session.commitTransaction();
  await session.endSession();
}catch(err){
  await session.abortTransaction();
  await session.endSession();
  throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
}


 
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
