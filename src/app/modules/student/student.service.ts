import mongoose from "mongoose";
import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";


const createStudentIntoDb = async (student: TStudent) => {
  const result =   await StudentModel.create(student)
  return result;
}
const getAllStudentFromDB = async(query : Record<string, unknown>) => {
  const queryObj = {...query}
  const studentSearchableField=['email','name.firstName','presentAddress']
  let searchTerm='';
  if(query?.searchTerm){
    searchTerm=query?.searchTerm as string;
  }
  const searchQuery = StudentModel.find({
    $or:studentSearchableField.map(field => ({
      [field]:{$regex: searchTerm,$options:'i'}
    }))
  })
  const excludeField = ['searchTerm','sort','limit']
  excludeField.forEach(el => delete queryObj[el])
  const filterQuery  =  searchQuery.find(queryObj).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });



  let sort= '-createdAt'
  if(query.sort){
    sort = query.sort as string;
  }

  const sortQuery =  filterQuery.sort(sort);
  let limit =1;
  if(query.limit){
    limit=query.limit ;
  }
  const limitQuery = await sortQuery.limit(limit)
  return limitQuery;
}

const getSingleStudent = async(id: string) => {
  const result = await StudentModel.findOne({id}).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  })
  return result;
}
const updateStudentIntoDB = async(id: string, payLoad : Partial<TStudent>) => {
  const {name, guardian, localGuardian,...remainingStudentData} = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {...remainingStudentData}

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate({id}, modifiedUpdatedData,{new:true, runValidators: true})
  return result;
}
const deleteStudent = async(id: string) => {
  const session = await mongoose.startSession()

  try{
    session.startTransaction()
    const deletedStudent = await StudentModel.findOneAndUpdate({id},{isDeleted: true},{new: true ,session})
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete student")
    }
    const deleteUser = await User.findOneAndUpdate({id},{isDeleted: true},{new: true ,session})
    if(!deleteUser){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deleteStudent;
  } catch (err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}




export const StudentService = {
    createStudentIntoDb,
    getAllStudentFromDB,
    getSingleStudent,
    deleteStudent,
    updateStudentIntoDB
}