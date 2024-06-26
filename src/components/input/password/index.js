import { TextField } from "@mui/material";
import { getByteLength } from "util/stringUtil";
import "components/input/app-style.css";

export default function PasswordInput({
  passwordInputRef,
  password,
  setPassword,
  passwordLabel,
  action,
}) {
  return (
    <TextField
      inputRef={passwordInputRef}
      fullWidth
      label={passwordLabel}
      type="password"
      variant="standard"
      onChange={(e) => {
        if (getByteLength(e.target.value) > 20) {
          e.target.value = password;
          return;
        }
        setPassword(e.target.value);
      }}
      onKeyUp={(e) => {
        if (e.code === "Enter" && action) {
          action();
        }
      }}
    />
  );
}
