import React, { useEffect, useState } from "react";

import MovieSlider from "./MovieSlider";
import axios from "axios";
import { Container, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
import { useMediaQuery } from "@material-ui/core";
import TrendingPeople from "./TrendingPeople";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: "25px",
    fontWeight: 600,

    [theme.breakpoints.down("1300")]: {
      marginLeft: "10px",
    },
  },
  carouselImageCont: {
    borderRadius: "5px",
    margin: "auto",
    display: "flex",
    width: "780px",
    height: "439px",
    [theme.breakpoints.down("880")]: {
      width: "600px",
      height: "337px",
    },
    [theme.breakpoints.down("600")]: {
      width: "100vw",
      height: "calc(100vw * (9 / 16))",
      padding: 0,
      margin: 0,
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [topRated, setTopRated] = useState([]);
  const [moviesToday, setMoviesToday] = useState([]);
  const [thisDayTv, setThisDayTv] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isRendered, setIsRendered] = useState(false);

  const getLandingPage = async () => {
    try {
      const topRated = await axios.get(
        "https://arcane-reef-43492.herokuapp.com/landingPage/top_rated"
      );
      setTopRated(topRated.data.results);
    } catch (e) {
      console.log(e);
    }
    try {
      const moviesToday = await axios.get(
        "https://arcane-reef-43492.herokuapp.com/landingPage/this_day/movies"
      );
      setMoviesToday(moviesToday.data.results);
    } catch (e) {
      console.log(e);
    }

    const thisDayTv = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/landingPage/this_day/tv"
    );
    setThisDayTv(thisDayTv.data.results);

    const upcoming = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/landingPage/upcoming"
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
    <div>
      <Container
        disableGutters
        style={{ marginTop: isMobile ? "0px" : "20px" }}
      >
        <div className="carouselAndActorsContainer" style={{ display: "flex" }}>
          <div className="carousel">
            <Carousel
              touchEnabled={true}
              animation="slide"
              interval="4000"
              swipe="true"
            >
              {upcoming.map((movie, i) => (
                <Paper className={classes.carouselImageCont} key={movie.id}>
                  <Link
                    props={movie.id}
                    to={`/details/movie/${movie.id}`}
                    style={{ textDecoration: "none", color: "White" }}
                  >
                    <img
                      alt={movie.title}
                      className="carouselPosters"
                      style={{ position: "relative" }}
                      src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                    ></img>
                  </Link>
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
              ))}
            </Carousel>
          </div>
          {isMobile || <TrendingPeople mobile={isMobile ? true : false} />}
        </div>
        <Typography variant="h5" className={classes.header}>
          Trending Movies
        </Typography>
        <MovieSlider props={moviesToday} mediaType="movie" />
        <Typography variant="h5" className={classes.header}>
          Trending TV
        </Typography>
        <MovieSlider props={thisDayTv} mediaType="tv" />
        <Typography variant="h5" className={classes.header}>
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
