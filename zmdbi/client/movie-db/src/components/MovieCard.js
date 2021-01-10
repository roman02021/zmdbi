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

const useStyles = makeStyles({
  root: {
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

const MovieCard = (props) => {
  const [dropDown, setDropDown] = useState(false);

  const classes = useStyles();
  return (
    <Card className={classes.root} key={props.post.id}>
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
          pathname: `/details/${props.post.id}`,
        }}
      >
        <CardMedia
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/w200${props.post.poster_path}`}
          title={props.post.title}
        ></CardMedia>
      </Link>

      <CardContent style={{ paddingTop: 5 }}>
        <Link
          props={props.post.id}
          to={`/details/${props.post.id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body2"
            color="textPrimary"
            component="p"
            style={{ "&:hover": { cursor: "pointer" } }}
          >
            {props.post.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ verticalAlign: "text-bottom" }}
        >
          {props.post.release_date.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
