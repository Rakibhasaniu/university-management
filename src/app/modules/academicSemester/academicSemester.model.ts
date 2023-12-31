import { Schema, model } from "mongoose";

'

const academicSchema = new Schema<TUser>({
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
