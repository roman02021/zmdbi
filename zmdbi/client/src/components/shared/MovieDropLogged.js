import React, { useState, useEffect, useRef } from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles({
  action: {
    borderBottom: "1px solid black",
    "&:hover": {
      backgroundColor: "#CCCCCC",
    },
  },
  starContainer: {
    height: "35px",
  },
  star: {
    fontSize: "32px",
    "&:hover": {
      cursor: "pointer",
      color: "#0BB5E0",

      "&~svg": {
        color: "#0BB5E0",
      },
    },
  },
});

const MovieDropLogged = ({ userId, movieId, mediaType }) => {
  const firstRender = useRef(true);
  const classes = useStyles();
  const [score, setScore] = useState(0);
  const [showRater, setShowRater] = useState(false);
  const addFavourite = async () => {
    await axios.get(
      "https://arcane-reef-43492.herokuapp.com/authentication/addFavourite",
      {
        withCredentials: true,
        params: {
          user_id: userId,
          media_id: movieId,
          media_type: mediaType,
        },
      }
    );
  };
  const addWatchlist = async () => {
    await axios.get(
      "https://arcane-reef-43492.herokuapp.com/authentication/addWatchlist",
      {
        withCredentials: true,
        params: {
          user_id: userId,
          media_id: movieId,
          media_type: mediaType,
        },
      }
    );
  };
  const addRating = async () => {
    await axios.get(
      "https://arcane-reef-43492.herokuapp.com/authentication/addRating",
      {
        withCredentials: true,
        params: {
          score: score,
          media_id: movieId,
        },
      }
    );
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      addRating();
    }
  }, [score]);

  return (
    <div
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: "33px",
        left: "50px",
        width: "175px",
        zIndex: "20",
        borderRadius: "5px",
        boxShadow: "1px 1px 5px gray",
      }}
    >
      <Box className={classes.action}>
        <Button onClick={() => addWatchlist()}>Add to Watchlist</Button>
      </Box>
      <Box className={classes.action}>
        <Button onClick={() => addFavourite()}>Add to Favorite </Button>
      </Box>
      <Box className={classes.action}>
        <Button onClick={() => setShowRater(!showRater)}>Rate</Button>
      </Box>

      {showRater && (
        <Box
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
          }}
          className={classes.starContainer}
        >
          <StarIcon
            className={classes.star}
            onClick={() => {
              setScore(2);
            }}
          />
          <StarIcon className={classes.star} onClick={() => setScore(4)} />
          <StarIcon className={classes.star} onClick={() => setScore(6)} />
          <StarIcon className={classes.star} onClick={() => setScore(8)} />
          <StarIcon className={classes.star} onClick={() => setScore(10)} />
        </Box>
      )}
    </div>
  );
};

export default MovieDropLogged;
