import React, { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import axios from "axios";
import { Container, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
import TrendingPeople from "./TrendingPeople";
const useStyles = makeStyles({
  header: {
    marginTop: "25px",
  },
});

const LandingPage = () => {
  const classes = useStyles();

  const [topRated, setTopRated] = useState([]);
  const [moviesToday, setMoviesToday] = useState([]);
  const [thisDayTv, setThisDayTv] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isRendered, setIsRendered] = useState(false);

  const items = [
    {
      name: "something",
      description: "something else",
    },
    {
      name: "something",
      description: "something else",
    },
  ];
  const getLandingPage = async () => {
    const topRated = await axios.get(
      "http://localhost:5000/landingPage/top_rated"
    );
    setTopRated(topRated.data.results);

    const moviesToday = await axios.get(
      "http://localhost:5000/landingPage/this_day/movies"
    );
    setMoviesToday(moviesToday.data.results);

    const thisDayTv = await axios.get(
      "http://localhost:5000/landingPage/this_day/tv"
    );
    setThisDayTv(thisDayTv.data.results);

    const upcoming = await axios.get(
      "http://localhost:5000/landingPage/upcoming"
    );
    setUpcoming(
      upcoming.data.results
        .sort((upcoming1, upcoming2) =>
          upcoming1.popularity < upcoming2.popularity ? 1 : -1
        )
        .slice(0, 8)
    );
    setIsRendered(true);
  };

  useEffect(() => {
    getLandingPage();
  }, []);

  return isRendered ? (
    <div style={{ marginTop: "20px" }}>
      <Container style={{ marginTop: "20px" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Carousel animation="slide" interval="4000">
              {upcoming.map((movie, i) => (
                <Link
                  props={movie.id}
                  to={`/details/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "White" }}
                >
                  <Paper
                    style={{
                      margin: "auto",
                      display: "flex",
                      // backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`,

                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img
                      style={{ positin: "relative " }}
                      src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                    ></img>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        alignSelf: "flex-end",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      <Typography
                        variant="h5"
                        className="hoverLink"
                        style={{
                          color: "white",
                          margin: "15px",
                          fontWeight: 500,
                          "&:hover": { color: "black" },
                        }}
                      >
                        {movie.title}
                      </Typography>
                    </div>
                  </Paper>
                </Link>
              ))}
            </Carousel>
          </div>
          <TrendingPeople />
        </div>
        <Typography variant="h3" className={classes.header}>
          Trending Movies
        </Typography>
        <MovieSlider props={moviesToday} mediaType="movie" />
        <Typography variant="h3" className={classes.header}>
          Trending TV
        </Typography>
        <MovieSlider props={thisDayTv} mediaType="tv" />
        <Typography variant="h3" className={classes.header}>
          Top Rated
        </Typography>
        <MovieSlider props={topRated} mediaType="movie" />
      </Container>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};

export default LandingPage;
