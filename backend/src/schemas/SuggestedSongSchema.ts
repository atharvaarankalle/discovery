import mongoose, { Schema, Document, Model } from "mongoose";
import { Prompt } from "../schemas/PromptSchema";

export interface ISuggestedSong extends Document {
  user: Schema.Types.ObjectId;
  spotifySongId: string;
  caption?: string;
  prompt: Schema.Types.ObjectId;
}

const suggestedSongSchema = new Schema<ISuggestedSong>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    spotifySongId: {
      type: String,
      required: [true, "Song ID is required"],
    },
    caption: String,
    prompt: {
      type: Schema.Types.ObjectId,
      ref: Prompt,
      required: [true, "Prompt ID is required"],
    },
  },
  { timestamps: true }
);

export const SuggestedSong: Model<ISuggestedSong> =
  mongoose.model<ISuggestedSong>("SuggestedSong", suggestedSongSchema);
