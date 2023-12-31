import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";




const CreateAcademicSemester= catchAsync(async(req,res) => {



    sendResponse(res,{
        statusCode:httpStatus.OK,
        success: true,
        message: 'Academic Semester Is Created Successfully',
        data: XPathResult,
    })
})

export const AcademicSemesterController = {
    CreateAcademicSemester,
}