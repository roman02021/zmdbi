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

const MovieCard = ({ movie, imgSize }) => {
  console.log(imgSize);
  const useStyles = makeStyles({
    root: {
      minWidth: `${imgSize}`,
      width: 200,
      marginTop: 20,
      height: 367,
      justifySelf: "center",
    },
    cardMedia: {
      height: 100,
      paddingTop: "200px",
    },
  });
  const [dropDown, setDropDown] = useState(false);
  console.log(movie);
  const classes = useStyles();
  return (
    <Card className={classes.root} key={movie.id}>
      <CardHeader
        style={{ height: "0%", padding: 0 }}
        action={
          <ClickAwayListener onClickAway={() => setDropDown(false)}>
            <IconButton onClick={() => setDropDown(true)}>
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
        }
      />

      <Link
        to={{
          pathname: `/details/${movie.id}`,
        }}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w${imgSize}${movie.poster_path}`}
          title={movie.title}
        ></CardMedia>
      </Link>

      <CardContent style={{ paddingTop: 5 }}>
        <Link
          props={movie.id}
          to={`/details/${movie.id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            style={{ "&:hover": { cursor: "pointer" } }}
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
