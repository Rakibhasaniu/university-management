import mongoose from "mongoose";
import config from "../../config";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../error/AppError";
import httpStatus from "http-status";


const createStudentIntoDb = async (password: string,payLoad: TStudent ) => {

  //create a user object
  const userData : Partial<TUser> = {}
  //if password is not given use default password
  userData.password = password || (config.default_password as string);
  
  userData.role='student'

 
  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester)

  // const session =await mongoose.startSession()
  
  // try {
  //   session.startTransaction()
  //   userData.id= await generateStudentId(admissionSemester);

  
  // //create a userData
  //   const newUser =   await User.create([userData],{session})
  //   //create a student
  //   if(!newUser.length){
  //     throw new AppError(httpStatus.BAD_REQUEST,'Failed to create user') 
  //     payLoad.id = newUser[0].id;//embedding
  //     payLoad.user = newUser[0]._id;//reference id
  //     //transaction-2

  //     const newStudent= await StudentModel.create([payLoad,{session}]);
  //     if(!newStudent.length){
  //       throw new AppError(httpStatus.BAD_REQUEST,'Failed to create user') 
  //     }
  //     await session.commitTransaction()
  //     await session.endSession()
  //     return newStudent;
  //   }
  // } catch (err) {
  //     await session.abortTransaction()
  //     await session.endSession()
  // }
  //   // return newUser;
  // }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await StudentModel.create([payLoad], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};


export const UserServices = {
    createStudentIntoDb
}