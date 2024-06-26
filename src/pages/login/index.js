import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  styled,
} from "@mui/material";
import "pages/login/style.css";
import http from "api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  openErrorAlert,
  openSuccessAlert,
  resetClientStore,
  setPageTransition,
} from "store/slice/clientInfo";
import { saveJWT } from "util/authUtil";
import { resetAuthStore, syncAuth } from "store/slice/authInfo";
import { useNavigate } from "react-router-dom";
import AppInputForm from "components/input/form";
import AppInputBox from "components/input/inputbox";
import Subject from "./subject";
import PasswordInput from "components/input/password";
import EmailInput from "components/input/email";
import { resetLedgerStore } from "store/slice/ledgerInfo";
import { resetUserStore } from "store/slice/userInfo";
import { bgGradient } from "theme/css";
import { alpha, useTheme } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toSignUp = () => {
    dispatch(setPageTransition("push"));
    navigate("/signup");
  };

  const login = () => {
    const params = {
      email: email,
      password: password,
      autoLogin: autoLogin,
    };

    http
      .post("/api/v1/authenticate", params)
      .then((response) => {
        saveJWT(response.data.data);
        dispatch(syncAuth());
      })
      .catch((error) => {
        console.log(error);
        dispatch(openErrorAlert(error.response.data.message));
      });
  };

  useEffect(() => {
    const logout = sessionStorage.getItem("logout");
    if (logout) {
      const logoutMessage = sessionStorage.getItem("logoutMessage");
      dispatch(resetAuthStore());
      dispatch(resetLedgerStore());
      dispatch(resetUserStore());
      dispatch(resetClientStore());

      if (logoutMessage) {
        dispatch(openSuccessAlert(logoutMessage));
        sessionStorage.removeItem("logoutMessage");
      }

      sessionStorage.removeItem("logout");
    }
  }, []);

  const renderForm = () => {
    return (
      <Stack className="login-page-wrapper">
        <Subject value={"Login"} />
        <AppInputForm>
          <AppInputBox>
            <EmailInput
              email={email}
              setEmail={setEmail}
              emailLabel={"이메일"}
            />
          </AppInputBox>
          <AppInputBox>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordLabel={"비밀번호"}
            />
          </AppInputBox>

          <div className="signup-prompt">
            아직 계정이 없으신가요?&nbsp;&nbsp;
            <Link onClick={toSignUp} className={"anchor-button"}>
              Sign up
            </Link>
          </div>

          <AppInputBox>
            <Button
              fullWidth
              variant="contained"
              size={"large"}
              onClick={login}
            >
              Login in
            </Button>
          </AppInputBox>

          <FormControlLabel
            control={
              <AntSwitch
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                sx={{ m: 1 }}
              />
            }
            label="remeber me"
          />
        </AppInputForm>
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 10,
            width: 1,
            maxWidth: 420,
          }}
        >
          {renderForm()}
        </Card>
      </Stack>
    </Box>
  );
}
