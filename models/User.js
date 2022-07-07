const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/,
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

const User = model("User", userSchema);
User.findOne({}).then((data) => {
  //if there is no user then create user
  if (!data) {
    User.create(
      {
        username: "kristynd",
        email: "kristyndcb@gmail.com",
      },
      (err) =>
        err ? console.log(err) : console.log("New User has been created!")
    );
  }
});

module.exports = User;
