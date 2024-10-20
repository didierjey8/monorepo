import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import IAService from "../../services/IAServices";
import { useAlert, useAuth } from "../../hooks";
import SearchContacts from "../SearchContacts";
import ClearIcon from "@mui/icons-material/Clear";
import ActivitiesService from "../../services/ActivitiesService";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 as uuidv4 } from "uuid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const CreateActivityModal = ({ open, onClose, saveInputsData, loading }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const [inputs, setinputs] = useState({
    responsable: null,
    tarea: "",
    fecha_inicio: "00-00-00",
    fecha_compromiso: "00-00-00",
  });

  function clearInputs() {
    setinputs({
      responsable: null,
      tarea: "",
      fecha_inicio: "00-00-00",
      fecha_compromiso: "00-00-00",
    });
  }

  useEffect(() => {
    if (loading == false) {
      clearInputs();
      onClose();
    }
  }, [loading]);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.Activities_CrearNuevaActividad}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Box>
          <Stack direction={"column"} sx={{ p: 1 }} gap={2}>
            <Box sx={{ pb: 1 }}>
              <SearchContacts
                disabledKeys={[]}
                onClick={(contact) => {
                  setinputs({ ...inputs, responsable: contact });
                }}
                height={55}
                resultPosition="relative"
              ></SearchContacts>
            </Box>
            {inputs.responsable && (
              <Stack sx={{ pb: 1 }}>
                <TextField
                  label={lang?.Activities_Responsable1}
                  value={inputs.responsable.correo}
                  size="medium"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setinputs({ ...inputs, responsable: null })}>
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}

            <TextField
              label={lang?.Activities_NombreDeLaActividad1}
              value={inputs.tarea}
              onChange={(e) => setinputs({ ...inputs, tarea: e.target.value })}
              size="medium"
            />
          </Stack>
          <Stack direction={"row"} sx={{ p: 1, pt: 3, width: "100%" }} gap={2}>
            <TextField
              label={lang?.Activities_FechaDeInicio1}
              value={inputs.fecha_inicio}
              onChange={(e) => setinputs({ ...inputs, fecha_inicio: e.target.value })}
              type="date"
              sx={{ width: "50%" }}
            />
            <TextField
              label={lang?.Activities_FechaDeCompromiso1}
              value={inputs.fecha_compromiso}
              onChange={(e) => setinputs({ ...inputs, fecha_compromiso: e.target.value })}
              type="date"
              sx={{ width: "50%" }}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearInputs();
            onClose();
          }}
          color="primary"
        >
          {lang?.Activities_Cancel1}
        </Button>
        <Button
          onClick={() => {
            saveInputsData(inputs);
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
            lang?.Activities_CrearNuevaActividad
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// =======================================================================================================
const UpdateActivityModal = ({ open, onClose, editInputsData, loading, editActivityData, soli_id }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const [inputs, setinputs] = useState({
    responsable: null,
    tarea: "",
    fecha_inicio: "00-00-00",
    fecha_compromiso: "00-00-00",
    update_contact: false,
  });

  useEffect(() => {
    if (editActivityData) {
      console.log(editActivityData);

      /* const date = new Date(editActivityData.fecha_compromiso);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`; */
      setinputs({
        responsable: editActivityData.responsable,
        tarea: editActivityData.tarea,
        fecha_inicio: editActivityData.init_date || "00-00-00",
        fecha_compromiso: editActivityData.fecha_compromiso,
        update_contact: false,
      });
    }
  }, [editActivityData]);

  function clearInputs() {
    setinputs({
      responsable: null,
      tarea: "",
      fecha_inicio: "00-00-00",
      fecha_compromiso: "00-00-00",
      update_contact: false,
    });
  }

  useEffect(() => {
    if (loading == false) {
      clearInputs();
      onClose();
    }
  }, [loading]);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.Activities_EditarActividad1}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Box>
          <Stack direction={"column"} sx={{ p: 1 }} gap={2}>
            <Box sx={{ pb: 1 }}>
              <SearchContacts
                disabledKeys={[]}
                onClick={(contact) => {
                  setinputs({ ...inputs, responsable: contact, update_contact: true });
                  // // // // // // // // // // // console.log("🚀 ~ contact:", contact);
                }}
                height={55}
                resultPosition="relative"
              ></SearchContacts>
            </Box>
            {inputs.responsable && (
              <Stack sx={{ pb: 1 }}>
                <TextField
                  label={lang?.Activities_Responsable1}
                  value={inputs.responsable?.c_email ? inputs.responsable?.c_email : inputs.responsable?.correo}
                  size="medium"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setinputs({ ...inputs, responsable: null })}>
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}

            <TextField
              label={lang?.Activities_NombreDeLaActividad1}
              value={inputs.tarea}
              onChange={(e) => setinputs({ ...inputs, tarea: e.target.value })}
              size="medium"
            />
          </Stack>
          <Stack direction={"row"} sx={{ p: 1, pt: 3, width: "100%" }} gap={2}>
            <TextField
              label={lang?.Activities_FechaDeInicio1}
              value={inputs.fecha_inicio}
              onChange={(e) => setinputs({ ...inputs, fecha_inicio: e.target.value })}
              type="date"
              sx={{ width: "50%" }}
            />
            <TextField
              label={lang?.Activities_FechaDeCompromiso1}
              value={inputs.fecha_compromiso}
              onChange={(e) => setinputs({ ...inputs, fecha_compromiso: e.target.value })}
              type="date"
              sx={{ width: "50%" }}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearInputs();
            onClose();
          }}
          color="primary"
        >
          {lang?.Activities_Cancel1}
        </Button>
        <Button
          onClick={() => {
            editInputsData(editActivityData, inputs);
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
            lang?.Activities_EditarActividad1
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// =======================================================================================================
const ShowLinkActivity = ({ open, onClose, soli_id, activityID }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const alert = useAlert();
  const [inputs, setinputs] = useState({
    activityLink: `http://localhost:5173/activityEvidence/${soli_id}/${activityID}`,
  });

  function copyLink() {
    navigator.clipboard
      .writeText(inputs.activityLink)
      .then(() => {
        alert.success(lang?.Activities_LinkCopiadoAlPortapapeles);
        console.log("Text copied to clipboard!");
      })
      .catch((error) => {
        alert.error(lang?.Activities_ErrorAlCopiarElLink);
        console.error("Error copying text:", error);
      });
  }

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.Activities_EnlaceDeLaActividad1}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Box>
          {/*  <Typography variant="body1" color="initial">
            {lang?.Activities_SeleccionarMedioDeContacto}
          </Typography>
          <FormControl>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
              <Stack direction={"row"}>
                <FormControlLabel
                  value={lang?.Activities_CorreoElectronico}
                  control={<Radio />}
                  label={lang?.Activities_CorreoElectronico}
                />
                <FormControlLabel value={lang?.Activities_Whatsapp} control={<Radio />} label={lang?.Activities_Whatsapp} />
                <FormControlLabel
                  value={lang?.Activities_LlamadaTelefonica}
                  control={<Radio />}
                  label={lang?.Activities_LlamadaTelefonica}
                />
              </Stack>
            </RadioGroup>
          </FormControl> */}
          <Stack direction={"column"} sx={{ p: 1, mt: 2 }} gap={2}>
            <TextField
              label={lang?.Activities_EnlaceDeLaActividad1}
              value={inputs.activityLink}
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => copyLink()}>
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          {lang?.Activities_Volver1}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// =======================================================================================================
const ShowActivityEvidences = ({ open, onClose, soli_id, id_task, completedActivity, loading }) => {
  const [evidences, setevidences] = useState([]);
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: lang?.Activities_IDEvidencia,
        size: 40,
      },
      {
        accessorKey: "id_solicitud_tarea",
        id: "id_solicitud_tarea",
        header: lang?.Activities_IDDeActividad,
        size: 40,
      },
      {
        accessorKey: "comments",
        id: "comments",
        header: lang?.Activities_Comentarios,
        size: 40,
      },
      {
        accessorKey: "status",
        id: "status",
        header: lang?.Activities_Status,
        size: 40,
      },

      {
        accessorKey: "created_at",
        id: "created_at",
        header: lang?.Activities_FechaDeCreacion,
        size: 40,
      },
      {
        accessorKey: "updated_at",
        id: "updated_at",
        header: lang?.Activities_UltimaActualizacion,
        size: 40,
      },
      {
        accessorKey: "url_evidence_fileblocks",
        id: "url_evidence_fileblocks",
        header: lang?.Activities_URLEvidencia,
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
    ],
    [lang]
  );

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
        // // // // // // // // // // // console.log("🚀 ~ getEvidenceData ~ result:", result)
      })
      .catch((err) => {
        // // // // // // // // // // // console.log("🚀 ~ getEvidenceData ~ err:", err)
      })
      .finally(() => {});
  }

  useEffect(() => {
    if (open == true) {
      getEvidenceData();
    } else {
      setevidences([]);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth={true} fullScreen={true} maxWidth={"lg"} scroll="paper" sx={{ padding: 15 }}>
        <DialogTitle>{lang?.Activities_ListaDeEvidencias}</DialogTitle>
        <DialogContent>
          <MaterialReactTable
            columns={columns}
            data={evidences ? evidences.reverse() : []}
            state={{ showSkeletons: false }}
            localization={MRT_Localization_ES}
            density="compact"
            enableDensityToggle={true}
            initialState={{ density: "compact" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}} color="primary">
            {lang?.Activities_Volver1}
          </Button>
          <Button
            onClick={() => {
              completedActivity({ soli_id, id_task });
            }}
            color="primary"
          >
            {loading ? (
              <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress
                  sx={{
                    color: "white",
                  }}
                  size={20}
                ></CircularProgress>
              </Box>
            ) : (
              lang?.Activities_MarcarActividadCompletada
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// =======================================================================================================
const ConfirmDeleteActivity = ({ open, onClose, confirm, loading, deleteActivity }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();

  const [inputs, setinputs] = useState({
    activityLink: "http://localhost:5173/activity/6525d128214c1",
  });

  useEffect(() => {
    if (loading == false) {
      onClose();
    }
  }, [loading]);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>{lang?.Activities_EliminarActividad}</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <Typography variant="h6" color="initial">
          {lang?.titleDeleteActibity}
        </Typography>
        <Typography variant="body1" color="initial">
          {lang?.Activities_AccionNoSePuedeDeshacer}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
          color="primary"
        >
          {lang?.Activities_Cancelar}
        </Button>
        <Button
          onClick={() => {
            deleteActivity();
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
            lang?.Activities_Eliminar
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
// =======================================================================================================
// =======================================================================================================

const ActivitiesModal = ({ open, onClose, soli_id }) => {
  const [{ lang }, { setUser, setToken, setLang }] = useAuth();
  const alert = useAlert();
  const [{ token }] = useAuth();
  const [Activities, setActivities] = useState([]);
  const [modal, setmodal] = useState("");
  const [editActivityData, seteditActivityData] = useState(null);

  //states para botones de carga
  const [loadingCreateActivity, setloadingCreateActivity] = useState(false);
  const [loadingRegenerateSuggest, setloadingRegenerateSuggest] = useState(false);
  const [loadingEditActibity, setloadingEditActibity] = useState(false);
  const [loadingDeleteActivity, setloadingDeleteActivity] = useState(false);
  const [loadingConfirmEvidence, setloadingConfirmEvidence] = useState(false);
  const [loadingSendEvidence, setloadingSendEvidence] = useState(false);
  const [loadingCallContact, setloadingCallContact] = useState(-1);

  const [deleteActivityID, setdeleteActivityID] = useState(-1);
  const [linkActivityID, setlinkActivityID] = useState(-1);
  const [activityEvidenceID, setactivityEvidenceID] = useState(-1);
  const [activityTaskID, setactivityTaskID] = useState(-1);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tarea",
        id: "tarea",
        header: lang?.Activities_Actividades,
        size: 40,
      },
      {
        accessorKey: "responsableName",
        id: "responsableName",
        header: lang?.Activities_NombreResponsable,
        size: 40,
        Cell: ({ row: { original } }) => {
          // // // // // // // // // // // console.log("🚀 ~ ActivitiesModal ~ original:", original)

          if (original.responsable?.correo !== undefined) {
            return original.responsable.correo;
          } else {
            return original.responsable?.c_name
              ? original.responsable.c_name + " " + original.responsable.c_lastname
              : original.responsable?.nombre || "null";
          }
        },
      },
      {
        accessorKey: "fecha_entrega",
        id: "fecha_entrega",
        header: lang?.Activities_FechaDeEntrega,
        size: 40,

        Cell: ({ row: { original } }) => {
          console.log("🚀 ~ ActivitiesModal ~ original:", original);
          if (original.fecha_entrega !== null) {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#e9ffe7",
                  p: 1,
                  borderRadius: 1,
                  color: "#008f23",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "content-fit",
                }}
              >
                {original.fecha_entrega}
              </Typography>
            );
          }
          return (
            <Typography
              variant="body1"
              color="initial"
              sx={{
                bgcolor: "#ebebeb",
                p: 1,
                borderRadius: 1,
                color: "#afafaf",
                fontWeight: 500,
                fontSize: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {lang?.notDatefecha_entrega}
            </Typography>
          );
        },
      },
      {
        accessorKey: "responsableEmail",
        id: "responsableEmail",
        header: lang?.Activities_CorreoDelResponsable,
        size: 40,
        Cell: ({ row: { original } }) => {
          return original.responsable?.c_email || "null";
        },
      },
      {
        accessorKey: "init_date",
        id: "init_date",
        header: lang?.Activities_FechaDeInicio1,
        size: 40,
        Cell: ({ row: { original } }) => {
          if (original.init_date === null) {
            return "0000-00-00";
          }
          return original.init_date;
        },
      },
      {
        accessorKey: "fecha_compromiso",
        id: "fecha_compromiso",
        header: lang?.Activities_FechaDeCompromiso1,
        size: 40,
      },
      {
        accessorKey: "status",
        id: "status",
        header: lang?.Activities_EstadoDeActividad,
        size: 40,
        Cell: ({ row: { original } }) => {
          if (original.status === "pending") {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#ececec",
                  p: 1,
                  borderRadius: 1,
                  color: "#818181",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                }}
              >
                {lang?.Activities_Pendiente}
              </Typography>
            );
          }
          if (original.status === "in_progress_at_time") {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#d0f1ff",
                  p: 1,
                  borderRadius: 1,
                  color: "#0071a1",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 140,
                }}
              >
                {lang?.Activities_EnProgresoATiempo}
              </Typography>
            );
          }
          if (original.status === "in_progress_behind_schedule") {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#ffeed0",
                  p: 1,
                  borderRadius: 1,
                  color: "#a16700",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 190,
                }}
              >
                {lang?.Activities_EnProgresoAntesDeFecha}
              </Typography>
            );
          }
          if (original.status === "completed_behind_schedule") {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#d6ffd0",
                  p: 1,
                  borderRadius: 1,
                  color: "#06a100",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 190,
                }}
              >
                {lang?.Activities_CompletadoAntesDeFecha}
              </Typography>
            );
          }
          if (original.status === "completed_at_time") {
            return (
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  bgcolor: "#d6ffd0",
                  p: 1,
                  borderRadius: 1,
                  color: "#06a100",
                  fontWeight: 500,
                  fontSize: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 140,
                }}
              >
                {lang?.Activities_CompletadoATiempo}
              </Typography>
            );
          }
          return original.status;
        },
      },
      {
        accessorKey: "acciones",
        id: "acciones",
        header: lang?.Activities_Acciones,
        size: 40,
        Cell: ({ row: { original } }) => {
          console.log(original);

          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Eliminar actividad">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    setdeleteActivityID(original.id);
                    setmodal("confirmDelete");
                  }}
                >
                  <DeleteForeverIcon></DeleteForeverIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar actividad">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    seteditActivityData(original);
                    setmodal("update");
                  }}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Ver enlace de actividad">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    setlinkActivityID(original.id);
                    setmodal("linkActivity");
                  }}
                >
                  <LanguageIcon></LanguageIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Ver evidencias">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    setmodal("showEvidences");
                    setactivityEvidenceID(original.id);
                  }}
                >
                  <TableViewOutlinedIcon></TableViewOutlinedIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Subir evidencias y P.D.C.A">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    setmodal("submitEvidence");
                    setactivityTaskID(original.id);
                  }}
                >
                  <FeedOutlinedIcon></FeedOutlinedIcon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Notificar al responsable con una llamada">
                <IconButton
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: 25, cursor: "pointer", border: "1px solid #000" }}
                  onClick={() => {
                    callContactActivity({ id_task: original.id });
                    setloadingCallContact(original.id);
                  }}
                >
                  {loadingCallContact === original.id ? (
                    <Box sx={{ height: 24, width: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CircularProgress
                        sx={{
                          color: "black",
                        }}
                        size={20}
                      ></CircularProgress>
                    </Box>
                  ) : (
                    <LocalPhoneOutlinedIcon></LocalPhoneOutlinedIcon>
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    [Activities, linkActivityID, lang, loadingCallContact]
  );

  function RegenerateSuggestActivities() {
    setloadingRegenerateSuggest(true);
    IAService.GenerateActivitiesWithIA({
      soli_id: soli_id,
    })
      .then((result) => {
        // // // // // // // // // // // console.log("🚀 ~ getSuggestActivities ~ result:", result)
      })
      .catch((err) => {
        // // // // // // // // // // // console.log("🚀 ~ getSuggestActivities ~ err:", err)
      })
      .finally(() => {
        setloadingRegenerateSuggest(false);
      });
  }

  function getSuggestActivities() {
    if (!soli_id || !token) {
      return;
    }

    IAService.GenerateActivitiesWithIA({
      soli_id: soli_id,
    })
      .then((result) => {
        if (!result.data?.suggested_tasks) {
          return false;
        }
        const dataParser = JSON.parse(result.data.suggested_tasks);
        setActivities(dataParser);
        // // // // // // // // // // // console.log("🚀 ~ getSuggestActivities ~ result:", dataParser)
      })
      .catch((err) => {
        // // // // // // // // // // // console.log("🚀 ~ getSuggestActivities ~ err:", err)
      });
  }

  function saveInputsData(inputs) {
    // // // // // // // // // // // console.log("🚀 ~ saveInputsData ~ inputs:", inputs)
    if (!inputs.responsable?.nombre) {
      alert.error(lang?.Activities_DebeCompletarNombreResponsable);
      return;
    }

    if (!inputs.responsable?.apellido) {
      alert.error(lang?.Activities_DebeCompletarApellidoResponsable);
      return;
    }

    if (!inputs.responsable?.documento) {
      alert.error(lang?.Activities_DebeCompletarDocumentoResponsable);
      return;
    }

    if (!inputs.responsable?.correo) {
      alert.error(lang?.Activities_DebeCompletarCorreoResponsable);
      return;
    }

    if (!inputs.responsable?.telefono) {
      alert.error(lang?.Activities_DebeCompletarTelefonoResponsable);
      return;
    }

    if (!inputs.tarea) {
      alert.error(lang?.Activities_DebeCompletarTarea);
      return;
    }

    if (!inputs.fecha_inicio || inputs.fecha_inicio == "00-00-00") {
      alert.error(lang?.Activities_DebeCompletarFechaDeInicio);
      return;
    }

    if (!inputs.fecha_compromiso || inputs.fecha_compromiso == "00-00-00") {
      alert.error(lang?.Activities_DebeCompletarFechaDeCompromiso);
      return;
    }

    setloadingCreateActivity(true);
    const data = {
      soli_id: soli_id,
      tasks: [
        {
          responsible_name: inputs.responsable.nombre,
          responsible_lastname: inputs.responsable.apellido,
          responsible_typeid: inputs.responsable.id_tipo_documento,
          responsible_id: inputs.responsable.documento,
          responsible_email: inputs.responsable.correo,
          responsible_phone: inputs.responsable.telefono,
          responsible_address: inputs.responsable.address,
          init_date: inputs.fecha_inicio,
          commitment_date: inputs.fecha_compromiso,
          task: inputs.tarea,
        },
      ],
    };

    ActivitiesService.submitActivities({ data })
      .then((result) => {
        if (result.status === true) {
          //alert("lang?.Activities_Actividades guardadas correctamente")
          getActivities();
          alert.success(lang?.Activities_ActividadGuardadaCorrectamente);
        }
      })
      .catch((err) => {
        alert.error(lang?.Activities_ErrorAlGuardarActividad);
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.submitActivities ~ err:", err)
      })
      .finally(() => {
        setloadingCreateActivity(false);
      });
  }

  function getActivities() {
    const data = {
      soli_id: soli_id,
    };

    ActivitiesService.getActivities({ data })
      .then((result) => {
        if (result.status === true) {
          const parsedData = result.data.tasks
            .map((activity) => {
              console.log("🚀 ~ parsedData ~ activity:", activity);
              // // // // // // // // // // // console.log("🚀 ~ parsedData ~ activity:", activity)
              if (activity.status !== "deleted") {
                return {
                  id: activity.id,
                  responsable: {
                    idReg: activity.contact.idReg,
                    c_name: activity.contact.c_name,
                    c_lastname: activity.contact.c_lastname,
                    c_documentType: activity.contact.c_documentType,
                    c_document: activity.contact.c_document,
                    c_email: activity.contact.c_email,
                    c_phone: activity.contact.c_phone,
                    c_profile: activity.contact.c_profile,
                  },
                  tarea: activity.task,
                  fecha_compromiso: activity.commitment_date,
                  init_date: activity.init_date,
                  fecha_entrega: activity.created_at,
                  completed_date: activity.completed_date,
                  mark_completed_by_owner: activity.mark_completed_by_owner,
                  status: activity.status,
                };
              }
            })
            .filter(Boolean);
          // // // // // // // // // // // console.log("🚀 ~ parsedData ~ parsedData:", parsedData)

          setActivities(parsedData);
        }
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.getActivities ~ result:", result)
      })
      .catch((err) => {
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.getActivities ~ err:", err)
      });
  }

  function deleteActivity() {
    setloadingDeleteActivity(true);
    console.log(deleteActivityID);
    const data = {
      soli_id: soli_id,
      tasks: [
        {
          id_task: deleteActivityID,
        },
      ],
    };

    ActivitiesService.deleteActivities({ data })
      .then((result) => {
        if (result.status === true) {
          getActivities();
          // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.deleteActivities ~ result:", result)
          alert.success(lang?.Activities_ActividadEliminadaCorrectamente);
        }
      })
      .catch((err) => {
        alert.error(lang?.Activities_ErrorAlEliminarActividad);
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.deleteActivities ~ err:", err)
      })
      .finally(() => {
        setloadingDeleteActivity(false);
        setdeleteActivityID(-1);
      });
    return;
  }

  function editInputsData(editActivityData, inputs) {
    // // // // // // // // // // // console.log("🚀 ~ editInputsData ~ inputs:", inputs)
    setloadingEditActibity(true);
    const dataForm = {
      soli_id: soli_id,
      tasks: [
        {
          id_task: editActivityData.id,
          responsible_name: inputs.responsable?.nombre || editActivityData.responsable.c_name,
          responsible_lastname: inputs.responsable?.apellido || editActivityData.responsable.c_lastname,
          responsible_typeid: inputs.responsable?.id_tipo_documento || editActivityData.responsable.c_documentType,
          responsible_id: inputs.responsable?.reg || editActivityData.responsable.idReg,
          responsible_email: inputs.responsable?.correo || editActivityData.responsable.c_email,
          responsible_phone: inputs.responsable?.telefono || editActivityData.responsable.c_phone,
          responsible_address: "CL",
          init_date: inputs.fecha_inicio,
          commitment_date: inputs.fecha_compromiso,
          task: inputs.tarea,
          responsible_update_if_exist: inputs.update_contact === true ? "true" : "false",
          auto_task: "false",
          from_ia: "false",
          comments: "Test",
        },
      ],
    };

    ActivitiesService.editActivities({ data: dataForm })
      .then((result) => {
        if (result.status === true) {
          getActivities();
          alert.success(lang?.Activities_ActividadEditadaCorrectamente);
        }
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.editActivities ~ result:", result)
      })
      .catch((err) => {
        alert.error(lang?.Activities_ErrorAlEditarActividad);
        // // // // // // // // // // // console.log("🚀 ~ ActivitiesService.editActivities ~ err:", err)
      })
      .finally(() => {
        setloadingEditActibity(false);
      });
  }

  function completedActivity({ soli_id, id_task }) {
    setloadingConfirmEvidence(true);
    const data = {
      soli_id: soli_id,
      tasks: [
        {
          id_task: id_task,
        },
      ],
    };

    ActivitiesService.completeByOwnerTasksFromSoli({ data })
      .then((result) => {
        if (result.status === true) {
          alert.success(lang?.Activities_ActividadConfirmadaCorrectamente);
          getActivities();
        }
      })
      .catch((err) => {
        console.log("🚀 ~ ActivitiesService.completedActivity ~ err:", err);
        alert.error(lang?.Activities_ErrorAlConfirmarEvidencia);
      })
      .finally(() => {
        setloadingConfirmEvidence(false);
      });
  }

  function sendActivityEvidence(inputs) {
    setloadingSendEvidence(true);
    const data = new FormData();
    data.append("soli_id", soli_id);
    data.append("id_task", activityTaskID);
    data.append("comments", inputs.comments);
    data.append("file", inputs.file);

    ActivitiesService.sendctivityEvidence({ data: data })
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result);
        if (result.status === true) {
          alert.success(lang?.EvidencePage_EvidenceSentSuccess);
        }
      })
      .catch((err) => {
        alert.error(lang?.EvidencePage_EvidenceSendError);
      })
      .finally(() => {
        setloadingSendEvidence(false);
      });
  }

  function callContactActivity({ id_task }) {
    const lenguagueUser = localStorage.getItem("lang");
    let setLenguague = "es";
    switch (lenguagueUser) {
      case "es":
        setLenguague = "es";
        break;
      case "en":
        setLenguague = "en";
        break;
      case "fr":
        setLenguague = "en";
    }

    const data = {
      soli_id: soli_id,
      id_task: id_task,
      lang: setLenguague,
    };

    ActivitiesService.generateCallFromTaskFromSoli({ data })
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result);
        if (result.status === true) {
          alert.success("Se envio un llamado al responsable de la actividad");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ callContactActivity ~ err:", err);
        alert.error("Ha ocurrido un error al llamar al responsable de la actividad");
      })
      .finally(() => {
        setloadingCallContact(-1);
      });
  }

  useEffect(() => {
    if (open && Activities.length === 0) {
      getSuggestActivities();
    }

    getActivities();
  }, [open]);

  return (
    <>
      {" "}
      <Dialog fullWidth={true} fullScreen={true} maxWidth={"lg"} scroll="paper" sx={{ padding: 5 }} open={open} onClose={() => onClose()}>
        <DialogTitle>{lang?.Activities_GestionDeActividades}</DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent="flex-end" sx={{ paddingBottom: 5 }} gap={1}>
            <Button variant="contained" color="primary" onClick={() => RegenerateSuggestActivities()}>
              {loadingRegenerateSuggest ? (
                <Box sx={{ height: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                    size={20}
                  ></CircularProgress>
                </Box>
              ) : (
                lang?.Activities_RegenerarActividadesSugeridas
              )}
            </Button>
            <Button variant="contained" color="primary" onClick={() => setmodal("create")}>
              {lang?.Activities_CrearNuevaActividad}
            </Button>
          </Stack>
          <MaterialReactTable
            columns={columns}
            data={Activities.reverse()}
            state={{ showSkeletons: false }}
            localization={MRT_Localization_ES}
            enableDensityToggle={true}
            initialState={{ density: "compact" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            {lang?.Activities_Volver1}
          </Button>
        </DialogActions>
      </Dialog>
      <CreateActivityModal
        loading={loadingCreateActivity}
        saveInputsData={saveInputsData}
        open={modal === "create"}
        onClose={() => setmodal("")}
      ></CreateActivityModal>
      <UpdateActivityModal
        soli_id={soli_id}
        editActivityData={editActivityData}
        loading={loadingEditActibity}
        editInputsData={editInputsData}
        open={modal === "update"}
        onClose={() => setmodal("")}
      ></UpdateActivityModal>
      {modal === "linkActivity" && (
        <ShowLinkActivity
          soli_id={soli_id}
          activityID={linkActivityID}
          open={modal === "linkActivity"}
          onClose={() => setmodal("")}
        ></ShowLinkActivity>
      )}
      <ConfirmDeleteActivity
        open={modal === "confirmDelete"}
        deleteActivity={deleteActivity}
        loading={loadingDeleteActivity}
        onClose={() => setmodal("")}
      ></ConfirmDeleteActivity>
      <ShowActivityEvidences
        loading={loadingConfirmEvidence}
        completedActivity={completedActivity}
        open={modal === "showEvidences"}
        id_task={activityEvidenceID}
        soli_id={soli_id}
        onClose={() => setmodal("")}
      ></ShowActivityEvidences>
      <SubmitEvidence
        open={modal === "submitEvidence"}
        onClose={() => setmodal("")}
        loading={loadingSendEvidence}
        sendActivityEvidence={sendActivityEvidence}
      ></SubmitEvidence>
    </>
  );
};

export default ActivitiesModal;
