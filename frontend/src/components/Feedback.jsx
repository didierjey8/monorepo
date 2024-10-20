import { Alert, Snackbar } from "@mui/material";

function Feedback({ show, message, status, duration, onClose }) {
  return (
    <Snackbar
      open={show}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => onClose()}
    >
      <Alert variant="filled" onClose={() => onClose()} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Feedback;
