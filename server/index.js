let express = require("express");
require("dotenv").config();
let PORT = process.env.PORT || 8080;

let cookieParser = require("cookie-parser");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let tasksRouter = require("./routes/tasks");
let storiesRouter = require("./routes/story");
let app = express();
let cors = require("cors");
const { connect } = require("./config/db");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/story", storiesRouter);

app.listen(PORT, async () => {
  await connect();
  console.log(`server is working on ${PORT}`);
});
