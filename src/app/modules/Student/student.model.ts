import { model, Schema } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    // trim: true,
    require: [true, 'First name is required'],
    // maxLength: [20, 'First name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     // if (value !== firstNameStr) {
    //     //   return false;
    //     // }
    //     // return true;
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    require: [true, 'Last name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact no is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact no is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    // maxLength: [20, 'Name must be less than 20 characters'],
  },
  occupation: { type: String, required: [true, 'Occupation is required'] },
  contactNo: { type: String, required: [true, 'Contact no is required'] },
  address: { type: String, required: [true, 'Address is required'] },
});

// const studentSchema = new Schema<Student>({
//   id: { type: String, required: [true, 'Id is required'], unique: true },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Name is required'],
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message: '{VALUE} is not valid',
//     },
//     require: true,
//   },
//   //   gender:["male","female"]
//   dateOfBirth: { type: String },
//   // dateOfBirth: String,
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     // validate: {
//     //   validator: (value: string) => validator.isEmail(value),
//     //   message: '{VALUE} is not valid email',
//     // },
//   },
//   contactNo: { type: String, required: [true, 'Contact no is required'] },
//   // bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Emergency contact no is required'],
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     required: [true, 'Guardian is required'],
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: [true, 'Local guardian is required'],
//   },
//   // isActive: ['active', 'inactive'],
//   isActive: {
//     type: String,
//     enum: {
//       values: ['active', 'inactive'],
//       message: '{VALUE} is not valid',
//     },
//     required: true,
//     default: 'active',
//   },
// });

// // => Custom instance methods
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: { type: String, required: [true, 'Id is required'], unique: true },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Name is required'],
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message: '{VALUE} is not valid',
//     },
//     require: true,
//   },
//   //   gender:["male","female"]
//   dateOfBirth: { type: String },
//   // dateOfBirth: String,
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     // validate: {
//     //   validator: (value: string) => validator.isEmail(value),
//     //   message: '{VALUE} is not valid email',
//     // },
//   },
//   contactNo: { type: String, required: [true, 'Contact no is required'] },
//   // bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   bloodGroup: {
//     type: String,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Emergency contact no is required'],
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     required: [true, 'Guardian is required'],
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: [true, 'Local guardian is required'],
//   },
//   // isActive: ['active', 'inactive'],
//   isActive: {
//     type: String,
//     enum: {
//       values: ['active', 'inactive'],
//       message: '{VALUE} is not valid',
//     },
//     required: true,
//     default: 'active',
//   },
// });

// => creating a custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// => Custom static methods
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    unique: true,
    maxlength: [20, "Password can't be more than 20 characters"],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    require: true,
  },
  //   gender:["male","female"]
  dateOfBirth: { type: String },
  // dateOfBirth: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not valid email',
    // },
  },
  contactNo: { type: String, required: [true, 'Contact no is required'] },
  // bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact no is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian is required'],
  },
  // isActive: ['active', 'inactive'],
  isActive: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: '{VALUE} is not valid',
    },
    required: true,
    default: 'active',
  },
});

// => pre save middleware/hook: will work on create() and save()
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// => creating a custom static method
studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
