exports.getEvidences = (req, res) => {
  res.send("Get all task evidences");
};

exports.createEvidence = (req, res) => {
  res.send("Create a new task evidence");
};

exports.getEvidenceById = (req, res) => {
  res.send(`Get task evidence with ID: ${req.params.id}`);
};

exports.updateEvidence = (req, res) => {
  res.send(`Update task evidence with ID: ${req.params.id}`);
};

exports.deleteEvidence = (req, res) => {
  res.send(`Delete task evidence with ID: ${req.params.id}`);
};
