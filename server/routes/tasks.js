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

router.get("/:id", (req, res) => {
  const promise = TaskModel.aggregate([
    {
      $match: {
        storyId: parseInt(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "contributors",
        foreignField: "_id",
        as: "contributors",
      },
    },
    {
      $unwind: {
        path: "$contributors",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          content: "$content",
          title: "$title",
          status: "$status",
          date: "$date",
          color: "$color",
          dueDate: "$dueDate",
          createdBy: "$createdBy",
        },
        contributors: {
          $push: "$contributors",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        content: "$_id.content",
        title: "$_id.title",
        status: "$_id.status",
        date: "$_id.date",
        dueDate: "$_id.dueDate",
        color: "$_id.color",
        createdBy: "$_id.createdBy",
        contributors: "$contributors",
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//for testign no used
router.get("/task/:id", (req, res) => {
  const promise = TaskModel.aggregate([
    {
      $match: {
        _id: parseInt(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "contributors",
        foreignField: "_id",
        as: "contributors",
      },
    },
    {
      $unwind: {
        path: "$contributors",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          content: "$content",
          title: "$title",
          status: "$status",
          date: "$date",
          color: "$color",
          dueDate: "$dueDate",
          createdBy: "$createdBy",
        },
        contributors: {
          $push: "$contributors",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        content: "$_id.content",
        title: "$_id.title",
        status: "$_id.status",
        date: "$_id.date",
        dueDate: "$_id.dueDate",
        color: "$_id.color",
        createdBy: "$_id.createdBy",
        contributors: "$contributors",
      },
    },
  ]);
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//todo update
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

//Task Deelete
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
