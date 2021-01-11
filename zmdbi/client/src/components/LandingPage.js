import React, { useEffect, useState } from "react";
import MovieSlider from "./MovieSlider";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
const LandingPage = () => {
  const [topRated, setTopRated] = useState([]);
  const [moviesToday, setMoviesToday] = useState([]);
  const [thisWeekMovies, setThisWeekMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
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
    setUpcoming(upcoming.data.results);
    setIsRendered(true);
  };

  useEffect(() => {
    getLandingPage();
  }, []);
  console.log("upcoming", upcoming);
  return (
    isRendered && (
      <Container>
        <Typography variant="h5">Upcoming</Typography>
        <MovieSlider props={upcoming} />

        <Typography variant="h5">Movies Today</Typography>
        <MovieSlider props={moviesToday} />
        <Typography variant="h5">Movies This Week</Typography>
        <MovieSlider props={thisWeekMovies} />
        <Typography variant="h5">Top Rated</Typography>
        <MovieSlider props={topRated} />
      </Container>
    )
  );
};

export default LandingPage;
