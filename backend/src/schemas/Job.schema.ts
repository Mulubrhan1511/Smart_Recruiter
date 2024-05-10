import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
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

  @Prop(String)
  experience: string;

  @Prop([{
    user: { type: Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'interview', 'rejected'], default: 'pending' },
    resume: String,
    
  }])
  applicants: {
    user: Types.ObjectId;
    status: string;
    resume: string;
    
  }[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
