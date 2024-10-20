const express = require("express");
const router = express.Router();
const tasksEvidencesController = require("../controllers/tasksEvidencesController");

router.get("/", tasksEvidencesController.getEvidences);
router.post("/", tasksEvidencesController.createEvidence);
router.get("/:id", tasksEvidencesController.getEvidenceById);
router.put("/:id", tasksEvidencesController.updateEvidence);
router.delete("/:id", tasksEvidencesController.deleteEvidence);

module.exports = router;
