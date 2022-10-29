import React, { useState } from "react";
import { Button, Divider, TextField, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { SignupUser } from "../firebase/firebasemethod";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/todo logo.webp";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setLoader] = useState(false);
  let navigate = useNavigate();

  let signUp = () => {
    setLoader(true);
    SignupUser({
      userName,
      email,
      password,
      number,
    })
    .then((success) => {
      console.log(success);
      navigate("/login")
      setLoader(false);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
      setLoader(false);
      });
  };

  let clickEv = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="container ">
        <div className="main">
          <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
            <img src={Logo} alt="TodoLogo" width="100%" />
          </Box>

          <Box>
            <h1>SIGN UP</h1>

            <Box sx={{ px: 2, pb: 2 }}>
              <TextField
                className="center"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <TextField
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="standard"
                size="70"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <TextField
                label="Number"
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ px: 2 }}>
              <Button
                className="button"
                variant="contained"
                onClick={signUp}
                fullWidth
                >
                {isLoading? <CircularProgress />:"Sign Up" }
                
              </Button>
              <p>
                
                Already a user? <span onClick={clickEv}>LOGIN</span>
              </p>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Signup;
