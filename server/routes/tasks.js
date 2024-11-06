const express = require("express");
const router = express.Router();

const TaskModel = require("../models/Task");

router.post("/", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.json(task);
  } catch (e) {
    res.json({ err: e });
  }
});

router.get("/counter", (req, res) => {
  const promise = TaskModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  promise
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ storyId: req.params.id })
      .populate({
        path: "storyId",
        model: "Story",
      })
      .populate({
        path: "contributors",
        model: "User",
      })
      .populate({
        path: "createdBy",
        model: "User",
      });

    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

//task update
router.put("/update/:id", (req, res) => {
  const promise = TaskModel.findByIdAndUpdate(req.params.id, req.body);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Task Delete
router.delete("/delete/:id", (req, res) => {
  const promise = TaskModel.findByIdAndRemove(req.params.id);
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
