const express = require("express");
const router = express.Router();
const taskRequestsController = require("../controllers/taskRequestsController");

router.get("/", taskRequestsController.getAllTaskRequests);
router.post("/", taskRequestsController.createTaskRequest);
router.get("/:id", taskRequestsController.getTaskRequestById);
router.put("/:id", taskRequestsController.updateTaskRequest);
router.delete("/:id", taskRequestsController.deleteTaskRequest);

module.exports = router;
