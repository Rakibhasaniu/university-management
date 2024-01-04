/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";



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
   
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode=simplifiedError?.statusCode;
    message=simplifiedError?.message;
    errorSources=simplifiedError?.errorSources;
  }else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }





    return res.status(statusCode).json({
      success : false,
      message,
      errorSources,
      // error: err,
      stack:config.NODE_ENV === 'development' ? err?.stack : null,
    })
  }


export default globalErrorHandler;