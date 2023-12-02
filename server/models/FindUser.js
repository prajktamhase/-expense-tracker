import { Schema, model } from "mongoose";

const findUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction"
    },
  },
  {
    timestamps: true,
  }
);

const FindUser = model("FindUser", findUserSchema);
export default FindUser;
