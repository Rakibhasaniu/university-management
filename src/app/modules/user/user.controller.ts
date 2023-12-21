import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try{
      const {student : studentData} = req.body;
  
      const zodParseData = studentValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDb(zodParseData)
    // res.status(200).json({
    //   success: true,
    //   message: 'Student Created Successfully',
    //   data: result
    // })
    // } catch (err: any){
    //   res.status(500).json({
    //     success: false,
    //     message:err.message || 'Something Went Wrong',
    //     error: err,
    //   })
    // }
  }