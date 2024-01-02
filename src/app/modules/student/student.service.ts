import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";


const createStudentIntoDb = async (student: TStudent) => {
  const result =   await StudentModel.create(student)
  return result;
}
const getAllStudentFromDB = async() => {
  const result = await StudentModel.find().populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
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
const deleteStudent = async(id: string) => {
  const result = await StudentModel.updateOne({id},{isDeleted: true})
  return result;
}




export const StudentService = {
    createStudentIntoDb,
    getAllStudentFromDB,
    getSingleStudent,
    deleteStudent
}