import { Schema, model } from 'mongoose';
import { StudentModel, TGuardian, TLocalGuardian, TUserName } from './student.interface';



const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    // trim: true,
    // maxlength: [20,'20 word er beshi dis na'],
    // minlength:[4,'4 tar kom dis na'],
    // validate: {
    //   validator:function(value : string){
    //     const firstName= value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstName === value;
    //   },
    //   message: '{VALUE} IS NOT IN CAPITALIZE FORMAT'
    // }
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String, 
    required: true,
    // validate: {
    //   validator: (value : string) => validator.isAlpha(value),
    //   message:'{VALUE} IS NOT VALID' 
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSChema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<StudentModel>({
  id: { 
    type: String,
    required: true,
    unique: true,
   },
  password: { 
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
    minlength: 5,
   },
  name: {
    type: userNameSchema,
    required: [true,'First Name is Required'],
  },
  gender:{
    type: String,
    enum: {
      values:  ['male', 'female','other'],
      message: 'uporer 3 tar moddhe 1 ta hbe'
    },
    required: true
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', '0+', '0-'],
    
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: guardianSchema,
  localGuardian: {
    type: localGuardianSChema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'noActive'],
    default:'active',
    // required: true
  },
  isDeleted : {
    type: Boolean,
    default: false
  }
},{
  toJSON: {
    virtuals: true,
  },
});