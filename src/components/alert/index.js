import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "store/slice/clientInfo";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function AdminAlert() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(
    (state) => state.clientInfo.alert
  );

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        sx={{
          textAlign: "left",
          borderRadius: "15px",
          whiteSpace: "pre-wrap",
        }}
        severity={type}
        variant={"filled"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
