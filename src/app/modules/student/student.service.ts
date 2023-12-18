import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";


const createStudentIntoDb = async (student: TStudent) => {
  const result =   await StudentModel.create(student)
  return result;
}
const getAllStudentFromDB = async() => {
  const result = await StudentModel.find();
  return result;
}


export const StudentService = {
    createStudentIntoDb,
    getAllStudentFromDB,
}