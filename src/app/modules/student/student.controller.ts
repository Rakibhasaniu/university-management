// import { NextFunction, Request, RequestHandler, Response  } from "express";
import { StudentService } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request,res:Response,next: NextFunction) => {

  
//   Promise.resolve(fn(req,res,next)).catch(err => next(err))
//   }
// }

const getAllStudent = catchAsync(async (req, res) => {
  
    const result = await StudentService.getAllStudentFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Getting Successfully',
      data: result
    })
  
})
const getSingleStudent= catchAsync(async (req, res) => {
  
  const {studentId}  = req.params; 
  const result = await StudentService.getSingleStudent(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student Getting Successfully',
    data: result
  })
  
    
})
const deleteStudent = catchAsync(async (req, res) => {
 
  const {studentId}  = req.params; 
const result = await StudentService.deleteStudent(studentId)


sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student Deleted Successfully',
  data: result
})

})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  
}