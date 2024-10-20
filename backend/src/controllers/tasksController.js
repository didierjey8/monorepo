exports.getTasks = (req, res) => {
  res.send("Get all tasks");
};

exports.createTask = (req, res) => {
  res.send("Create a new task");
};

exports.getTaskById = (req, res) => {
  res.send(`Get task with ID: ${req.params.id}`);
};

exports.updateTask = (req, res) => {
  res.send(`Update task with ID: ${req.params.id}`);
};

exports.deleteTask = (req, res) => {
  res.send(`Delete task with ID: ${req.params.id}`);
};
