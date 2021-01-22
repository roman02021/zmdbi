import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchRedirectUpdate } from "../../contexts/SearchContext";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect, useHistory } from "react-router-dom";
import {
  useSigned,
  useSignedUpdate,
  useUsername,
  useUsernameUpdate,
  useUserId,
  useUserIdUpdate,
} from "../../contexts/SignedContext";
import logo from "../../images/logo3.png";
import {
  useSearch,
  useSearchUpdate,
  useSearchRedirect,
} from "../../contexts/SearchContext";

import { useSession, useSessionUpdate } from "../../contexts/SessionContext";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
    padding: 0,
  },
  logo: {
    fontWeight: "600",
  },
  belowAppBar: {
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "rgb(63,81,140)",
  },
  btn: {
    backgroundColor: "#0BB5E0",
    color: "black",
  },
});

const NavBar = () => {
  const setSearchString = useSearchUpdate();
  const searchString = useSearch();
  const redirectToDiscover = useSearchRedirect();
  const redirectToDiscoverUpdate = useSearchRedirectUpdate();
  const [redirectToSearch, setRedirectToSearch] = useState(false);
  const classes = useStyles();
  const [token, setToken] = useState(null);
  const [accDetails, setAccDetails] = useState(null);

  const history = useHistory();
  const signed = useSigned();
  const setSigned = useSignedUpdate();
  const username = useUsername();
  const setUsername = useUsernameUpdate();
  const setUserId = useUserIdUpdate();

  //Load font before using Canvas
  const WebFont = require("webfontloader");
  WebFont.load({
    google: {
      families: ["Roboto"],
    },
  });

  const getAccDetails = async () => {
    const accDetails = await axios.get(
      "http://localhost:5000/getToken/getAccDetails",
      {
        withCredentials: true,
      }
    );

    setUsername(accDetails.data.username);
    setUserId(accDetails.data.id);
  };

  const logout = async () => {
    const logout = await axios.delete("http://localhost:5000/getToken/logout", {
      withCredentials: true,
    });
    setSigned(false);
  };
  const login = async () => {
    const token = await axios.get("http://localhost:5000/getToken");

    window.location = `https://www.themoviedb.org/authenticate/${token.data}?redirect_to=http://localhost:3000/LogginApproved`;

    setToken(token);
  };

  const checkSigned = async () => {
    const signed = await axios.get(
      "http://localhost:5000/getToken/checkSigned",
      {
        withCredentials: true,
      }
    );

    setSigned(signed.data);
  };

  useEffect(() => {
    checkSigned();
    getAccDetails();
  }, [signed]);

  return (
    <AppBar
      position="static"
      style={{
        boxShadow: "none",
        backgroundColor: "#032541",
        boxSizing: "border-box",
      }}
    >
      <Container>
        {redirectToSearch && (
          <div>
            <Redirect
              to={{
                pathname: `/discover/${searchString}`,
                searchString: searchString,
              }}
            ></Redirect>
          </div>
        )}

        <Toolbar className={classes.root}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => {
              setRedirectToSearch(false);
            }}
          >
            <img src={logo} alt="logo"></img>
          </Link>
          <Link
            to="/discover"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button
              className={classes.btn}
              style={{
                width: "150px",
                alignSelf: "center",
                marginLeft: "10px",
                borderRadius: "30px",
                backgroundColor: "#0BB5E0",
              }}
              type="submit"
              variant="contained"
            >
              Discover
            </Button>
          </Link>
          <div>
            <form
              style={{ display: "flex" }}
              onSubmit={(e) => {
                if (searchString !== "") {
                  setRedirectToSearch(true);
                  localStorage.setItem("searchString", searchString);
                }
                setSearchString("");

                redirectToDiscoverUpdate(!redirectToDiscover);
                e.preventDefault();
              }}
            >
              {/* <Link to="/discover" style={{ textDecoration: "none" }}>
                  <Button variant="contained">DISCOVER</Button>
                </Link> */}
              <div style={{ width: "300px" }}>
                <TextField
                  variant="outlined"
                  size="small"
                  style={{
                    alignSelf: "flex-end",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                  value={searchString}
                  onChange={(e) => {
                    setSearchString(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </div>
              <Button
                style={{
                  alignSelf: "center",
                  marginLeft: "10px",
                  backgroundColor: "#0BB5E0",
                }}
                type="submit"
                variant="outlined"
              >
                Search
              </Button>
            </form>
          </div>

          {signed ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography style={{ marginRight: "10px" }}>
                {username}
              </Typography>
              <Button
                className={classes.btn}
                onClick={() => logout()}
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className={classes.btn}
              onClick={() => login()}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          )}
          {/* 
          <Button onClick={testCookie}>Cookie Test</Button>

          <Button onClick={createSessionId}>CREATE SESSION ID</Button> */}
          {/* <Button onClick={getAccDetails}>get account details</Button> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
