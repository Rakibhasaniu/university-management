import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDb = async (password: string,student: TStudent) => {

  //create a user object
  const user : NewUser = {}
  //if password is not given use default password
  user.password = password || (config.default_password as string);
  // if(!password){
  //   user.password = config.default_password as string;
  // } else {
  //   user.password = password;
  // }
  //set student role
  //set manually generated is
  user.id= '2030100001'

  user.role='student'
  //create a user
    const result =   await User.create(user)
    //create a student
    if(Object.keys(result).length){
      studentData.id = result.id;
      student.user = result._id
    }
    return result;
  }




export const UserServices = {
    createStudentIntoDb
}