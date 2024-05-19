import { Schema, model, Document } from "mongoose";

export interface EmployeeProps extends Document {
  firstName: string;
  lastName: string;
  fullname: string;
  jobTitle: string;
  department: string;
  hireDate: Date;
}

const CreateEmployeeSchema = new Schema<EmployeeProps>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullname: { type: String, required: true },
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
});

export default model<EmployeeProps>("Employee", CreateEmployeeSchema);
