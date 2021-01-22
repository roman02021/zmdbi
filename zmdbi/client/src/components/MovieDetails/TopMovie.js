import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Paper } from "@material-ui/core";
import image_holder from "../../images/no_image_holder.png";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
const useStyles = makeStyles({
  actorImage: {
    borderRadius: "5px 5px 0 0",
  },
  backrop: {
    zIndex: 0,
    position: "absolute",
    height: "632px",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    filter: "brightness(30%)",

    width: "100%",
  },
  maxWidthXl: {
    padding: 0,
    maxWidth: "1170px",
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
});

const TopMovie = ({ movieDetails, director, writer }) => {
  console.log("WRITOR", writer);
  const classes = useStyles();
  console.log(movieDetails);
  return (
    <div
      style={{
        height: "632px",
        display: "flex",

        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",

          zIndex: 1,
          width: "100%",
        }}
      >
        {movieDetails.poster_path ? (
          <img
            style={{
              borderRadius: "5px",
            }}
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          ></img>
        ) : (
          <img
            style={{
              borderRadius: "5px",
              width: "300px",
              alt: "me",
            }}
            src={image_holder}
          ></img>
        )}

        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",

            width: "70%",
            paddingLeft: "10px",
          }}
        >
          <Typography variant="h5" className={classes.textStyle}>
            {movieDetails.title && movieDetails.title}
            {movieDetails.name && movieDetails.name}
            {movieDetails.release_date &&
              " (" + movieDetails.release_date.slice(0, 4) + ")"}
          </Typography>

          <Typography
            component="div"
            className={classes.textStyle}
            style={{
              display: "flex",
              padding: 0,
              alignContent: "flex-start",
            }}
          >
            {movieDetails.genres &&
              movieDetails.genres.map((genre) => (
                <p style={{ margin: 0, marginRight: "5px" }}>{genre.name}</p>
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
          <Typography variant="h6" className={classes.textStyle}>
            Overview
          </Typography>
          <Typography className={classes.textStyle}>
            {" "}
            {movieDetails.overview}
          </Typography>
          <div>
            {director && (
              <div className={classes.textStyle}>
                <Typography variant="h6">Director</Typography>
                <Link
                  to={`/actor/${director.id}/`}
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
                  to={`/actor/${writer.id}/`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography className="linkStyle">{writer.name}</Typography>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovie;
