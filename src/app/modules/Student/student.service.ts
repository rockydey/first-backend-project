import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // Builtin static method
  if (await Student.isUserExits(studentData.id as string)) {
    throw new Error('User already exists');
  }
  const result = await Student.create(studentData);

  // Builtin instance method
  // const student = new Student(studentData);
  // if (await student.isUserExits(studentData.id as string)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
