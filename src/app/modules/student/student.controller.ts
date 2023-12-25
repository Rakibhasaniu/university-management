import { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service";

const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await StudentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student Getting Successfully',
      data: result
    })
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Something Went Wrong',
    //   error: err,
    // })
    next(err)
  }
}
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {studentId}  = req.params; 
  const result = await StudentService.getSingleStudent(studentId)

  res.status(200).json({
    success: true,
    message: "Single Student Getting Successfully",
    data: result
  })
  } catch(err){
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Something Went Wrong',
    //   error: err,
    // })
    next(err);
  }
}
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {studentId}  = req.params; 
  const result = await StudentService.deleteStudent(studentId)

  res.status(200).json({
    success: true,
    message: "Student Deleted Successfully",
    data: result
  })
  } catch(err){
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'Something Went Wrong',
    //   error: err,
    // })
    next(err)
  }
}

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  
}