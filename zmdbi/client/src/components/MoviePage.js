import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import { Container, Typography, Grid } from "@material-ui/core";
import { useParams, useRouteMatch, Link } from "react-router-dom";
const MoviePage = () => {
  let match = useRouteMatch("/details/:id");

  const movieId = match.url.slice(9, match.url.length);
  const [movieDetails, setMovieDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [credits, setCredits] = useState([]);
  const [topBilledCast, setTopBilledCast] = useState([]);
  const [director, setDirector] = useState("");
  const [lodaded, setLoaded] = useState(false);

  console.log("heheh", movieDetails);
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

    setLoaded(true);
  }

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    lodaded && (
      <Container>
        <div
          style={{
            height: "632px",
            display: "flex",
            position: "relative",
            alignItems: "center",
          }}
        >
          <div
            style={{
              zIndex: 0,
              position: "absolute",
              height: "632px",
              marginTop: "10px",
              backgroundImage: `url(https://image.tmdb.org/t/p/h632/${movieDetails.backdrop_path})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              filter: "grayscale(50%) blur(3px)",

              width: "100%",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              zIndex: 1,
              width: "100%",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
            ></img>

            <div
              style={{
                width: "70%",
                marginLeft: "10px",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h4">
                {movieDetails.original_title} (
                {movieDetails.release_date.slice(0, 4)})
              </Typography>
              <Typography
                component="div"
                style={{
                  display: "flex",
                  padding: 0,
                  alignContent: "flex-start",
                }}
              >
                {movieDetails.genres.map((genre) => (
                  <p style={{ margin: 0, marginRight: "5px" }}>{genre.name}</p>
                ))}
              </Typography>

              <Typography>Rating: {movieDetails.vote_average * 10}%</Typography>
              <Typography>Length: {movieDetails.runtime}</Typography>
              <Typography>Overview: {movieDetails.overview}</Typography>
              <Typography>Director: {director}</Typography>
            </div>
          </div>
        </div>
        <h1>Top Billed Cast</h1>
        <div style={{ display: "flex", width: "100%", overflowX: "scroll" }}>
          {topBilledCast.map((actor) => (
            <div style={{ marginRight: "30px" }}>
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
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={{
                  pathname: `/actor/${actor.id}`,
                }}
              >
                <Typography>{actor.original_name}</Typography>
              </Link>
              <Typography>{actor.character}</Typography>
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
    )
  );
};

export default MoviePage;
