import React, { useEffect, useState } from "react";

import axios from "axios";
const LandingPage = () => {
  const [topRated, setTopRated] = useState([]);
  const [moviesToday, setMoviesToday] = useState([]);
  const [thisWeekMovies, setThisWeekMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

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
  };
  console.log("hello", topRated);
  useEffect(() => {
    getLandingPage();
    console.log("hello", topRated);
  }, []);

  return (
    <div>
      <h1>LandingPage</h1>
      <h1>Upcoming</h1>
      <div style={{ display: "flex", width: "80%" }}>
        {upcoming.map((movie) => (
          <div>
            {console.log("ICIGNJ")}
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            ></img>
            <p>{movie.original_title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>
        ))}
      </div>

      <h1>Movies Today</h1>
      <div style={{ display: "flex", width: "80vw" }}>
        {moviesToday.map((movie) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            ></img>
            <p>{movie.original_title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>
        ))}
      </div>
      <h1>Movies This Week</h1>
      <div style={{ display: "flex", width: "80vw" }}>
        {thisWeekMovies.map((movie) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            ></img>
            <p>{movie.original_title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>
        ))}
      </div>
      <h1>Top Rated</h1>
      <div style={{ display: "flex", width: "80vw" }}>
        {topRated.map((movie) => (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            ></img>
            <p>{movie.original_title}</p>
            <p>{movie.release_date.slice(0, 4)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
