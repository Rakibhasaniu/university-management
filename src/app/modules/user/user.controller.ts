import { Request, Response } from "express";
import { UserServices } from "./user.service";
// import { userValidationSchema } from "./user.validation";

const createStudent = async (req: Request, res: Response) => {
    try{
      const {password,student : studentData} = req.body;
  
      // const zodParseData = userValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDb(password,studentData)
    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result
    })
    } catch (err: any){
      res.status(500).json({
        success: false,
        message:err.message || 'Something Went Wrong',
        error: err,
      })
    }
  }

  export const userController = {
    createStudent,
  }