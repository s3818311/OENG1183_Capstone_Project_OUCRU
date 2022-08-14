import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import KeyIcon from "@mui/icons-material/Key";
import { useState, useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SigninImage from "../../assets/portal/signin.png";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../enums/routes.js";
import { AccountContext } from "../../utils/accountUtil";
import { useNavigate } from "react-router-dom";
import { localStorageUtil } from "../../utils/localStorageUtil";

function SigninForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [loginTitle, setLoginTitle] = useState("");
  const [loginTitleColor, setLoginTitleColor] = useState("");

  let navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);

  function showUnsuccessfulSignin(title) {
    setTimeout(function () {
      setIsButtonLoading(false);
      setLoginTitle(title);
      setLoginTitleColor("red");
    }, 1000);
  }

  function showSuccessfulSignin(title) {
    setTimeout(function () {
      setIsButtonLoading(false);
      setLoginTitle(title);
      setLoginTitleColor("green");
    }, 1000);
  }

  const handleLogin = () => {
    setIsButtonLoading(true);
    setLoginTitle("");

    if (email === "" || password === "") {
      showUnsuccessfulSignin("Please fill all credentials!");
    } else {
      authenticate(email, password)
        .then((data) => {
          showSuccessfulSignin("Login successfully!");
          setTimeout(function () {
            navigate(localStorageUtil.getPageRouteToNavigateBack());
          }, 3000);
        })
        .catch((err) => {
          showUnsuccessfulSignin("Wrong credentials. Please try again!");
        });
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
          pb: 10,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 10,
            maxWidth: "40vw",
          }}
          elevation={7}
        >
          <Typography
            component="h3"
            variant="h3"
            color="inherit"
            noWrap
            sx={{
              textAlign: "center",
              fontSize: 40,
              color: "rgb(25,118,210)",
              fontWeight: 700,
              mb: "20px",
            }}
          >
            Sign In
          </Typography>
          <Box sx={{ textAlign: "center", mb: "10px" }}>
            <img alt="Sign in" src={SigninImage} width="100px" height="100px" />
          </Box>

          <TextField
            required
            autoComplete="off"
            id="signin-email"
            label="Email"
            type="text"
            margin="normal"
            onBlur={(e) => {
              setEmail(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            autoComplete="off"
            id="signin-password"
            label="Password"
            type="password"
            margin="normal"
            onBlur={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            loading={isButtonLoading}
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ mt: "10px", p: 2 }}
          >
            Login
          </LoadingButton>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              color: loginTitleColor,
              fontWeight: 400,
              mt: "10px",
            }}
          >
            {loginTitle}
          </Typography>
        </Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              textAlign: "center",
              fontSize: "16px",
              color: "rgb(25,118,210)",
              fontWeight: 500,
              mt: "20px",
              mr: "5px",
            }}
          >
            Not a member?
          </Typography>
          <RouterLink to={ROUTES.PORTAL.SIGNUP}>
            <Typography
              component="h6"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                textAlign: "center",
                fontSize: "16px",
                color: "rgb(25,118,210)",
                fontWeight: 700,
                mt: "20px",
              }}
            >
              Sign up now
            </Typography>
          </RouterLink>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            my: "5px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "16px",
              color: "rgb(25,118,210)",
              fontWeight: 500,
            }}
          >
            or
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "16px",
              color: "rgb(25,118,210)",
              fontWeight: 500,
            }}
          >
            Return to{" "}
          </Typography>
          <RouterLink to={ROUTES.DEFAULT}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "16px",
                color: "rgb(25,118,210)",
                fontWeight: 700,
                ml: "8px",
              }}
            >
              <u>Homepage</u>
            </Typography>
          </RouterLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SigninForm;
