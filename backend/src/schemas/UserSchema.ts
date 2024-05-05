import mongoose, { Schema, Document, Model } from "mongoose";
import { SuggestedSong } from "../schemas/SuggestedSongSchema";

export interface IUser extends Document {
  email: string;
  displayName?: string;
  password: string;
  accountCreationDate: Date;
  streakCount: number;
  likedSongs: Array<Schema.Types.ObjectId>;
  suggestedSongs: Array<Schema.Types.ObjectId>;
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
    password: {
      type: String,
      required: [true, "Username is required"],
    },
    accountCreationDate: {
      type: Date,
      required: [true, "Account creation date is required"],
    },
    streakCount: {
      type: Number,
      required: [true, "Streak count is required"],
    },
    likedSongs: {
      type: [{ type: Schema.Types.ObjectId, ref: SuggestedSong }],
      required: [true, "Liked songs is required"],
    },
    suggestedSongs: {
      type: [{ type: Schema.Types.ObjectId, ref: SuggestedSong }],
      required: [true, "Suggested songs is required"],
    },
    profilePic: String,
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
