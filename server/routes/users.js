const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);

    await user.save();
    res.json(user);
  } catch (e) {
    res.json({ message: "User not found", code: "0", err: e });
  }
});

router.get("/", (req, res, next) => {
  const promise = User.find({});
  promise
    .then((data) => {
      if (!data) res.json({ message: "no", code: 5 });
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
//User Update

//User delete
router.delete("/delete/:id", (req, res) => {
  const promise = User.findByIdAndRemove(req.params.id);
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
