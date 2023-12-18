import { Request, Response } from "express";
import { StudentService } from "./student.service";


const createStudent = async (req: Request, res: Response) => {
  try{
    const {student : studentData} = req.body;
  const result = await StudentService.createStudentIntoDb(studentData)
  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    data: result
  })
  } catch (err){
    console.log(err)
  }
}

const getAllStudent = async (req: Request, res: Response) => {
  try{
    const result = await StudentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student Getting Successfully',
      data: result
    })
  } catch (err) {
    console.log(err);
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  const {studentId}  = req.params; 
  const result = await StudentService.getSingleStudent(studentId)

  res.status(200).json({
    success: true,
    message: "Single Student Getting Successfully",
    data: result
  })
}

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  
}