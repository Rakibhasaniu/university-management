import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDb = async (password: string,student: TStudent ) => {

  //create a user object
  const userData : Partial<TUser> = {}
  //if password is not given use default password
  userData.password = password || (config.default_password as string);
  // if(!password){
  //   userData.password = config.default_password as string;
  // } else {
  //   userData.password = password;
  // }
  //set student role
  //set manually generated is
  userData.id= '2030100001'

  userData.role='student'
  //create a userData
    const newUser =   await User.create(userData)
    //create a student
    if(Object.keys(newUser).length){
      student.id = newUser.id;//embedding
      student.user = newUser._id;//reference id

      const newStudent= await StudentModel.create(student);
      return newStudent;
    }
    // return newUser;
  }




export const UserServices = {
    createStudentIntoDb
}