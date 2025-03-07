import mongoose, { Schema, Document } from 'mongoose';
import { IDeveloper } from '../types/Developer';

export interface DeveloperDocument extends IDeveloper, Document {}

const DeveloperSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cellnumber: { type: String, required: true },
  city: { type: String, required: true },
  academicFormation: { type: String, required: true },
  skills: [{ type: String, required: true }],
  githubUsername: { type: String },
  avatarUrl: { type: String },
  feedbacks: [
    {
      comment: { type: String, required: true },
      recruiterName: { type: String, required: true }
    }
  ]
}, { timestamps: true });

export default mongoose.model<DeveloperDocument>('Developer', DeveloperSchema);
