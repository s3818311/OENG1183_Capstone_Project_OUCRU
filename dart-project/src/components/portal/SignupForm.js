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
import SignupImage from "../../assets/portal/signup.png";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "../../enums/routes.js";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuItem from "@mui/material/MenuItem";
import * as REGEX from "../../enums/regex";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import UserPool from "../../utils/userPoolUtil";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { localStorageUtil } from "../../utils/localStorageUtil";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../utils/accountUtil";

const passwordHelpTooltipTItle = (
  <React.Fragment>
    <Typography color="inherit">Strong Password</Typography>
    <br />
    <Typography variant="h6" sx={{ fontSize: "14px" }}>
      {" "}
      {"The password must contain"}{" "}
      <em>
        {" "}
        <b>{"at least"} </b>
      </em>{" "}
      {"following properties:"} <br /> <br />
      <b>* One UPPERCASE character</b> <br />
      <b>* One lowercase character</b> <br />
      <b>* One special character</b> <br />
      <b>* One number</b> <br />
    </Typography>
  </React.Fragment>
);

const roles = [
  {
    value: "Public",
    label: "Public User",
  },
  {
    value: "Government",
    label: "Government-related User",
  },
  {
    value: "Professional",
    label: "Professional User",
  },
];

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [username, setUsername] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [role, setRole] = useState("Public");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isSubmittedWithoutEntering, setIsSubmittedWithoutEntering] =
    useState(true);
  const [submitTitle, setSubmitTitle] = useState("");
  const [submitTitleColor, setSubmitTitleColor] = useState("");

  let navigate = useNavigate();
  const { authenticate } = useContext(AccountContext);

  function showUnsuccessfulSignup(title) {
    setTimeout(function () {
      setIsButtonLoading(false);
      setSubmitTitle(title);
      setSubmitTitleColor("red");
    }, 1000);
  }

  function showSuccessfulSignup(title) {
    setTimeout(function () {
      setIsButtonLoading(false);
      setSubmitTitle(title);
      setSubmitTitleColor("green");
    }, 1000);
  }
  const handleSubmit = () => {
    setIsButtonLoading(true);
    setSubmitTitle("");

    if (
      isEmailInvalid ||
      isUsernameInvalid ||
      isPasswordInvalid ||
      isSubmittedWithoutEntering
    ) {
      showUnsuccessfulSignup("Could not create account!");
    } else if (
      !isEmailInvalid &&
      !isUsernameInvalid &&
      !isPasswordInvalid &&
      !isSubmittedWithoutEntering
    ) {
      const attributeList = [
        new CognitoUserAttribute({
          Name: "preferred_username",
          Value: username,
        }),
        new CognitoUserAttribute({ Name: "custom:role", Value: role }),
      ];

      UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          if (err.name === "UsernameExistsException") {
            showUnsuccessfulSignup("Account already exists!");
          }
        } else {
          showSuccessfulSignup("Account created sucessfully!");

          authenticate(email, password).then((data) => {
            setTimeout(function () {
              navigate(localStorageUtil.getPageRouteToNavigateBack());
            }, 3000);
          });
        }
      });
    }
  };

  const validateEmail = (e) => {
    const enteredEmail = e.target.value;
    if (enteredEmail === "") {
      setIsEmailInvalid(true);
      setShowEmailError(true);
      setEmailHelperText("Email is required");
    } else if (!REGEX.EMAIL_REGEX.test(enteredEmail)) {
      setIsEmailInvalid(true);
      setShowEmailError(true);
      setEmailHelperText("Invalid email address");
    } else {
      setIsEmailInvalid(false);
      setShowEmailError(false);
      setEmailHelperText("");
      setEmail(enteredEmail);
    }

    setIsSubmittedWithoutEntering(false);
  };

  const validateUsername = (e) => {
    const enteredUsername = e.target.value;

    if (enteredUsername === "") {
      setIsUsernameInvalid(true);
      setShowUsernameError(true);
      setUsernameHelperText("Username is required");
    } else if (enteredUsername.length < 6 || enteredUsername.length > 20) {
      setIsUsernameInvalid(true);
      setShowUsernameError(true);
      setUsernameHelperText("Username must be 6-20 characters");
    } else if (!REGEX.USERNAME_REGEX.test(enteredUsername)) {
      setIsUsernameInvalid(true);
      setShowUsernameError(true);
      setUsernameHelperText("Username must not contain special characters");
    } else {
      setIsUsernameInvalid(false);
      setShowUsernameError(false);
      setUsernameHelperText("");
      setUsername(enteredUsername);
    }

    setIsSubmittedWithoutEntering(false);
  };

  const validatePassword = (e) => {
    const enteredPassword = e.target.value;

    if (enteredPassword === "") {
      setIsPasswordInvalid(true);
      setShowPasswordError(true);
      setPasswordHelperText("Password is required");
    } else if (enteredPassword.length < 6) {
      setIsPasswordInvalid(true);
      setShowPasswordError(true);
      setPasswordHelperText("Password must have at least 6 characters");
    } else if (!REGEX.PASSWORD_REGEX.test(enteredPassword)) {
      setIsPasswordInvalid(true);
      setShowPasswordError(true);
      setPasswordHelperText("Invalid strong password format");
    } else {
      setIsPasswordInvalid(false);
      setShowPasswordError(false);
      setPasswordHelperText("");
      setPassword(enteredPassword);
    }

    setIsSubmittedWithoutEntering(false);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
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
          sx={{ display: "flex", flexDirection: "column", p: 10 }}
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
            Sign Up
          </Typography>
          <Box sx={{ textAlign: "center", mb: "10px" }}>
            <img alt="Sign in" src={SignupImage} width="120px" height="120px" />
          </Box>

          {/* Email*/}
          <TextField
            required
            autoComplete="off"
            id="signup-email"
            label="Email"
            type="text"
            margin="normal"
            error={showEmailError}
            helperText={emailHelperText}
            onBlur={validateEmail}
            onFocus={() => {
              setShowEmailError(false);
              setEmailHelperText("");
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          {/* Username */}
          <TextField
            required
            autoComplete="off"
            id="signup-username"
            label="Your username"
            type="text"
            margin="normal"
            error={showUsernameError}
            helperText={usernameHelperText}
            onBlur={validateUsername}
            onFocus={() => {
              setShowUsernameError(false);
              setUsernameHelperText("");
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* Password */}
            <TextField
              required
              autoComplete="off"
              id="signup-password"
              label="Password"
              type="password"
              margin="normal"
              error={showPasswordError}
              helperText={passwordHelperText}
              onBlur={validatePassword}
              onFocus={() => {
                setShowPasswordError(false);
                setPasswordHelperText("");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Tooltip title={passwordHelpTooltipTItle}>
                    <IconButton aria-label="delete">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Box>

          {/* Role */}
          <TextField
            required
            autoComplete="off"
            id="outlined-select-role"
            select
            label="Choose profile type"
            value={role}
            onChange={handleRoleChange}
            margin="normal"
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Typography sx={{ fontSize: "16px" }}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            loading={isButtonLoading}
            variant="contained"
            size="large"
            sx={{ mt: "15px", p: 2 }}
            onClick={handleSubmit}
          >
            Sign up
          </LoadingButton>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              color: submitTitleColor,
              fontWeight: 400,
              mt: "10px",
            }}
          >
            {submitTitle}
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
            Already have an account?
          </Typography>
          <RouterLink to={ROUTES.PORTAL.SIGNIN}>
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
              Sign in!
            </Typography>
          </RouterLink>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupForm;
