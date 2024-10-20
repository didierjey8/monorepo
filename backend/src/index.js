const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

const tasksRoutes = require("./routes/tasks");
const tasksEvidencesRoutes = require("./routes/tasksEvidences");
const taskPDCARoutes = require("./routes/taskPDCA");
const taskRequestsRoutes = require("./routes/taskRequests");
const contactsRoutes = require("./routes/contacts");
const blockchainRoutes = require("./routes/blockchain");
const callRoutes = require("./routes/call");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/tasks-evidences", tasksEvidencesRoutes);
app.use("/api/task-pdca", taskPDCARoutes);
app.use("/api/task-requests", taskRequestsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/blockchain", blockchainRoutes);
app.use("/api/call", callRoutes);

db.getConnection()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
