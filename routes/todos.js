const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!todo) {
      throw new Error("No Todo Found!");
    }
    res.status(200).json({
      message: "Success",
      data: todo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      throw new Error("No Todo Found!");
    }
    res.status(200).json({
      message: "Success",
      data: null,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
