const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      // [{ type: Schema.Types.ObjectId, ref: "User" }], do i use this one or the one below like it is in the readme?
      type: String,
      required: true,
    },
    //do i need to require in Reaction model bc of this?? or can i do this just like this??
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//retrieves the length of the reactions in the Thought model
//getter function
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
