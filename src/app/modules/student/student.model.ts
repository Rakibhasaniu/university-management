import { Schema, model } from 'mongoose';
import {  TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';




const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true,' First Name is Required'],
    trim: true,
    maxlength: [20,'20 word er beshi dis na'],
    minlength:[4,'4 tar kom dis na'],
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
    required: [true,'Last Name is Required'],
    // validate: {
    //   validator: (value : string) => validator.isAlpha(value),
    //   message:'{VALUE} IS NOT VALID' 
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true,' Father Name is Required'],
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

const studentSchema = new Schema<TStudent>({
  id: { 
    type: String,
    required: true,
    unique: true,
   },
   user:{
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
   },
  // password: { 
  //   type: String,
  //   required: true,
  //   unique: true,
  //   maxlength: 30,
  //   minlength: 5,
  //  },
  name: {
    type: userNameSchema,
    required: [true,'Name is Required'],
  },
  gender:{
    type: String,
    enum: {
      values:  ['male', 'female','other'],
      message: "The gender field can be one of the following: 'male','female', or 'other'."
    },
    required: true
  },
  dateOfBirth: {
    type: Date,
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
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSChema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },

  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  isDeleted : {
    type: Boolean,
    default: false
  }
},{
  toJSON: {
    virtuals: true
  }
});

//virtual
studentSchema.virtual('fullName').get(function(){

  return  (
    `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
  )
})

// studentSchema.pre('save', async function(){
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
// })
// studentSchema.post('save', function(doc, next){
//   doc.password='';
//   next()
// })

//query middleware
studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne : true}})
  next();
})
studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne : true}})
  next();
})
studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match : {isDeleted : {$ne: true}}})
  next();
})

export const StudentModel = model <TStudent>('Student',studentSchema)