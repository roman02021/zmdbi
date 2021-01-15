import React, { useEffect, useState, useContext } from "react";
// import { Context } from "../contexts/Context";
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
import {
  useSearchRedirectUpdate,
  useSearchRedirect,
  useSearchUpdate,
  useSearch,
} from "../contexts/SearchContext";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
const useStyles = makeStyles({
  navNums: {
    marginTop: 15,
  },
  movie: {
    maxWidth: "238px",
  },
});

const MainPage = () => {
  const redirectSearchUpdate = useSearchRedirectUpdate();
  const redirectToDiscover = useSearchRedirect();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(null);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const [noMoviesFound, setNoMoviesFound] = useState(false);
  const classes = useStyles();

  async function fetchMovies() {
    try {
      const data = await axios.get("http://localhost:5000/movies/search", {
        params: {
          page: currentPage,
          searchString: localStorage.getItem("searchString"),
        },
      });
      console.log(data.data);
      setPosts(data.data);
      setPostsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  }
  console.log("rwaraw", localStorage.getItem("searchString"));
  console.log(posts);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa", redirectToDiscover);
  useEffect(() => {
    fetchMovies();
  }, [redirectToDiscover]);

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
                      <MovieCard movie={post} imgWidth="200" imgHeight="300" />
                    </Grid>
                  )
              )}
          </Grid>
          <Grid
            container
            justify="center"
            spacing={5}
            className={classes.navNums}
          ></Grid>
        </Container>
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
};

export default MainPage;
