import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoDb = async (password: string,payLoad: TStudent ) => {

  //create a user object
  const userData : Partial<TUser> = {}
  //if password is not given use default password
  userData.password = password || (config.default_password as string);
  
  userData.role='student'

 
  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester)

  
  userData.id= await generateStudentId(admissionSemester);

  
  //create a userData
    const newUser =   await User.create(userData)
    //create a student
    if(Object.keys(newUser).length){
      payLoad.id = newUser.id;//embedding
      payLoad.user = newUser._id;//reference id

      const newStudent= await StudentModel.create(payLoad);
      return newStudent;
    }
    // return newUser;
  }




export const UserServices = {
    createStudentIntoDb
}