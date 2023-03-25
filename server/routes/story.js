const express = require("express");
const router = express.Router();

const StoryModel = require("../models/Story");

router.get("/count", (req, res) => {
  const promise = StoryModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  promise
    .then((count) => {
      // console.log(count);
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", async (req, res) => {
  try {
    const story = new StoryModel(req.body);
    await story.save();
    res.json(story);
  } catch (e) {
    res.json({ message: "Story not found", code: "0", e });
  }
});

router.get("/", (req, res) => {
  const promise = StoryModel.find({});
  promise
    .then((data) => {
      if (!data) res.json({ message: [], code: 5 });
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//Story Update
router.get("/:id", (req, res) => {
  const promise = StoryModel.findOne({ storyId: parseInt(req.params.id) });
  promise
    .then((data) => {
      if (!data) res.json({ message: [], code: 5 });
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Story delete
router.delete("/delete/:id", (req, res) => {
  const promise = StoryModel.findByIdAndRemove(req.params.id);
  promise
    .then((count) => {
      if (count == null) res.json({ status: "0" });
      res.json({ status: "1" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
