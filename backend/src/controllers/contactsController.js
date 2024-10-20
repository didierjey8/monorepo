const db = require("../config/database");

exports.getAllContacts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contactos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

exports.createContact = async (req, res) => {
  const { c_name, c_lastname, c_documentType, c_document, c_email, c_phone, c_profile, c_token, c_registration, c_user, footercharge, c_address } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO contactos (c_name, c_lastname, c_documentType, c_document, c_email, c_phone, c_profile, c_token, c_registration, c_user, footercharge, c_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [c_name, c_lastname, c_documentType, c_document, c_email, c_phone, c_profile, c_token, c_registration, c_user, footercharge, c_address]
    );
    res.json({ idReg: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error creating contact" });
  }
};

exports.getContactById = async (req, res) => {
  const { idReg } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM contactos WHERE idReg = ?", [idReg]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact" });
  }
};

exports.updateContact = async (req, res) => {
  const { idReg } = req.params;
  const { c_name, c_lastname, c_documentType, c_document, c_email, c_phone, c_profile, c_token, c_registration, c_user, footercharge, c_address } = req.body;
  try {
    await db.query(
      `UPDATE contactos SET c_name = ?, c_lastname = ?, c_documentType = ?, c_document = ?, c_email = ?, c_phone = ?, c_profile = ?, c_token = ?, c_registration = ?, c_user = ?, footercharge = ?, c_address = ? WHERE idReg = ?`,
      [c_name, c_lastname, c_documentType, c_document, c_email, c_phone, c_profile, c_token, c_registration, c_user, footercharge, c_address, idReg]
    );
    res.json({ message: "Contact updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating contact" });
  }
};

exports.deleteContact = async (req, res) => {
  const { idReg } = req.params;
  try {
    await db.query("DELETE FROM contactos WHERE idReg = ?", [idReg]);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
};
