exports.getPDCARecords = (req, res) => {
  res.send("Get all task PDCA records");
};

exports.createPDCARecord = (req, res) => {
  res.send("Create a new task PDCA record");
};

exports.getPDCARecordById = (req, res) => {
  res.send(`Get task PDCA record with ID: ${req.params.id}`);
};

exports.updatePDCARecord = (req, res) => {
  res.send(`Update task PDCA record with ID: ${req.params.id}`);
};

exports.deletePDCARecord = (req, res) => {
  res.send(`Delete task PDCA record with ID: ${req.params.id}`);
};
