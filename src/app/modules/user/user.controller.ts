// import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import { userValidationSchema } from "./user.validation";

const createStudent =catchAsync( async (req, res) => {
    
  const {password,student : studentData} = req.body;

  // const zodParseData = userValidationSchema.parse(studentData)
const result = await UserServices.createStudentIntoDb(password,studentData)

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student Created Successfully',
  data: result
})

})

  export const userController = {
    createStudent,
  }