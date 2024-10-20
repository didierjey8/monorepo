const express = require("express");
const router = express.Router();
const taskPDCAController = require("../controllers/taskPDCAController");

router.get("/", taskPDCAController.getPDCARecords);
router.post("/", taskPDCAController.createPDCARecord);
router.get("/:id", taskPDCAController.getPDCARecordById);
router.put("/:id", taskPDCAController.updatePDCARecord);
router.delete("/:id", taskPDCAController.deletePDCARecord);

module.exports = router;
