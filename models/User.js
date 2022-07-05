const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: "/^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/",
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", //referencing the thought model for the id
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", //self-reference
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
