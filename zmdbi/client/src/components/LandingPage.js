import React, { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import axios from "axios";
import { Container, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Link, useParams } from "react-router-dom";
import "../linkStyle.scss";

const useStyles = makeStyles({
  header: {
    marginTop: "25px",
  },
});

const LandingPage = () => {
  const classes = useStyles();

  const [topRated, setTopRated] = useState([]);
  const [moviesToday, setMoviesToday] = useState([]);
  const [thisWeekMovies, setThisWeekMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  console.log("UPCOMING", upcoming);

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

    const thisWeekMovies = await axios.get(
      "http://localhost:5000/landingPage/this_week/movies"
    );
    setThisWeekMovies(thisWeekMovies.data.results);

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
  console.log("upcoming", upcoming);
  return (
    isRendered && (
      <div style={{ marginTop: "20px" }}>
        <div style={{ width: "780px", margin: "auto" }}>
          <Carousel animation="slide" interval="8000">
            {upcoming.map((movie, i) => (
              <Link
                props={movie.id}
                to={`/details/${movie.id}`}
                style={{ textDecoration: "none", color: "White" }}
              >
                <Paper
                  style={{
                    margin: "auto",
                    display: "flex",
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`,
                    height: "438px",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    style={{
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
        <Container style={{ marginTop: "20px" }}>
          <Typography variant="h3" className={classes.header}>
            Movies Today
          </Typography>
          <MovieSlider props={moviesToday} />
          <Typography variant="h3" className={classes.header}>
            Movies This Week
          </Typography>
          <MovieSlider props={thisWeekMovies} />
          <Typography variant="h3" className={classes.header}>
            Top Rated
          </Typography>
          <MovieSlider props={topRated} />
        </Container>
      </div>
    )
  );
};

export default LandingPage;
