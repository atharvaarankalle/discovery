import mongoose, { Schema, Document, Model } from "mongoose";
import { ISuggestedSong } from "./SuggestedSongSchema";

export interface IUser extends Document {
  email: string;
  displayName?: string;
  accountCreationDate: Date;
  streakCount: number;
  likedSongs?: Array<Schema.Types.ObjectId>;
  suggestedSongs?: Array<Schema.Types.ObjectId>;
  profilePic?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    displayName: String,
    accountCreationDate: {
      Date,
      required: [true, "Account creation date is required"],
    },
    streakCount: {
      Number,
      required: [true, "Streak count is required"],
    },
    likedSongs: [{ type: Schema.Types.ObjectId, ref: "SuggestedSong" }],
    suggestedSongs: [{ type: Schema.Types.ObjectId, ref: "SuggestedSong" }],
    profilePic: String,
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
