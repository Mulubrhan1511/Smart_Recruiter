import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; // Import only Document
import { Types } from 'mongoose'; // Import Types separately

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] }) // Define it as an array of strings
  skills: string[];


  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  salary: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  totalApplicants: number;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop([{ 
    user: { type: Types.ObjectId, ref: 'User' }, // Use Types.ObjectId here
    status: { type: String, enum: ['pending', 'interview', 'rejected'], default: 'pending' },
    fieldOfStudy: String,
    location: String,
    resume: String,
    name: String
  }])
  applicants: { user: Types.ObjectId, status: string, resume: string, fieldOfStudy: String, location: String, name: String }[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
