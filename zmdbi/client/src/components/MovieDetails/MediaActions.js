import React, { useState, useEffect, useRef } from 'react';
import { useUserId } from '../../contexts/SignedContext';
import { IconButton, Box, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { makeStyles } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from 'axios';
import { useSigned } from '../../contexts/SignedContext';
const useStyles = makeStyles({
  action: {
    borderBottom: '1px solid black',
    '&:hover': {
      backgroundColor: '#CCCCCC',
    },
  },
  starContainer: {
    height: '35px',
    position: 'absolute',
    top: '80px',
    left: '60px',
    backgroundColor: 'black',
  },
  star: {
    fontSize: '32px',
    '&:hover': {
      cursor: 'pointer',
      color: '#0BB5E0',

      '&~svg': {
        color: '#0BB5E0',
      },
    },
  },
});

const MediaActions = ({ movieId, mediaType }) => {
  const firstRender = useRef(true);
  const signed = useSigned();
  const [score, setScore] = useState(0);
  const userId = useUserId();
  const [accountStates, setAccountStates] = useState({});
  const addFavourite = async () => {
    await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/authentication/addFavourite`,
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
      `${process.env.REACT_APP_SERVER_URL}/authentication/addWatchlist`,
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
      `${process.env.REACT_APP_SERVER_URL}/authentication/addRating`,
      {
        withCredentials: true,
        params: {
          score: score,
          media_id: movieId,
        },
      }
    );
  };
  const getAccountStates = async () => {
    try {
      if (signed) {
        const accountStates = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/authentication/${mediaType}/getAccountStates`,
          {
            withCredentials: true,
            params: {
              media_id: movieId,
            },
          }
        );
        console.log(accountStates.data);
        setAccountStates(accountStates.data);
      } else {
        setAccountStates({});
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const classes = useStyles();
  const [showRater, setShowRater] = useState(false);

  useEffect(() => {
    getAccountStates();
  }, [signed]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      addRating();
    }
  }, [score]);
  console.log(accountStates);
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.7)',
        width: 'fit-content',
        borderRadius: '7px',
        marginLeft: '10px',
      }}
    >
      <IconButton
        children={
          accountStates.watchlist ? (
            <WatchLaterIcon style={{ color: '#EEC407' }} />
          ) : (
            <WatchLaterIcon color="red" />
          )
        }
        onClick={() => addWatchlist()}
      />
      <IconButton
        onClick={() => {
          addFavourite();
        }}
        children={
          accountStates.favorite ? (
            <FavoriteIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon />
          )
        }
      />
      <IconButton
        onClick={() => setShowRater(!showRater)}
        children={
          accountStates.rated ? (
            <StarIcon style={{ color: '#EF47B6' }} />
          ) : (
            <StarBorderIcon />
          )
        }
      />

      {accountStates.rated && (
        <Typography
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '10px',
          }}
        >
          Your rating is {accountStates.rated.value}/10
        </Typography>
      )}

      {showRater && (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'center',
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
export default MediaActions;
