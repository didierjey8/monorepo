const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

router.get("/", contactsController.getAllContacts);
router.post("/", contactsController.createContact);
router.get("/:idReg", contactsController.getContactById);
router.put("/:idReg", contactsController.updateContact);
router.delete("/:idReg", contactsController.deleteContact);

module.exports = router;
