import React, { useEffect } from "react";
import { useSignedUpdate, useUsernameUpdate } from "./contexts/SignedContext";
import axios from "axios";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { Button, Typography, Container } from "@material-ui/core";
const LoginApproved = () => {
  const setSigned = useSignedUpdate();
  const history = useHistory();
  const setUsername = useUsernameUpdate();
  console.log(history);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("request_token");

  const createSessionId = async () => {
    await axios.get("http://localhost:5000/getToken/getSessionId", {
      params: { token: token },
      withCredentials: true,
    });
  };

  useEffect(() => {
    createSessionId();

    setSigned(true);
  }, []);

  return (
    <Container
      style={{
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2">Login Successful</Typography>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        onClick={() => (window.location = "http://localhost:3000/")}
      >
        GO BACK
      </Button>
    </Container>
  );
};
export default LoginApproved;
