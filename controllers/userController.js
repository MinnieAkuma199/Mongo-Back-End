const User = require("../models/User");

module.exports = {
  //USER
  //get All users
  getAllUsers(req, res) {
    User.find()
      //i passed in users bc plural w/ getAll
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      //now user is singular
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID 😭" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },
  //update existing user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID 😭" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete existing user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID 😭" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // FRIENDS
  //add
  addFriend(req, res) {
    // console.log("A friend has been added");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID 😭" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete
  deleteFriend(req, res) {
    // console.log("Friend has been deleted!");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID 😭" })
          : res.json({ message: "You two are no longer friends! DELETED" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
