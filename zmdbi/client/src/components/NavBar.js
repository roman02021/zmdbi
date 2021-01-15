import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context, useSearchRedirectUpdate } from "../contexts/SearchContext";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect } from "react-router-dom";
import SearchContext from "../contexts/SearchContext";
import {
  useSearch,
  useSearchUpdate,
  useSearchRedirect,
} from "../contexts/SearchContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  NativeSelect,
  TextField,
  FormControl,
  InputAdornment,
  Link as MaterialLink,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "600",
  },
  belowAppBar: {
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "rgb(63,81,140)",
  },
});

const NavBar = () => {
  const setSearchString = useSearchUpdate();
  const searchString = useSearch();
  const redirectToDiscover = useSearchRedirect();
  const redirectToDiscoverUpdate = useSearchRedirectUpdate();
  const [redirectToSearch, setRedirectToSearch] = useState(false);
  const classes = useStyles();
  const [user, setUser] = useState(null);
  // const { searchString, setSearchString } = useContext();
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa", redirectToDiscover);
  const requestToken = async () => {
    const token = await axios.get("http://localhost:5000/getToken");
    console.log(token);
    window.open(`https://www.themoviedb.org/authenticate/${token.data}`);
    // window.open(
    //   "https://www.themoviedb.org",
    //   "_blank",
    //   "top=100,left=500,width=800,height=600"
    // );
  };
  console.log("hehehe", redirectToSearch);
  return (
    <AppBar position="sticky" style={{ boxShadow: "none" }}>
      <Container>
        {console.log("THE VALUE", redirectToDiscover)}
        {redirectToSearch && (
          <Redirect
            to={{
              pathname: `/discover/${searchString}`,
              searchString: searchString,
            }}
          >
            {console.log("hehehehefasffsafasfsafasfasfasfasf")}
          </Redirect>
        )}

        <Toolbar className={classes.root}>
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => {
              setRedirectToSearch(false);
            }}
          >
            <Typography variant="h3" className={classes.logo}>
              ZMDBi
            </Typography>
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
                console.log("SPUSTEN");
                redirectToDiscoverUpdate(!redirectToDiscover);
                e.preventDefault();
              }}
            >
              {" "}
              {/* <Link to="/discover" style={{ textDecoration: "none" }}>
                  <Button variant="contained">DISCOVER</Button>
                </Link> */}
              <div style={{ width: "500px" }}>
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
                    console.log("SEARCH STRING", searchString);
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
              <Button style={{ alignSelf: "center" }} type="submit">
                Search
              </Button>
            </form>
          </div>
          <Button
            className={classes.btn}
            onClick={() => requestToken()}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </Toolbar>
        <Container maxWidth="false" className={classes.belowAppBar}>
          {/* <FormControl>
            <Typography variant="body2">Genre</Typography>
            <NativeSelect
              value={genre}
              labelId="label"
              onChange={(e) => {
                setGenre(e.target.value);
                console.log(genre);
              }}
              id="select"
              className={classes.dropDown}
            >
              <option value="none">None</option>
              <option value="action">Action</option>
              <option value="horror">Horror</option>
              <option value="drama">Drama</option>
              <option value="adventure">Adventure</option>
              <option value="thriller">Thriller</option>
              <option value="comedy">Comedy</option>
            </NativeSelect>
          </FormControl>

          <FormControl hiddenLabel="false" className={classes.formControl}>
            <Typography variant="body2">Sort By</Typography>
            <NativeSelect
              style={{ minWidth: 130 }}
              labelId="label"
              id="select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              className={classes.dropDown}
            >
              <option value="popularity">Popularity</option>
              <option value="review_score">Review Score</option>
              <option value="release_date">Release Date</option>
            </NativeSelect>
          </FormControl> */}
        </Container>
      </Container>
    </AppBar>
  );
};

export default NavBar;
