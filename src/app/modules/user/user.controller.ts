import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
// import { userValidationSchema } from "./user.validation";

const createStudent: RequestHandler = async (req, res, next) => {
    try{
      const {password,student : studentData} = req.body;
  
      // const zodParseData = userValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDb(password,studentData)
    // res.status(200).json({
    //   success: true,
    //   message: 'Student Created Successfully',
    //   data: result
    // })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
    } catch (err){
      // res.status(500).json({
      //   success: false,
      //   message:err.message || 'Something Went Wrong',
      //   error: err,
      // })
      next(err);
    }
  }

  export const userController = {
    createStudent,
  }