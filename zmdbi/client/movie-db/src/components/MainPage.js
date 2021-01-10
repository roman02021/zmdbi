import React, { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/Context";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../index.css";
import {
  Grid,
  Container,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
const useStyles = makeStyles({
  navNums: {
    marginTop: 15,
  },
});

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);
  const { showMoviesMode, search } = useContext(Context);
  console.log(showMoviesMode);
  const classes = useStyles();

  async function fetchMovies() {
    if (showMoviesMode === "popularity" || showMoviesMode === "none") {
      try {
        const data = await axios.get("http://localhost:5000/movies", {
          params: { page: currentPage },
        });
        console.log("loaded");
        setPosts(data.data);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    } else if (showMoviesMode === "search" || showMoviesMode === "searcho") {
      try {
        const data = await axios.get("http://localhost:5000/movies/search", {
          params: { page: currentPage, searchString: search },
        });
        setPosts(data.data);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    } else if (showMoviesMode === "action") {
      try {
        const data = await axios.get(
          "http://localhost:5000/filterGenre/action"
        );
        setPosts(data.data);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    } else if (showMoviesMode === "horror") {
      try {
        const data = await axios.get(
          "http://localhost:5000/filterGenre/horror",
          {
            params: { page: currentPage },
          }
        );
        setPosts(data.data);
        setPostsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }
  }
  const navNums = [];
  for (let i = currentPage; i < currentPage + 6; i++) {
    navNums.push(i);
  }

  useEffect(() => {
    fetchMovies();
  }, [currentPage, showMoviesMode]);

  return (
    <>
      {postsLoaded ? (
        <Container fixed="true">
          <Grid container spacing={1} style={{ justifyContent: "center" }}>
            {postsLoaded &&
              posts.map(
                (post) =>
                  post.poster_path && (
                    <Grid lg={3} xs={6} md={4} item className={classes.movie}>
                      <MovieCard post={post} />
                    </Grid>
                  )
              )}
          </Grid>
          <Grid
            container
            justify="center"
            spacing={5}
            className={classes.navNums}
          >
            <IconButton
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <NavigateBeforeIcon fontSize="large" color="primary" />
            </IconButton>
            {navNums.map((navNum) => (
              <Grid item>
                <Typography>
                  {navNum === currentPage ? (
                    <Link
                      underline="always"
                      variant="h6"
                      color="primary"
                      component="button"
                      href="#"
                      onClick={() => setCurrentPage(navNum)}
                    >
                      {navNum}
                    </Link>
                  ) : (
                    <Link
                      variant="h6"
                      color="primary"
                      component="button"
                      href="#"
                      onClick={() => setCurrentPage(navNum)}
                    >
                      {navNum}
                    </Link>
                  )}
                </Typography>
              </Grid>
            ))}
            <IconButton onClick={() => setCurrentPage(currentPage + 1)}>
              <NavigateNextIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
        </Container>
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
};

export default MainPage;
