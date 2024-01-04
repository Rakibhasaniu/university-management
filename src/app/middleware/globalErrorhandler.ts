/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError, ZodIssue } from "zod";



// eslint-disable-next-line no-unused-vars
const globalErrorHandler:ErrorRequestHandler = (err, req, res,next) => {
    let statusCode = 500;
    let message =  'Something Went Wrong';

  let errorSources: TErrorSources = [
    {
      path:'',
      message:'Something Went Wrong',
    },
  ]
   const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length -1],
        message: issue.message
      }
    } )
    const statusCode = 400;


    return {
      statusCode,
      message:'Zod Validation Error',
      errorSources 
    }


   }
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }





    return res.status(statusCode).json({
      success : false,
      message,
      errorSources,
      // error: err,
    })
  }


export default globalErrorHandler;