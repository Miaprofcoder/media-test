const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  const allUsers = await User.find();

  res.status(200).json(allUsers);
});

router.post("/", async (req, res) => {
  try {
    const createdUser = await User.create({
      username: req.body.username,
      email: req.body.email,
    });

    if (createdUser) {
      res.status(200).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const selectedUser = await User.findById(req.params.userId);

    res.status(200).json(selectedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        returnOriginal: false,
      }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "404: userID not found!" });
    }
  } catch (error) {
    console.log(500).json(error);
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const friend = await User.findById(req.params.friendId);
    const addFriend = await User.findByIdAndUpdate(req.params.userId, {
      $push: { friends: friend },
    });

    if (addFriend) {
      res.status(200).json(addFriend);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
