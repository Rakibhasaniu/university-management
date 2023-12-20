import { User } from "./user.model";


const createStudentIntoDb = async (student: TStudent) => {
    const result =   await User.create(student)
    return result;
  }




export const UserServices = {
    createStudentIntoDb
}