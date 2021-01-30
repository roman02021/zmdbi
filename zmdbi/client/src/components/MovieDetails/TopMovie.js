import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import image_holder from "../../images/no_image_holder.png";
import { Grid, Box } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
import "./styles.scss";
import MediaActions from "./MediaActions";
const useStyles = makeStyles((theme) => ({
  actorImage: {
    borderRadius: "5px 5px 0 0",
  },
  container: {
    backgroundColor: "#EEEEEE",
  },
  actorPaper: {
    margin: "10px",
  },
  acotrSubtitle: {
    fontSize: "12px",

    fontWeight: "bold",
    color: "#757575",
  },
  textStyle: {
    margin: "5px",
    marginLeft: "15px",
  },
  topMoviePhone: {
    position: "relative",
  },
  sideInfo: {
    overflow: "hidden",
    color: "white",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingLeft: "10px",
  },
  movie_poster: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  gridImage: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
      display: "flex",
      alignContent: "flex-end",
      objectFit: "contain",
    },
  },
  topMovieContainer: {
    zIndex: 10,
    display: "flex",
    height: "632px",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
      height: "320px",
    },
  },
}));

const TopMovie = ({ movieDetails, director, writer, mediaType }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const classes = useStyles();

  return (
    <div className={classes.topMovieContainer}>
      <Grid container justify="flex-start" style={{ flexWrap: "nowrap" }}>
        <Grid
          className={classes.gridImage}
          item
          style={{
            display: "flex",

            zIndex: 1,
          }}
        >
          {movieDetails.poster_path ? (
            <img
              alt={movieDetails.title && movieDetails.name}
              className={classes.movie_poster}
              style={{
                borderRadius: "5px",
              }}
              src={
                isMobile
                  ? `https://image.tmdb.org/t/p/w154${movieDetails.poster_path}`
                  : `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
              }
            ></img>
          ) : (
            <img
              alt={movieDetails.title && movieDetails.name}
              style={{
                borderRadius: "5px",
                width: isMobile ? "154px" : "300px",
              }}
              src={image_holder}
            ></img>
          )}
        </Grid>
        <Grid item className={classes.sideInfo}>
          <Typography variant="h5" className={classes.textStyle}>
            {movieDetails.title && movieDetails.title}
            {movieDetails.name && movieDetails.name}
            {movieDetails.release_date &&
              " (" + movieDetails.release_date.slice(0, 4) + ")"}
          </Typography>
          {/* <MediaActions movieId={movieDetails.id} mediaType={mediaType} /> */}
          <Typography
            component="div"
            className={classes.textStyle}
            style={{
              display: "flex",
              padding: 0,
              alignContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {movieDetails.genres &&
              movieDetails.genres.map((genre) => (
                <p style={{ margin: 0, marginRight: "5px" }} key={genre.name}>
                  {genre.name}
                </p>
              ))}
          </Typography>

          <Typography className={classes.textStyle}>
            Rating:{" "}
            {movieDetails.vote_average
              ? movieDetails.vote_average * 10 + "%"
              : "Not Yet Rated"}
          </Typography>

          <Typography className={classes.textStyle}>
            {movieDetails.runtime > 0 &&
              Math.floor(movieDetails.runtime / 60) + "h"}{" "}
            {movieDetails.runtime > 0 && (movieDetails.runtime % 60) + "m"}
          </Typography>

          {isMobile || (
            <Box>
              <Typography variant="h6" className={classes.textStyle}>
                Overview
              </Typography>
              <Typography className={classes.textStyle}>
                {movieDetails.overview}
              </Typography>
            </Box>
          )}

          <div>
            {director && (
              <div className={classes.textStyle}>
                <Typography variant="h6">Director</Typography>
                <Link
                  to={`/person/${director.id}/`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography className="linkStyle">{director.name}</Typography>
                </Link>
              </div>
            )}
            {writer && (
              <div className={classes.textStyle}>
                <Typography variant="h6">Writer</Typography>
                <Link
                  to={`/person/${writer.id}/`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography className="linkStyle">{writer.name}</Typography>
                </Link>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopMovie;
