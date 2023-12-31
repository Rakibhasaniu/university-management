import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";


const academicSchema = new Schema<TAcademicSemester>({
    
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName,
    },
    year: {
        type: Date,
        required: true,
        enum: AcademicSemesterCode,
    },
    code : {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        required: true,
        enum:months,
    },
    endMonth: {
        type: String,
        required: true,
        enum:months,
    },
},
{
    timestamps: true,
})

 export const AcademicSemester = model<TAcademicSemester>('AcademicSemester',academicSchema)