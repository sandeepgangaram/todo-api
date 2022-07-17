const express = require("express");
const cors = require("cors");
const path = require("path");

const TodoRouter = require("./routes/todos");
const Todo = require("./models/Todo");
const seed = require("./helpers/seed");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(`/seed/${process.env.DATABASE_PASSWORD}`, async (req, res) => {
  try {
    await Todo.deleteMany();
    await Todo.insertMany(seed);

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/api/todos", TodoRouter);

module.exports = app;
