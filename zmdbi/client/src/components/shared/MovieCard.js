import React, { useState, useRef } from "react";
import "./style.scss";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  ButtonGroup,
  Button,
  ClickAwayListener,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import StarIcon from "@material-ui/icons/Star";
import DoneIcon from "@material-ui/icons/Done";
import Slider from "@material-ui/core/Slider";
import noImageHolder from "../../images/no_image_holder.png";
import { Link, useParams } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/styles";
import RatingWheel from "../LandingPage/RatingWheel";
import { useUserId } from "../../contexts/SignedContext";
import axios from "axios";
const MovieCard = ({ movie, imgWidth, imgHeight, mediaType }) => {
  const userId = useUserId();

  let borderRadius;
  let height;
  let shadow;
  let bgColor;
  if (imgWidth === "200") {
    borderRadius = 0;
    height = 382;
    shadow = "5px 5px 18px #DAD7D7";
  } else {
    bgColor = "#FAFAFA";
    shadow = "none";
    borderRadius = 5;
    height = "auto";
  }
  const [score, setScore] = useState(0);

  const addFavourite = async () => {
    await axios.get("http://localhost:5000/getToken/addFavourite", {
      withCredentials: true,
      params: {
        user_id: userId,
        media_id: movie.id,
        media_type: mediaType,
      },
    });
  };
  const addWatchlist = async () => {
    await axios.get("http://localhost:5000/getToken/addWatchlist", {
      withCredentials: true,
      params: {
        user_id: userId,
        media_id: movie.id,
        media_type: mediaType,
      },
    });
  };
  const addRating = async () => {
    await axios.get("http://localhost:5000/getToken/addRating", {
      withCredentials: true,
      params: {
        score: score,
        media_id: movie.id,
      },
    });
  };
  const rater = useRef(null);

  const showRater = () => {
    rater.current.style.display = "block";
  };

  const useStyles = makeStyles({
    root: {
      backgroundColor: `${bgColor}`,
      overflow: "visible",
      height: `${height}px`,
      justifySelf: "center",
      margin: "15px",
      position: "relative",
      boxShadow: `${shadow}`,
      padding: 0,
    },
    cardMedia: {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      borderRadius: `${borderRadius}px`,
    },
  });
  const handleScore = (e, newValue) => {
    setScore(newValue);
  };
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
          className="dropDownButton"
          disableFocusRipple
          disableRipple
          onClick={() => setDropDown(true)}
          style={{
            backgroundColor: "white",
            position: "absolute",
            right: "3px",
            padding: "0px",
            top: "5px",
          }}
        >
          {dropDown || <MoreVertIcon />}
          {dropDown && (
            <ButtonGroup
              fullWidth="true"
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexGrow: 1,
              }}
              variant="contained"
              orientation="vertical"
              color="primary"
              aria-label="vertical outlined primary button group"
            >
              <Button
                startIcon={<WatchLaterIcon></WatchLaterIcon>}
                onClick={addWatchlist}
              >
                Watchlist
              </Button>
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                startIcon={<FavoriteIcon></FavoriteIcon>}
                onClick={addFavourite}
              >
                Favorite
              </Button>
              <Button
                onClick={showRater}
                startIcon={<StarIcon></StarIcon>}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                Rate
              </Button>
              <form
                onSubmit={addRating}
                style={{
                  display: "none",
                  backgroundColor: "white",
                  width: "100%",
                }}
                ref={rater}
              >
                <Slider
                  fullWidth
                  style={{ width: "80%" }}
                  value={score}
                  onChange={handleScore}
                  valueLabelDisplay="auto"
                  max="10"
                ></Slider>
                <Button
                  color="primary"
                  fullWidth
                  style={{ width: "100%" }}
                  type="submit"
                  startIcon={<DoneIcon></DoneIcon>}
                >
                  Confirm
                </Button>
              </form>
            </ButtonGroup>
          )}
        </IconButton>
      </ClickAwayListener>

      <Link
        to={{
          pathname: `/details/${mediaType}/${movie.id}`,
        }}
      >
        {movie.poster_path ? (
          <CardMedia
            className={classes.cardMedia}
            image={`https://image.tmdb.org/t/p/w${imgWidth}${movie.poster_path}`}
            title={movie.title}
          ></CardMedia>
        ) : (
          <CardMedia
            className={classes.cardMedia}
            image={noImageHolder}
            title={movie.title}
          ></CardMedia>
        )}
      </Link>

      <CardContent style={{ padding: "0px", marginLeft: "3px" }}>
        <Link
          props={movie.id}
          to={`/details/${mediaType}/${movie.id}/`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            className="hoverLink"
            variant="body2"
            color="textPrimary"
            component="p"
            style={{
              "&:hover": { cursor: "pointer" },
              marginTop: "3px",
            }}
          >
            {movie.title}
            {movie.name}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ verticalAlign: "text-bottom" }}
        >
          {movie.first_air_date && movie.first_air_date.slice(0, 4)}
          {movie.release_date && movie.release_date.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
