import React, { useEffect, useState } from 'react';
import { useSignedUpdate } from './contexts/SignedContext';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

import { Button, Typography, Container } from '@material-ui/core';
const LoginApproved = () => {
  const setSigned = useSignedUpdate();
  const history = useHistory();

  const [loginSucess, setLoginSucess] = useState(false);
  console.log(history);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('request_token');
  console.log('token', token);
  const createSessionId = async () => {
    try {
      axios.get(`${process.env.SERVER_URL}/authentication/getSessionId`, {
        params: { token: token },
        withCredentials: true,
      });
      setSigned(true);
      setLoginSucess(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    createSessionId();
  }, []);

  return (
    <Container
      style={{
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loginSucess ? (
        <Typography variant="h3">Login Successful </Typography>
      ) : (
        <Typography variant="h3">Login Failed</Typography>
      )}

      <Button
        style={{ marginTop: '20px', fontSize: '30px' }}
        variant="text"
        onClick={() =>
          (window.location = 'https://nameless-shore-33653.herokuapp.com/')
        }
      >
        GO BACK TO MAIN PAGE
      </Button>
    </Container>
  );
};
export default LoginApproved;
