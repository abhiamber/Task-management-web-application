var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks");
var storiesRouter = require("./routes/story");
var app = express();
let cors = require("cors");
const connect = require("./config/db");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/story", storiesRouter);

app.listen(8080, async () => {
  await connect();
  console.log("server is working");
});
