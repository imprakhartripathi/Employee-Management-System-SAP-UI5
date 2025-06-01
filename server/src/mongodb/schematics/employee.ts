import { Schema, model, Document } from "mongoose";

export interface IEmployee extends Document {
  Name: string;
  AvailableForInterview: "Yes" | "No";
  CurrentCTC: string;
  ExpectedCTC: string;
  NoticePeriod: string;
  MobileNumber: string;
  Date: string; // ISO date string, can also use `Date` type if needed
  Experience: string;
  EmailID: string;
  Skills: string;
  Remark: string;
  STDCode: string;
  Country: string;
}

const EmployeeSchema = new Schema<IEmployee>({
  Name: { type: String, required: true },
  AvailableForInterview: { type: String, enum: ["Yes", "No"], required: true },
  CurrentCTC: { type: String, required: true },
  ExpectedCTC: { type: String, required: true },
  NoticePeriod: { type: String, required: true },
  MobileNumber: { type: String, required: true },
  Date: { type: String, required: true },
  Experience: { type: String, required: true },
  EmailID: { type: String, required: true, unique: true },
  Skills: { type: String, required: true },
  Remark: { type: String },
  STDCode: { type: String, required: true },
  Country: { type: String, required: true },
});

export const Employee = model<IEmployee>("Employee", EmployeeSchema);
