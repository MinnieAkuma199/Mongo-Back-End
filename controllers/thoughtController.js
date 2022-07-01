const { Thought, User, Reaction } = require("../models");
//not sure if i will use Reaction model or not

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //thoughts is now thought bc sigular
  //Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with that ID 🙃" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Post new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          {
            _id: req.body.userId,
          },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? //will the thought be created here even if the id is not found? find out on compass!
            res.status(404).json({
              message: "No user found with this Id",
            })
          : res.json("Thought has been created!")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};

//need to update a thought by _id and delete a thougth by _id!!
