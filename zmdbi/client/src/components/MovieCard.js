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

const MovieCard = ({ movie, imgWidth, imgHeight }) => {
  let borderRadius;
  if (imgWidth === "200") {
    borderRadius = 0;
  } else {
    borderRadius = 5;
  }
  const useStyles = makeStyles({
    root: {
      overflow: "visible",
      height: `auto`,
      justifySelf: "center",
      margin: "15px",
      position: "relative",
      boxShadow: "none",
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
      <CardContent style={{ paddingTop: "5px", paddingLeft: "5px" }}>
        <Link
          props={movie.id}
          to={`/details/${movie.id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            style={{
              "&:hover": { cursor: "pointer" },
              padding: "0px",
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
