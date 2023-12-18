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
      dada: result
    })
  } catch (err) {
    console.log(err);
  }
}

export const StudentController = {
  createStudent,
  getAllStudent,
}