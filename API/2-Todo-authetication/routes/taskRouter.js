// User Router Middleware

const express = require("express");

const authHandler = require("../middleware/authHandler");

const {
  create_a_task,
  get_a_task,
  get_all_tasks,
  update_a_task,
  delete_a_task,
} = require("../controllers/taskController.js");

const taskRouter = express
  .Router()
  .post("/task", authHandler, create_a_task)
  .get("/tasks", authHandler, get_all_tasks)
  .get("/task/:id", authHandler, get_a_task)
  .put("/task/:id", authHandler, update_a_task)
  .delete("/task/:id", authHandler, delete_a_task);

module.exports = taskRouter;
