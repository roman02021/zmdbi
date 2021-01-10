import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import { Container } from "@material-ui/core";
import { useParams, useRouteMatch, Link } from "react-router-dom";
const MoviePage = () => {
  let match = useRouteMatch("/details/:id");

  const movieId = match.url.slice(9, match.url.length);
  const [movieDetails, setMovieDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [credits, setCredits] = useState([]);
  const [topBilledCast, setTopBilledCast] = useState([]);
  const [director, setDirector] = useState("");
  console.log(movieId);
  async function fetchMovie() {
    const details = await axios.get("http://localhost:5000/details", {
      params: { id: movieId },
    });
    const reviews = await axios.get("http://localhost:5000/details/reviews", {
      params: { id: movieId },
    });
    const credits = await axios.get("http://localhost:5000/details/credits", {
      params: { id: movieId },
    });
    console.log("BEFORE ASSIGN", credits);
    //filter to find top 10 cast by popularity
    const topBilledCast = credits.data.cast
      .sort((actor) => actor.popularity > actor.popularity)
      .slice(0, 10);
    setTopBilledCast(topBilledCast);
    //filter to find director
    const director = credits.data.crew.filter(
      (crew) => crew.job === "Director"
    );
    setDirector(director[0].name);

    setCredits(credits.data);
    setMovieDetails(details.data);
    setReviews(reviews.data.results);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <Container>
      <img
        style={{
          position: "absolute",
          marginTop: "150px",
          marginLeft: "60px",
          border: "solid black 2px",
        }}
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
      ></img>
      <img
        src={`https://image.tmdb.org/t/p/h632/${movieDetails.backdrop_path}`}
      ></img>
      <h1>Director: {director}</h1>
      <h1>Rating: {movieDetails.vote_average * 10}%</h1>
      <h1>Title: {movieDetails.original_title}</h1>
      <h1>Release Date: {movieDetails.release_date}</h1>
      <p>Tagline: {movieDetails.tagline}</p>
      <h1>Length: {movieDetails.runtime}</h1>
      <h1>Overview: {movieDetails.overview}</h1>
      <h1>Top Billed Cast</h1>
      <div style={{ display: "flex" }}>
        {topBilledCast.map((actor) => (
          <div>
            {actor.profile_path ? (
              <Link
                to={{
                  pathname: `/actor/${actor.id}`,
                }}
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`}
                ></img>
              </Link>
            ) : (
              <Link
                to={{
                  pathname: `/actor/${actor.id}`,
                }}
              >
                <img
                  style={{ width: "138px", height: "175px" }}
                  src={`https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png`}
                ></img>
              </Link>
            )}

            <h4>{actor.original_name}</h4>
            <p>{actor.character}</p>
          </div>
        ))}
        <img></img>
      </div>
      <Link
        to={{
          pathname: `/credits/${movieDetails.id}`,
          state: {
            credits: credits,
          },
        }}
      >
        {" "}
        <button>view cast</button>
      </Link>
      {reviews.map((review) => (
        <Review reviews={review} movieDetails={movieDetails} />
      ))}
    </Container>
  );
};

export default MoviePage;
