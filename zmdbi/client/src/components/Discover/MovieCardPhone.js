import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import imageHolder from "../../images/no_image_holder_w92.png";
const useStyles = makeStyles({
  root: {
    display: "flex",
    marginBottom: "10px",
    boxShadow: "0px 0px 10px #cccccc",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0,
    marginLeft: "10px",
  },
  image: {
    width: "92px",
    height: "138px",
  },
});

export const MovieCardPhone = ({ mediaDetails, mediaType }) => {
  const classes = useStyles();
  console.log(mediaType);
  return (
    <Card className={classes.root}>
      <Link
        to={{
          pathname: `/details/${mediaType ? "tv" : "movie"}/${mediaDetails.id}`,
        }}
      >
        <CardMedia
          className={classes.image}
          component="img"
          src={
            mediaDetails.poster_path
              ? `https://image.tmdb.org/t/p/w92${mediaDetails.poster_path}`
              : imageHolder
          }
          title={mediaDetails.original_title}
        />
      </Link>

      <CardContent className={classes.content}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/details/${mediaType ? "tv" : "movie"}/${
              mediaDetails.id
            }`,
          }}
        >
          <Typography variant="h6">
            {mediaDetails.original_title || mediaDetails.name}
          </Typography>
        </Link>
        <Typography variant="caption">
          {mediaDetails.release_date && mediaDetails.release_date.slice(0, 4)}
          {mediaDetails.first_air_date &&
            mediaDetails.first_air_date.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default MovieCardPhone;
