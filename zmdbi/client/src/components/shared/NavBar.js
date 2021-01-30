import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import "./style.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

import PersonIcon from "@material-ui/icons/Person";
import { useMediaQuery, ClickAwayListener } from "@material-ui/core";

import HamburgerMenu from "./HamburgerMenu";
import {
  useSigned,
  useSignedUpdate,
  useUsername,
  useUsernameUpdate,
  useUserIdUpdate,
} from "../../contexts/SignedContext";
import logo from "../../images/logo3.png";

import {
  AppBar,
  InputBase,
  Toolbar,
  Button,
  Container,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    padding: 0,
    position: "relative",
  },
  loginBtn: {
    padding: 0,
  },
  userName: {
    cursor: "pointer",
    color: "white",
  },
  userMenu: {
    "&:hover": {
      backgroundColor: "#CCCCCC",
    },
    zIndex: 20,

    display: "none",
    backgroundColor: "white",
    border: "1px black solid",
  },
  userMenuMobileSigned: {
    position: "absolute",
    backgroundColor: "white",
    top: "40px",
    border: "black 1px solid",
  },
  userMenuMobileUnsigned: {
    position: "absolute",
    backgroundColor: "white",
    top: "40px",
    border: "black 1px solid",
  },
  userWhole: {
    "&:hover": {
      "& > div": {
        position: "absolute",
        display: "block",
      },
    },
  },

  logoAndDiscover: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("800")]: {
      display: "none",
    },
  },
  searchField: {
    width: "100%",
    marginLeft: "20px",
    marginRight: "70px",
    [theme.breakpoints.down("md")]: {
      width: "450px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.down("800")]: {
      display: "none",
      width: 0,
    },
  },

  mobileSearchBarOn: {},
  mobileSearchBarOff: {
    right: "0px",
    top: "30px",
    width: "98vw",
  },
  searchInputBase: {
    position: "absolute",
    width: "100%",
    transform: "translateY(-100%)",
    height: "64px",
    top: "-0px",
    transition: "transform 0.5s",
    left: 0,
    [theme.breakpoints.down("600")]: {
      height: "48px",
    },
    [theme.breakpoints.down("500")]: {
      height: "56px",
    },
  },

  searchInputBaseOn: {
    height: "64px",
    position: "absolute",
    zIndex: "20",
    width: "100%",
    top: "-0px",
    left: 0,
    [theme.breakpoints.down("600")]: {
      height: "48px",
    },
    [theme.breakpoints.down("500")]: {
      height: "56px",
    },
    transition: "transform 0.5s",
    transform: "translateY(0%)",
  },
}));

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const searchBarRef = useRef();
  console.log(searchBarRef);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const classes = useStyles();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileSearchBar, setMobileSearchBar] = useState(false);
  const history = useHistory();
  const signed = useSigned();
  const setSigned = useSignedUpdate();
  const username = useUsername();
  const setUsername = useUsernameUpdate();
  const setUserId = useUserIdUpdate();
  const [logged, setLogged] = useState(false);
  //Load font before using Canvas
  const WebFont = require("webfontloader");
  WebFont.load({
    google: {
      families: ["Roboto"],
    },
  });

  const getAccDetails = async () => {
    const accDetails = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/authentication/getAccDetails",
      {
        withCredentials: true,
      }
    );

    setUsername(accDetails.data.username);
    setUserId(accDetails.data.id);
  };

  const logout = async () => {
    try {
      axios.delete(
        "https://arcane-reef-43492.herokuapp.com/authentication/logout",
        {
          withCredentials: true,
        }
      );
      console.log("LOGOTU");
      setSigned(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async () => {
    try {
      const token = await axios.get(
        "https://arcane-reef-43492.herokuapp.com/authentication"
      );

      window.location = `https://www.themoviedb.org/authenticate/${token.data}?redirect_to=https://nameless-shore-33653.herokuapp.com/LogginApproved`;
    } catch (err) {
      console.log(err.message);
    }
  };
  const checkSigned = async () => {
    try {
      const signed = await axios.get(
        "https://arcane-reef-43492.herokuapp.com/authentication/checkSigned",
        {
          withCredentials: true,
        }
      );
      console.log("checkSigned res", signed);
      setSigned(signed.data);
      getAccDetails();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    checkSigned();
  }, []);

  useEffect(() => {
    searchBarRef.current.focus();
  }, [mobileSearchBar]);
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#032541",
      }}
    >
      <Container className="navBarContentContainer">
        <Toolbar className={classes.root}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HamburgerMenu />

            <Link
              className="logoPhone"
              to="/"
              style={{
                display: "none",
              }}
            >
              <img src={logo} alt="logo"></img>
            </Link>

            <div className={classes.logoAndDiscover}>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={logo} alt="logo"></img>
              </Link>
              <div className="subMenuContainer">
                <Typography className="discoverHover" variant="body1">
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
                <Typography className="discoverHover" variant="body1">
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
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              history.push({
                pathname: `/search/${searchQuery}`,

                state: searchQuery,
              });
              setSearchQuery("");
              setMobileSearchBar(false);
            }}
          >
            <InputBase
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              autoFocus
              ref={searchBarRef}
              className={
                mobileSearchBar
                  ? classes.searchInputBaseOn
                  : classes.searchInputBase
              }
              placeholder="Search ZMDBi"
              endAdornment={
                <Button
                  variant="text"
                  onClick={() => setMobileSearchBar(false)}
                >
                  <CloseIcon />
                </Button>
              }
            />
          </form>
          <form
            className={classes.searchField}
            onSubmit={(e) => {
              e.preventDefault();

              history.push({
                pathname: `/search/${searchQuery}`,

                state: searchQuery,
              });
              setSearchQuery("");
            }}
          >
            <TextField
              placeholder="Search ZMDBi"
              variant="outlined"
              className={classes.searchField}
              value={searchQuery}
              color="primary"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      type="submit"
                      variant="text"
                      style={{
                        backgroundColor: "transparent",
                        padding: 0,
                        marginRight: "5px",
                        maxWidth: "10px",
                        minWidth: "10px",
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </form>
          {console.log("isMobile: ", isMobile, "signed: ", signed)}
          {isMobile ||
            (signed ? (
              <div className={classes.userWhole}>
                <Typography
                  style={{ marginRight: "10px" }}
                  className={classes.userName}
                >
                  {username}
                </Typography>

                <Box className={classes.userMenu} component="div">
                  {" "}
                  <Button onClick={() => logout()} variant="text">
                    Logout
                  </Button>
                </Box>
              </div>
            ) : (
              <Button
                onClick={() => login()}
                variant="text"
                style={{ marginTop: "2px", backgroundColor: "transparent" }}
              >
                {console.log("ICH BINS")}
                <Typography variant="body1" style={{ color: "white" }}>
                  Login
                </Typography>
              </Button>
            ))}

          {isMobile && (
            <Box style={{ position: "relative", display: "flex" }}>
              <Button
                style={{ position: "relative" }}
                variant="text"
                onClick={() => setShowMobileUserMenu(!showUserMenu)}
              >
                {signed ? username : <PersonIcon />}

                {signed
                  ? showMobileUserMenu && (
                      <ClickAwayListener
                        onClickAway={() =>
                          setShowMobileUserMenu(!showMobileUserMenu)
                        }
                      >
                        <Box className={classes.userMenuMobileSigned}>
                          <Button onClick={() => logout()}>Logout</Button>
                        </Box>
                      </ClickAwayListener>
                    )
                  : showMobileUserMenu && (
                      <ClickAwayListener
                        onClickAway={() =>
                          setShowMobileUserMenu(!showMobileUserMenu)
                        }
                      >
                        <Box className={classes.userMenuMobileUnsigned}>
                          <Button onClick={() => login()}>Login</Button>
                          <Button
                            onClick={() =>
                              window.open("https://www.themoviedb.org/signup")
                            }
                          >
                            Register
                          </Button>
                        </Box>
                      </ClickAwayListener>
                    )}
              </Button>
              <Button
                onClick={() => {
                  setMobileSearchBar(true);
                }}
                variant="text"
                style={{
                  padding: "0",
                  backgroundColor: "transparent",
                }}
              >
                <SearchIcon />
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
