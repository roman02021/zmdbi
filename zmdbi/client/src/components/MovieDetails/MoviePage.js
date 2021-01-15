import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import { Container, Typography, Paper, Button, Grid } from "@material-ui/core";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import RatingWheel from "../RatingWheel";
import { makeStyles } from "@material-ui/styles";
import "../../linkStyle.scss";
import TopBilledCast from "./TopBilledCast";
import TopMovie from "./TopMovie";
import SideInfo from "./SideInfo";
const useStyles = makeStyles({
  backrop: {
    zIndex: 0,
    position: "absolute",
    height: "632px",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    filter: "brightness(25%)",

    width: "100%",
  },
  maxWidthXl: {
    padding: 0,
    maxWidth: "1170px",
  },
  container: {
    backgroundColor: "#FAFAFA",
  },
});
// DOPORUCENE FILMY + KEYWORDS NA PRAVEJ STRANE + DODATOCNE INFO K FILMU
const MoviePage = () => {
  const classes = useStyles();

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

    if (credits.data != "Request failed with status code 404") {
      const topBilledCast = credits.data.cast
        .sort((actor) => actor.popularity > actor.popularity)
        .slice(0, 10);
      setTopBilledCast(topBilledCast);
      const director = credits.data.crew.filter(
        (crew) => crew.job === "Director"
      );
      if (director.length > 0) {
        setDirector(director[0].name);
      }
    }

    //filter to find director

    setCredits(credits.data);
    setMovieDetails(details.data);
    setReviews(reviews.data.results);

    setLoaded(true);
  }
  console.log(movieDetails);
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    lodaded && (
      <div>
        {movieDetails.backdrop_path ? (
          <div
            className={classes.backrop}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path})`,
            }}
          ></div>
        ) : (
          <div
            className={classes.backrop}
            style={{
              backgroundColor: "white",
              width: "1920px",
            }}
          ></div>
        )}
        <Container className={classes.container} maxWidth="lg">
          <TopMovie movieDetails={movieDetails} director={director} />

          <Typography
            variant="h4"
            style={{
              marginTop: "20px",
              marginBottom: "15px",
            }}
          >
            Top Billed Cast
          </Typography>

          <Grid container lg={12}>
            <Grid item xs={9}>
              <TopBilledCast
                movieDetails={movieDetails}
                topBilledCast={topBilledCast}
                credits={credits}
              ></TopBilledCast>
              <div style={{ marginTop: "20px" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: `/credits/${movieDetails.id}`,
                    state: {
                      credits: credits,
                    },
                  }}
                >
                  <Button variant="contained">show cast</Button>
                </Link>
              </div>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Reviews {reviews && reviews.length}
              </Typography>
              {reviews &&
                reviews.map((review) => (
                  <Review reviews={review} movieDetails={movieDetails} />
                ))}
            </Grid>
            <Grid item xs={3}>
              <SideInfo movieId={movieDetails.id} movieDetails={movieDetails} />
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  );
};

export default MoviePage;
