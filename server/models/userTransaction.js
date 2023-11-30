import { Schema, model } from "mongoose";

const userTransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    tracsaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction"
    },

  },
  {
    timestamps: true,
  }
);

const UserTransaction = model("UserTransaction", userTransactionSchema);
export default UserTransaction;
