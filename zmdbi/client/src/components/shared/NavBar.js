import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import {
  useSigned,
  useSignedUpdate,
  useUsername,
  useUsernameUpdate,
  useUserId,
  useUserIdUpdate,
} from "../../contexts/SignedContext";
import logo from "../../images/logo3.png";

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
import { NavLink, Link } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
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
  const [switchToSearch, setSwitchToSearch] = useState(true);
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
        <Toolbar className={classes.root}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
              }}
            >
              <img src={logo} alt="logo"></img>
            </Link>
            <div className="subMenuContainer">
              <Typography className="discoverHover" variant="h6">
                Movies
              </Typography>
              <Box className="subMenu" component="div">
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "popularity.desc",
                      mediaType: false,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Popular</Typography>
                </Link>

                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "vote_average.desc",
                      mediaType: false,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Top Rated</Typography>
                </Link>
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "release_date.desc",
                      mediaType: false,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">New</Typography>
                </Link>
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "vote_count.desc",
                      mediaType: false,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Discover</Typography>
                </Link>
              </Box>
            </div>
            <div className="subMenuContainer">
              <Typography className="discoverHover" variant="h6">
                TV Shows
              </Typography>
              <Box className="subMenu" component="div">
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "popularity.desc",
                      mediaType: true,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Popular</Typography>
                </Link>

                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "vote_average.desc",
                      mediaType: true,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Top Rated</Typography>
                </Link>
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "release_date.desc",
                      mediaType: true,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">New</Typography>
                </Link>
                <Link
                  to={{
                    pathname: "/discover",
                    state: {
                      sortOption: "vote_count.desc",
                      mediaType: true,
                    },
                  }}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Typography className="subMenuItem">Discover</Typography>
                </Link>
              </Box>
            </div>
          </div>

          {/* <Button
              className={classes.btn}
              style={{
                width: "150px",
                alignSelf: "center",
                marginLeft: "10px",
                borderRadius: "30px",
                backgroundColor: "#0BB5E0",
              }}
              variant="contained"
            >
              Discover
            </Button>
          </Link> */}
          <Link
            to={{
              pathname: "/discover",
              state: "release_date.desc",
            }}
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
              variant="contained"
            >
              hehehehehe
            </Button>
          </Link>
          <div>
            <form
              style={{ display: "flex" }}
              onSubmit={(e) => {
                e.preventDefault();
                console.log(searchQuery);
                history.push({
                  pathname: `/search/${searchQuery}`,

                  state: searchQuery,
                });
              }}
            >
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
