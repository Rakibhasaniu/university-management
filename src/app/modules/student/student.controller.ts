import { Request, Response } from "express";
import { StudentService } from "./student.service";
// import studentValidationSchema from "./student.validation";


const createStudent = async (req: Request, res: Response) => {
  try{
    const {student : studentData} = req.body;

    // const zodParseData = studentValidationSchema.parse(studentData)
  const result = await StudentService.createStudentIntoDb(studentData)
  res.status(200).json({
    success: true,
    message: 'Student Created Successfully',
    data: result
  })
  } catch (err){
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    })
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
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    })
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  try{
    const {studentId}  = req.params; 
  const result = await StudentService.getSingleStudent(studentId)

  res.status(200).json({
    success: true,
    message: "Single Student Getting Successfully",
    data: result
  })
  } catch(err){
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong',
      error: err,
    })
  }
}

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  
}