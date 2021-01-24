import React, { useEffect, useState } from "react";
// import { Context } from "../contexts/Context";
import { makeStyles } from "@material-ui/styles";
import { useDiscover, useDiscoverUpdate } from "../../contexts/DiscoverContext";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import MovieCard from "../shared/MovieCard";
import "../../index.css";
import { Grid, Container, Button } from "@material-ui/core";

import Searcher from "./Searcher";

const useStyles = makeStyles({
  navNums: {
    marginTop: 15,
  },
  movie: {
    maxWidth: "238px",
  },
});

const loadMore = () => {};
const MainPage = () => {
  const location = useLocation();
  const history = useHistory();
  console.log("heheeh", location);
  console.log("HEHAAAAAAAAAAAAAa", history);

  const posts = useDiscover();
  const setPosts = useDiscoverUpdate();

  const [postsLoaded, setPostsLoaded] = useState(false);

  const classes = useStyles();
  const date = new Date();
  const [sortOption, setSortOption] = useState(location.state.sortOption);
  const [page, setPage] = useState(1);
  const [releaseDateMin, setReleaseDateMin] = useState("1870-01-01");
  const [releaseDateMax, setReleaseDateMax] = useState(
    date.toISOString().slice(0, 10)
  );

  const [score, setScore] = useState([0, 10]);
  const [genres, setGenres] = useState("");
  const [runtime, setRuntime] = useState([0, 360]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [language, setLanguage] = useState("en");

  const [mediaType, setMediaType] = useState(location.state.mediaType);

  const submitHandle = async () => {
    console.log(mediaType);
    if (mediaType == false) {
      const discoverResults = await axios.get(
        "http://localhost:5000/movies/movie/discover",
        {
          params: {
            sortOption,
            page,
            releaseDateMin: releaseDateMin.slice(0, 10),
            releaseDateMax: releaseDateMax.slice(0, 10),
            scoreMin: score[0],
            scoreMax: score[1],
            genres,
            runtimeMin: runtime[0],
            runtimeMax: runtime[1],
            language,
          },
        }
      );
      console.log("MOVIE", discoverResults.data);
      setPage(1);
      setTotalResults(discoverResults.data.total_results);
      setTotalPages(discoverResults.data.total_pages);
      setPosts(discoverResults.data.results);
      setPostsLoaded(true);
    } else {
      const discoverResults = await axios.get(
        "http://localhost:5000/movies/tv/discover",
        {
          params: {
            sortOption,
            page,
            releaseDateMin: releaseDateMin.slice(0, 10),
            releaseDateMax: releaseDateMax.slice(0, 10),
            scoreMin: score[0],
            scoreMax: score[1],
            genres,
            runtimeMin: runtime[0],
            runtimeMax: runtime[1],
            language,
          },
        }
      );
      console.log("TV", discoverResults.data);
      setPage(1);
      setTotalResults(discoverResults.data.total_results);
      setTotalPages(discoverResults.data.total_pages);
      setPosts(discoverResults.data.results);
      setPostsLoaded(true);
    }
  };

  const loadMore = async () => {
    if (page + 1 > totalPages) {
    } else {
      setPage(page + 1);

      if (mediaType == false) {
        const discoverResults = await axios.get(
          "http://localhost:5000/movies/movie/discover",
          {
            params: {
              sortOption,
              page,
              releaseDateMin: releaseDateMin.slice(0, 10),
              releaseDateMax: releaseDateMax.slice(0, 10),
              scoreMin: score[0],
              scoreMax: score[1],
              genres,
              runtimeMin: runtime[0],
              runtimeMax: runtime[1],
              language,
            },
          }
        );
        setPosts(posts.concat(discoverResults.data.results));
      } else {
        const discoverResults = await axios.get(
          "http://localhost:5000/movies/tv/discover",
          {
            params: {
              sortOption,
              page,
              releaseDateMin: releaseDateMin.slice(0, 10),
              releaseDateMax: releaseDateMax.slice(0, 10),
              scoreMin: score[0],
              scoreMax: score[1],
              genres,
              runtimeMin: runtime[0],
              runtimeMax: runtime[1],
              language,
            },
          }
        );
        setPosts(posts.concat(discoverResults.data.results));
      }
    }
  };

  useEffect(() => {
    submitHandle();
  }, [sortOption]);
  useEffect(() => {
    setSortOption(location.state.sortOption);
    setMediaType(location.state.mediaType);
  }, [location.state.sortOption, location.state.mediaType]);
  console.log("LOCAJJTWAKTAWIKT", location.state);
  return (
    <>
      {postsLoaded ? (
        <Container>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Searcher
              defaultSortMode={location.state.sortOption}
              releaseDateMax={releaseDateMax}
              setRuntime={setRuntime}
              runtime={runtime}
              setScore={setScore}
              score={score}
              submitHandle={submitHandle}
              setReleaseDateMax={setReleaseDateMax}
              setReleaseDateMin={setReleaseDateMin}
              releaseDateMin={releaseDateMin}
              setSortOption={setSortOption}
              setLanguage={setLanguage}
              setMediaType={setMediaType}
              mediaType={mediaType}
            />
            <Grid container spacing={1} style={{ justifyContent: "center" }}>
              {posts &&
                posts.map((post) => (
                  <Grid lg={3} xs={6} sm={4} item className={classes.movie}>
                    {mediaType === false ? (
                      <MovieCard
                        movie={post}
                        imgWidth="200"
                        imgHeight="300"
                        mediaType="movie"
                      />
                    ) : (
                      <MovieCard
                        movie={post}
                        imgWidth="200"
                        imgHeight="300"
                        mediaType="tv"
                      />
                    )}
                  </Grid>
                ))}
              <Button
                onClick={loadMore}
                variant="contained"
                style={{ display: "block" }}
              >
                Load More
              </Button>
            </Grid>
          </div>
        </Container>
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
};

export default MainPage;
