import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt  from 'bcrypt'

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role : {
        type: String,
        enum: ['student','faculty','admin']
    },
    status: {
        type: String,
        enum:['in-progress','blocked']
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
})

userSchema.pre('save', async function(){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_round))
  })
  userSchema.post('save', function(doc, next){
    doc.password='';
    next()
  })

 export const User = model<TUser>('User', userSchema)