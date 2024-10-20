import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import ActivitiesService from "../services/ActivitiesService";
import { useAlert, useAuth } from "../hooks";
import { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TranslationSwitch from "../components/translationSwitch";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const SubmitEvidence = ({ open, onClose, loading, sendActivityEvidence }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const [inputs, setinputs] = useState({
    plan: "",
    do: "",
    check: "",
    act: "",
    comments: "",
    file: null,
  });
  const [viewType, setviewType] = useState(false);

  useEffect(() => {
    if (loading == false) {
      onClose();
      setinputs({
        comments: "",
        file: null,
      });
    }
  }, [loading]);

  function handleChangeType(target) {
    console.log("🚀 ~ handleChangeType ~ target:", target.target.value);
    setviewType(target.target.value);
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      maxWidth="md"
      fullWidth
      fullScreen
      sx={{ padding: "2%", paddingInline: "20%", color: "rgba(16, 24, 40, 1)" }}
    >
      <DialogTitle>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", py: 1 }} color="initial">
            Review contract terms
          </Typography>
          <ClearIcon sx={{ color: "black", cursor: "pointer", fontSize: 25 }} onClick={() => onClose()}></ClearIcon>
        </Stack>
        <Box sx={{ width: "100%", height: "1px", bgcolor: "rgba(208, 213, 221, 1)", my: 1 }}></Box>
        {/* {lang?.EvidencePage_FormTitle} */}
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" sx={{ flexGrow: 1 }} spacing={4}>
          <Stack sx={{ flex: 1, flexGrow: 1 }} gap={1}>
            <TextField id="" label="Tipo de estado" value={viewType} onChange={handleChangeType} sx={{ my: 1 }} select>
              <MenuItem value={true}>Actividad despues de la fecha</MenuItem>
              <MenuItem value={false}>Actividad a tiempo</MenuItem>
            </TextField>

            {viewType == true && (
              <>
                <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
                  P.D.C.A. Form
                </Typography>
                <Typography variant="body1" color="initial">
                  Plan
                </Typography>
                <TextField
                  id=""
                  placeholder="What was the original plan?"
                  value={inputs.plan}
                  onChange={({ target }) => {
                    setinputs({
                      ...inputs,
                      plan: target.value,
                    });
                  }}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1" color="initial">
                  Do
                </Typography>
                <TextField
                  id=""
                  placeholder="What action were taken?"
                  value={inputs.do}
                  onChange={({ target }) => {
                    setinputs({
                      ...inputs,
                      do: target.value,
                    });
                  }}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1" color="initial">
                  Check
                </Typography>
                <TextField
                  id=""
                  placeholder="What were the results?"
                  value={inputs.check}
                  onChange={({ target }) => {
                    setinputs({
                      ...inputs,
                      check: target.value,
                    });
                  }}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1" color="initial">
                  Act
                </Typography>
                <TextField
                  id=""
                  placeholder="What improvement or changes are needed?"
                  value={inputs.act}
                  onChange={({ target }) => {
                    setinputs({
                      ...inputs,
                      act: target.value,
                    });
                  }}
                  sx={{ mb: 1 }}
                />
              </>
            )}

            <Typography variant="h6" sx={{ fontWeight: "bold" }} color="initial">
              Proof of Evidence
            </Typography>
            <Stack gap={2}>
              <Typography variant="body1" color="initial">
                Comments
              </Typography>
              <TextField
                id=""
                placeholder={lang?.EvidencePage_CommentsLabel}
                value={inputs.comments}
                onChange={({ target }) => setinputs({ ...inputs, comments: target.value })}
                sx={{ width: "100%" }}
                type="text"
                multiline
                rows={1}
              />
              <Stack sx={{ alignItems: "center", width: "100%", height: 50, flexFlow: 1 }} gap={1} direction={"row"} spacing={2}>
                <Box sx={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                  <TextField
                    id="evidenceFile"
                    onChange={({ target }) => {
                      setinputs({ ...inputs, file: target.files[0] });
                    }}
                    type="file"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ display: "flex", alignItems: "center", height: 55, paddingInline: 3, mt: 1 }}
                  onClick={() => {
                    document.getElementById("evidenceFile").click();
                  }}
                >
                  <FileUploadOutlinedIcon sx={{ color: "white", cursor: "pointer", fontSize: 20, mr: 1 }}></FileUploadOutlinedIcon> Upload
                </Button>
              </Stack>
              <Stack gap={2} direction="row" sx={{ mt: 4 }}>
                <Stack>
                  <InfoOutlinedIcon sx={{ color: "black", cursor: "pointer", fontSize: 25 }}></InfoOutlinedIcon>
                </Stack>
                <Stack gap={0} direction="column">
                  <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
                    AI Engagement
                  </Typography>
                  <Typography variant="body1" color="initial">
                    AI will send reminders via SMS/call before the engagement date (2024-10-22).
                  </Typography>
                </Stack>
              </Stack>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => sendActivityEvidence(inputs)}>
                {loading == true ? (
                  <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress
                      sx={{
                        color: "white",
                      }}
                      size={20}
                    ></CircularProgress>
                  </Box>
                ) : (
                  lang?.EvidencePage_SendEvidence
                )}
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ width: "1px", bgcolor: "rgba(208, 213, 221, 1)" }}></Box>
          <Stack sx={{ flex: 0.5 }} direction={"column"} gap={2}>
            <Typography variant="body1" color="initial" sx={{ display: "flex", alignItems: "center" }} gap={1}>
              Properties <InfoOutlinedIcon sx={{ color: "rgba(71, 84, 103, 1)", cursor: "pointer", fontSize: 20 }}></InfoOutlinedIcon>
            </Typography>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100%" }}>
              {viewType == true && (
                <>
                  <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{
                      bgcolor: "rgba(239, 68, 68, 0.15)",
                      display: "flex",
                      p: 0.5,
                      px: 2,
                      borderRadius: 0.5,
                      color: "rgba(239, 68, 68, 1)",
                    }}
                  >
                    Overdue
                  </Typography>
                </>
              )}
              {viewType == false ? (
                <>
                  <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                    Status
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{
                      bgcolor: "rgb(102 239 68 / 15%)",
                      display: "flex",
                      p: 0.5,
                      px: 2,
                      borderRadius: 0.5,
                      color: "rgb(48 186 31)",
                    }}
                  >
                    Overdue
                  </Typography>
                </>
              ) : null}
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                Priority
              </Typography>
              <Typography variant="body1" color="initial">
                High
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                Start Date
              </Typography>
              <Typography variant="body1" color="initial">
                2024-10-20
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                Delivery Date
              </Typography>
              <Typography variant="body1" color="initial">
                2024-10-25
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="body1" sx={{ color: "rgba(71, 84, 103, 1)" }}>
                Engagement Date
              </Typography>
              <Typography variant="body1" color="initial">
                2024-10-22
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const EditEvidence = ({ open, onClose, loading, editActivityEvidence, data }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const [inputs, setinputs] = useState({
    id: -1,
    comments: "",
  });

  useEffect(() => {
    if (loading == false) {
      onClose();
      setinputs({
        comments: "",
        file: null,
      });
    }
  }, [loading]);

  useEffect(() => {
    setinputs({
      id: data.id,
      comments: data.comments,
    });
  }, [data]);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.EvidencePage_MarkActivityEditEvidence}</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            padding: 0,
            margin: 0,
          }}
        >
          <Stack direction="column" sx={{ width: 400, flexGrow: 1, padding: 2 }} justifyContent="center" alignItems="center" spacing={3}>
            <TextField
              id=""
              label={lang?.EvidencePage_CommentsLabel}
              value={inputs.comments}
              onChange={({ target }) => setinputs({ ...inputs, comments: target.value })}
              sx={{ width: "100%" }}
              type="text"
              multiline
              rows={4}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          {lang?.EvidencePage_Cancel}
        </Button>
        <Button onClick={() => editActivityEvidence(inputs)} color="primary">
          {loading == true ? (
            <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress
                sx={{
                  color: "white",
                }}
                size={20}
              ></CircularProgress>
            </Box>
          ) : (
            lang?.EvidencePage_SendEvidence
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmDeleteActivity = ({ open, onClose, confirm, loading }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  useEffect(() => {
    if (loading == false) {
      onClose();
    }
  }, [loading]);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.EvidencePage_DeleteEvidence}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Typography variant="h6" color="initial">
          {lang?.EvidencePage_ConfirmDeleteMessage}
        </Typography>
        <Typography variant="body1" color="initial">
          {lang?.EvidencePage_DeleteWarning}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          {lang?.EvidencePage_Cancel}
        </Button>
        <Button
          onClick={() => {
            confirm();
          }}
          color="primary"
        >
          {loading == true ? (
            <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress
                sx={{
                  color: "white",
                }}
                size={20}
              ></CircularProgress>
            </Box>
          ) : (
            lang?.EvidencePage_Delete
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActivityEvidence = () => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const alert = useAlert();
  const { soli_id, id_task } = useParams();
  const [evidences, setevidences] = useState([]);
  const [modal, setmodal] = useState("");
  const [loadingSendEvidence, setloadingSendEvidence] = useState(false);
  const [loadingDeleteEvidence, setloadingDeleteEvidence] = useState(false);
  const [loadingEditEvidence, setloadingEditEvidence] = useState(false);
  const [loadingCompleteActivity, setloadingCompleteActivity] = useState(false);
  const [editEvidenceID, seteditEvidenceID] = useState({
    id: -1,
    comments: "",
  });
  const [deleteEvidenceID, setdeleteEvidenceID] = useState({
    id: null,
    comments: null,
  });
  const [activityStatus, setactivityStatus] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: lang?.EvidencePage_EvidenceID,
        size: 40,
      },
      {
        accessorKey: "id_solicitud_tarea",
        id: "id_solicitud_tarea",
        header: lang?.EvidencePage_ActivityID,
        size: 40,
      },
      {
        accessorKey: "comments",
        id: "comments",
        header: lang?.EvidencePage_CommentsField,
        size: 40,
      },
      {
        accessorKey: "status",
        id: "status",
        header: lang?.EvidencePage_Status,
        size: 40,
      },
      {
        accessorKey: "created_at",
        id: "created_at",
        header: lang?.EvidencePage_CreationDate,
        size: 40,
      },
      {
        accessorKey: "updated_at",
        id: "updated_at",
        header: lang?.EvidencePage_LastUpdate,
        size: 40,
      },
      {
        accessorKey: "url_evidence_fileblocks",
        id: "url_evidence_fileblocks",
        header: lang?.EvidencePage_EvidenceURL,
        size: 40,
        Cell: ({ row: { original } }) => {
          return (
            <a href={original.url_evidence_fileblocks} target="_blank" rel="noreferrer">
              {original.url_evidence_fileblocks.length > 50
                ? original.url_evidence_fileblocks.substring(0, 50) + "..."
                : original.url_evidence_fileblocks}
            </a>
          );
        },
      },
      {
        accessorKey: "acciones",
        id: "acciones",
        header: lang?.EvidencePage_Actions,
        size: 40,
        Cell: ({ row: { original } }) => {
          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box>
                <DeleteForeverIcon
                  sx={{ fontSize: 25, cursor: "pointer" }}
                  onClick={() => {
                    setdeleteEvidenceID({
                      id: original.id,
                      comments: original.comments,
                    });
                    setmodal("confirmDelete");
                  }}
                ></DeleteForeverIcon>
              </Box>
              <EditIcon
                sx={{ fontSize: 25, cursor: "pointer" }}
                onClick={() => {
                  seteditEvidenceID(original);
                  setmodal("update");
                }}
              ></EditIcon>
            </Stack>
          );
        },
      },
    ],
    [lang]
  );

  function sendActivityEvidence(inputs) {
    setloadingSendEvidence(true);
    const data = new FormData();
    data.append("soli_id", soli_id);
    data.append("id_task", id_task);
    data.append("comments", inputs.comments);
    data.append("file", inputs.file);

    ActivitiesService.sendctivityEvidence({ data: data })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.EvidencePage_EvidenceSentSuccess);
          getEvidenceData();
        }
      })
      .catch((err) => {
        alert.error(lang?.EvidencePage_EvidenceSendError);
      })
      .finally(() => {
        setloadingSendEvidence(false);
      });
  }

  function getEvidenceData() {
    const data = {
      id_task: id_task,
    };
    ActivitiesService.getctivityEvidence({
      data: data,
    })
      .then((result) => {
        if (result.status === true) {
          setevidences(result.data.evidences);
        }
      })
      .catch((err) => {
        console.log("Error fetching evidence data:", err);
      });
  }

  function deleteEvidence() {
    setloadingDeleteEvidence(true);
    const data = {
      id_task_evidence: deleteEvidenceID.id,
    };
    ActivitiesService.deleteativityEvidence({
      data: data,
    })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.EvidencePage_EvidenceDeletedSuccess);
          setmodal("");
          setdeleteEvidenceID(-1);
          getEvidenceData();
        }
      })
      .catch((err) => {
        alert.error(lang?.EvidencePage_EvidenceDeleteError);
      })
      .finally(() => {
        setloadingDeleteEvidence(false);
      });
  }

  function editActivityEvidence(input) {
    const data = {
      id_task_evidence: input.id,
      comments: input.comments,
    };

    ActivitiesService.editativityEvidence({
      data: data,
    })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.EvidencePage_EvidenceUpdatedSuccess);
          setmodal("");
          seteditEvidenceID({
            id: -1,
            comments: "",
          });
        }
      })
      .catch((err) => {
        console.log("Error editing evidence:", err);
      })
      .finally(() => {
        getEvidenceData();
      });
  }

  function completedActivity() {
    setloadingCompleteActivity(true);
    const data = {
      soli_id: soli_id,
      tasks: [
        {
          id_task: id_task,
        },
      ],
    };

    ActivitiesService.completeTasksFromSoli({ data })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.EvidencePage_ActivityConfirmedSuccess);
          getEvidenceData();
          getStatusActivity();
        }
      })
      .catch((err) => {
        alert.error(lang?.EvidencePage_EvidenceConfirmError);
      })
      .finally(() => {
        setloadingCompleteActivity(false);
      });
  }

  function marKasProgressActivity() {
    setloadingCompleteActivity(true);
    const data = {
      soli_id: soli_id,
      tasks: [
        {
          id_task: id_task,
        },
      ],
    };

    ActivitiesService.progressTasksFromSoli({ data })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.EvidencePage_ActivityProgressSuccess);
          getEvidenceData();
          getStatusActivity();
        }
      })
      .catch((err) => {
        alert.error(lang?.EvidencePage_EvidenceConfirmError);
      })
      .finally(() => {
        setloadingCompleteActivity(false);
      });
  }

  function getStatusActivity() {
    const data = {
      id_task: id_task,
    };

    ActivitiesService.readTaskSoliStatusLogs({
      data: data,
    })
      .then((result) => {
        if (result.status === true) {
          setactivityStatus(result.data?.status_logs[0] ? result.data.status_logs[0]?.status_after : null);
        }
      })
      .catch((err) => {
        console.log("Error fetching activity status:", err);
      });
  }

  useEffect(() => {
    getEvidenceData();
    getStatusActivity();
  }, []);

  return (
    <>
      <Box sx={{ padding: 3, pb: 0 }}>
        <TranslationSwitch></TranslationSwitch>
      </Box>
      <Box sx={{ padding: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Button variant="contained" color="primary" onClick={() => setmodal("submitEvidence")}>
            {lang?.EvidencePage_SendNewEvidence}
          </Button>
          {activityStatus == "pending" || activityStatus == null ? (
            <Button variant="contained" color="primary" onClick={() => marKasProgressActivity()}>
              {loadingCompleteActivity ? (
                <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={20}
                  ></CircularProgress>
                </Box>
              ) : (
                lang?.EvidencePage_MarkActivityInProgress
              )}
            </Button>
          ) : null}
          {activityStatus == "in_progress_at_time" || activityStatus == "in_progress_behind_schedule" ? (
            <Button variant="contained" color="primary" onClick={() => completedActivity()}>
              {loadingCompleteActivity ? (
                <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={20}
                  ></CircularProgress>
                </Box>
              ) : (
                lang?.EvidencePage_MarkActivityCompleted
              )}
            </Button>
          ) : null}
        </Stack>
        <MaterialReactTable
          columns={columns}
          data={evidences ? evidences.reverse() : []}
          state={{ showSkeletons: false }}
          localization={MRT_Localization_ES}
          density="compact"
          enableDensityToggle={true}
          initialState={{ density: "compact" }}
        />
        <SubmitEvidence
          sendActivityEvidence={sendActivityEvidence}
          loading={loadingSendEvidence}
          open={modal == "submitEvidence"}
          onClose={() => setmodal("")}
          lang={lang}
        ></SubmitEvidence>

        <ConfirmDeleteActivity
          confirm={deleteEvidence}
          loading={loadingDeleteEvidence}
          open={modal == "confirmDelete"}
          onClose={() => setmodal("")}
          lang={lang}
        ></ConfirmDeleteActivity>

        <EditEvidence
          editActivityEvidence={editActivityEvidence}
          loading={loadingEditEvidence}
          open={modal == "update"}
          onClose={() => setmodal("")}
          data={editEvidenceID}
          lang={lang}
        ></EditEvidence>
      </Box>
    </>
  );
};

export default ActivityEvidence;
