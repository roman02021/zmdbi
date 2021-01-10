import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../contexts/Context";
import SearchIcon from "@material-ui/icons/Search";
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

  belowAppBar: {
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "rgb(63,81,140)",
  },
});

const NavBar = () => {
  const { showMoviesMode, setShowMoviesMode, search, setSearch } = useContext(
    Context
  );
  const [genre, setGenre] = useState("none");
  const [sortBy, setSortBy] = useState("popularity");

  const classes = useStyles();

  const requestToken = async () => {
    // const token = await axios.get("http://localhost:5000/getToken");
    // console.log(token);
    // window.open(`https://www.themoviedb.org/authenticate/${token}`);
    window.open(
      "https://www.themoviedb.org",
      "_blank",
      "top=100,left=500,width=800,height=600"
    );
  };

  useEffect(() => {
    setShowMoviesMode(genre);
  }, [genre]);
  useEffect(() => {
    setShowMoviesMode(sortBy);
  }, [sortBy]);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar className={classes.root}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Typography variant="h4" className={classes.logo}>
              ZMDBi
            </Typography>
          </Link>
          <form
            style={{ display: "flex" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (showMoviesMode === "search") {
                setShowMoviesMode("searcho");
              } else {
                setShowMoviesMode("search");
              }
            }}
          >
            <div style={{ width: "500px" }}>
              <TextField
                style={{ alignSelf: "flex-end", width: "100%" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
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
            <Button style={{ alignSelf: "flex-end" }} type="submit">
              Search
            </Button>
          </form>
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
          <FormControl>
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
          </FormControl>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;
