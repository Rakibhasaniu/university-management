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
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });
  const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved successfully',
      data: result,
    });
  });
  const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is updated successfully',
      data: result,
    });
  });

export const AcademicSemesterController = {
    CreateAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,

}