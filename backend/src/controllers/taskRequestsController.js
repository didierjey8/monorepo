const db = require("../config/database");

exports.getAllTaskRequests = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM solicitudes_tareas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task requests" });
  }
};

exports.createTaskRequest = async (req, res) => {
  const {
    soli_id,
    doc_id,
    id_user_responsible,
    task,
    init_date,
    commitment_date,
    completed_date,
    auto_task,
    from_ia,
    status,
    percent_progress,
    communication_sms,
    communication_email,
    communication_call,
    communication_wa,
    request_evidence,
    mark_completed_by_owner,
    comments,
    created_by,
    updated_by,
  } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO solicitudes_tareas (soli_id, doc_id, id_user_responsible, task, init_date, commitment_date, completed_date, auto_task, from_ia, status, percent_progress, communication_sms, communication_email, communication_call, communication_wa, request_evidence, mark_completed_by_owner, comments, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        soli_id,
        doc_id,
        id_user_responsible,
        task,
        init_date,
        commitment_date,
        completed_date,
        auto_task,
        from_ia,
        status,
        percent_progress,
        communication_sms,
        communication_email,
        communication_call,
        communication_wa,
        request_evidence,
        mark_completed_by_owner,
        comments,
        created_by,
        updated_by,
      ]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error creating task request" });
  }
};

exports.getTaskRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM solicitudes_tareas WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task request not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task request" });
  }
};

exports.updateTaskRequest = async (req, res) => {
  const { id } = req.params;
  const {
    soli_id,
    doc_id,
    id_user_responsible,
    task,
    init_date,
    commitment_date,
    completed_date,
    auto_task,
    from_ia,
    status,
    percent_progress,
    communication_sms,
    communication_email,
    communication_call,
    communication_wa,
    request_evidence,
    mark_completed_by_owner,
    comments,
    updated_by,
  } = req.body;
  try {
    await db.query(
      `UPDATE solicitudes_tareas SET soli_id = ?, doc_id = ?, id_user_responsible = ?, task = ?, init_date = ?, commitment_date = ?, completed_date = ?, auto_task = ?, from_ia = ?, status = ?, percent_progress = ?, communication_sms = ?, communication_email = ?, communication_call = ?, communication_wa = ?, request_evidence = ?, mark_completed_by_owner = ?, comments = ?, updated_by = ? WHERE id = ?`,
      [
        soli_id,
        doc_id,
        id_user_responsible,
        task,
        init_date,
        commitment_date,
        completed_date,
        auto_task,
        from_ia,
        status,
        percent_progress,
        communication_sms,
        communication_email,
        communication_call,
        communication_wa,
        request_evidence,
        mark_completed_by_owner,
        comments,
        updated_by,
        id,
      ]
    );
    res.json({ message: "Task request updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating task request" });
  }
};

exports.deleteTaskRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM solicitudes_tareas WHERE id = ?", [id]);
    res.json({ message: "Task request deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task request" });
  }
};
