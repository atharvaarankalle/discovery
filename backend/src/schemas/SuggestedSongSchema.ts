import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./UserSchema";
import { IPrompt } from "./PromptSchema";

export interface ISuggestedSong extends Document {
  userId: Schema.Types.ObjectId;
  songId: string;
  caption?: string;
  prompt: Schema.Types.ObjectId;
}

const suggestedSongSchema = new Schema<ISuggestedSong>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    songId: {
      type: String,
      required: [true, "Song ID is required"],
    },
    caption: String,
    prompt: {
      type: Schema.Types.ObjectId,
      ref: "Prompt",
      required: [true, "Prompt ID is required"],
    },
  },
  { timestamps: true }
);

export const SuggestedSong: Model<ISuggestedSong> =
  mongoose.model<ISuggestedSong>("SuggestedSong", suggestedSongSchema);
