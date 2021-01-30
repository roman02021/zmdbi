import React, { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import { Container, Typography, Button, Grid, Box } from "@material-ui/core";

import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "../../linkStyle.scss";
import TopBilledCast from "./TopBilledCast";
import TopMovie from "./TopMovie";
import SideInfo from "./SideInfo";
import "./styles.scss";
const useStyles = makeStyles((theme) => ({
  backrop: {
    zIndex: 0,
    position: "absolute",
    height: "632px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    filter: "brightness(25%)",
    width: "100%",
  },
  backropMobile: {
    zIndex: 0,
    position: "absolute",

    [theme.breakpoints.down("600")]: {
      top: 48,
    },
    [theme.breakpoints.down("500")]: {
      top: 56,
    },
    height: "320px",
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
}));

const MoviePage = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { media_type, id } = useParams();
  console.log(media_type);
  const [movieDetails, setMovieDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [credits, setCredits] = useState([]);
  const [topBilledCast, setTopBilledCast] = useState([]);
  const [director, setDirector] = useState("");

  const [lodaded, setLoaded] = useState(false);

  async function fetchMovie() {
    try {
      const details = await axios.get(
        `https://arcane-reef-43492.herokuapp.com/details/${media_type}`,
        {
          params: { id: id },
        }
      );
      const reviews = await axios.get(
        `https://arcane-reef-43492.herokuapp.com/details/reviews/${media_type}`,
        {
          params: { id: id },
        }
      );
      const credits = await axios.get(
        `https://arcane-reef-43492.herokuapp.com/details/credits/${media_type}`,
        {
          params: { id: id },
        }
      );

      const topBilledCast = credits.data.cast
        .sort((actor1, actor2) => actor1.popularity > actor2.popularity)
        .slice(0, 10);
      setTopBilledCast(topBilledCast);
      const director = credits.data.crew.filter(
        (crew) => crew.job === "Director"
      );

      if (director.length > 0) {
        setDirector(director[0]);
      }

      setCredits(credits.data);
      setMovieDetails(details.data);
      setReviews(reviews.data.results);

      setLoaded(true);
    } catch (e) {
      try {
        const details = await axios.get(
          "https://arcane-reef-43492.herokuapp.com/details/tv",
          {
            params: { id: id },
          }
        );
        const reviews = await axios.get(
          "https://arcane-reef-43492.herokuapp.com/details/reviews/tv",
          {
            params: { id: id },
          }
        );
        const credits = await axios.get(
          "https://arcane-reef-43492.herokuapp.com/details/credits/tv",
          {
            params: { id: id },
          }
        );

        const topBilledCast = credits.data.cast
          .sort((actor) => actor.popularity > actor.popularity)
          .slice(0, 10);
        setTopBilledCast(topBilledCast);
        const director = credits.data.crew.filter(
          (crew) => crew.job === "Director"
        );

        if (director.length > 0) {
          setDirector(director[0]);
        }

        //filter to find director

        setCredits(credits.data);
        setMovieDetails(details.data);
        setReviews(reviews.data.results);

        setLoaded(true);
      } catch (e) {
        console.log(e);
      }
    }

    //filter to find top 10 cast by popularity
  }

  useEffect(() => {
    fetchMovie();
  }, []);
  return lodaded ? (
    <div>
      {movieDetails.backdrop_path ? (
        <div
          className={isMobile ? classes.backropMobile : classes.backrop}
          style={{
            backgroundImage: isMobile
              ? `url(https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path})`
              : `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path})`,
          }}
        ></div>
      ) : (
        <div
          className={isMobile ? classes.backropMobile : classes.backrop}
          style={{
            backgroundColor: "white",
            width: isMobile ? "780px" : "1920px",
          }}
        ></div>
      )}
      <Container className={classes.container} maxWidth="lg">
        <TopMovie
          mediaType={media_type}
          movieDetails={movieDetails}
          director={director}
        />
        {isMobile && (
          <Box style={{ marginTop: "10px" }}>
            <Typography variant="h5">Overview</Typography>
            <Typography className={classes.textStyle} variant="body2">
              {movieDetails.overview}
            </Typography>
          </Box>
        )}

        <Typography
          variant="h5"
          style={{
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          Top Billed Cast
        </Typography>

        <Grid container>
          <Grid item xs={12} sm={9}>
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
                <Button>
                  <Typography variant="h6">Show Cast</Typography>
                </Button>
              </Link>
            </div>
            {reviews.length > 0 ? (
              <Typography
                variant="h6"
                style={{ marginTop: "20px", marginLeft: "7px" }}
              >
                Reviews ({reviews.length})
              </Typography>
            ) : (
              <Typography style={{ marginTop: "20px", marginLeft: "7px" }}>
                No Reviews
              </Typography>
            )}

            {reviews &&
              reviews.map((review) => (
                <Review
                  reviews={review}
                  movieDetails={movieDetails}
                  key={review.id}
                />
              ))}
          </Grid>
          <Grid item sm={3}>
            {isMobile || (
              <SideInfo
                movieId={movieDetails.id}
                movieDetails={movieDetails}
                mediaType={media_type}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};

export default MoviePage;
