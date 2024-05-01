import mongoose, { Schema, Document, Model, Date } from "mongoose";

export interface IPrompt extends Document {
  prompt: string;
  date: Date;
}

const promptSchema = new Schema<IPrompt>(
  {
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

export const Prompt: Model<IPrompt> = mongoose.model<IPrompt>(
  "Prompt",
  promptSchema
);
