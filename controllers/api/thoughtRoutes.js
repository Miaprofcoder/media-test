const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find();

    res.status(200).json(allThoughts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    res.status(200).json(thought);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const selectedUser = await User.findOne({ username: req.body.username });
    if (selectedUser) {
      const createdThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });

      const usernameThought = await User.findOneAndUpdate(
        {
          username: req.body.username,
        },
        {
          $push: { thoughts: createdThought },
        },
        {
          returnOriginal: false,
        }
      );

      res
        .status(200)
        .json({ message: "Thought created!", createdThought, usernameThought });
    } else res.status(400).json({ message: "Username invalid!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
