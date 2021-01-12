import React, { useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  IconButton,
  CardActionArea,
  ButtonGroup,
  Button,
  Container,
  ClickAwayListener,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/styles";
import RatingWheel from "./RatingWheel";
const MovieCard = ({ movie, imgWidth, imgHeight }) => {
  let borderRadius;
  let height;
  if (imgWidth === "200") {
    borderRadius = 0;
    height = 365;
  } else {
    borderRadius = 5;
    height = "auto";
  }

  const useStyles = makeStyles({
    root: {
      overflow: "visible",
      height: `${height}px`,
      justifySelf: "center",
      margin: "15px",
      position: "relative",
      boxShadow: "none",
      padding: 0,
    },
    cardMedia: {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      borderRadius: `${borderRadius}px`,
    },
  });
  const [dropDown, setDropDown] = useState(false);

  const classes = useStyles();
  return (
    <Card className={classes.root} key={movie.id}>
      {imgWidth === "200" ? (
        <RatingWheel
          rating={movie.vote_average * 10}
          discover={true}
        ></RatingWheel>
      ) : (
        <RatingWheel rating={movie.vote_average * 10}></RatingWheel>
      )}

      <ClickAwayListener onClickAway={() => setDropDown(false)}>
        <IconButton
          onClick={() => setDropDown(true)}
          style={{
            position: "absolute",
            right: "1px",
            padding: "0px",
            top: "5px",
          }}
        >
          {dropDown || <MoreVertIcon />}
          {dropDown && (
            <ButtonGroup
              variant="contained"
              orientation="vertical"
              color="primary"
              aria-label="vertical outlined primary button group"
            >
              <Button>Watchlist</Button>
              <Button>Rate</Button>
              <Button>Favorite</Button>
              <Button>Add To List</Button>
            </ButtonGroup>
          )}
        </IconButton>
      </ClickAwayListener>

      <Link
        to={{
          pathname: `/details/${movie.id}`,
        }}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w${imgWidth}${movie.poster_path}`}
          title={movie.title}
        ></CardMedia>
      </Link>
      <CardContent style={{ padding: "0px", marginLeft: "3px" }}>
        <Link
          props={movie.id}
          to={`/details/${movie.id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            style={{
              "&:hover": { cursor: "pointer" },
              marginTop: "3px",
            }}
          >
            {movie.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ verticalAlign: "text-bottom" }}
        >
          {movie.release_date.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
