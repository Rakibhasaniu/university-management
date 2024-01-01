import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./asademicSemester.service";




const CreateAcademicSemester= catchAsync(async(req,res) => {
    

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success: true,
        message: 'Academic Semester Is Created Successfully',
        data: result,
    })
})

export const AcademicSemesterController = {
    CreateAcademicSemester,
}