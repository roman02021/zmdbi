import React, { useState } from 'react';
import './style.scss';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
  ClickAwayListener,
} from '@material-ui/core';
import noImageHolder from '../../images/no_image_holder.png';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import RatingWheel from '../LandingPage/RatingWheel';
import { useUserId } from '../../contexts/SignedContext';

import MovieDropLoggedOut from './MovieDropLoggedOut';
import MovieDropLogged from './MovieDropLogged';
import { useSigned } from '../../contexts/SignedContext';
const MovieCard = ({ movie, imgWidth, imgHeight, mediaType }) => {
  const signed = useSigned();
  const userId = useUserId();

  let borderRadius;
  let height;
  let shadow;
  let bgColor;
  if (imgWidth === '200') {
    borderRadius = 0;
    height = 382;
    shadow = '5px 5px 18px #DAD7D7';
  } else {
    bgColor = '#FAFAFA';
    shadow = 'none';
    borderRadius = 5;
    height = 'auto';
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: `${bgColor}`,
      overflow: 'visible',
      height: `${height}px`,
      justifySelf: 'center',
      margin: '15px',
      position: 'relative',
      boxShadow: `${shadow}`,
      padding: 0,
    },
    cardMedia: {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      borderRadius: '5px 5px 0 0',
    },
  }));

  const [dropDown, setDropDown] = useState(false);

  const classes = useStyles();
  return (
    <Card className={classes.root} key={movie.id}>
      {imgWidth === '200' ? (
        <RatingWheel
          rating={(movie.vote_average * 10).toFixed()}
          discover={true}
        ></RatingWheel>
      ) : (
        <RatingWheel rating={(movie.vote_average * 10).toFixed()}></RatingWheel>
      )}
      <ClickAwayListener onClickAway={() => setDropDown(false)}>
        <Box>
          <IconButton
            className="dropDownButton"
            disableFocusRipple
            disableRipple
            children={<MoreVertIcon />}
            onClick={() => setDropDown(!dropDown)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              position: 'absolute',
              right: '5px',
              padding: '0px',
              top: '5px',
            }}
          ></IconButton>
          {dropDown && !signed && <MovieDropLoggedOut />}
          {dropDown && signed && (
            <MovieDropLogged
              mediaType={mediaType}
              movieId={movie.id}
              userId={userId}
            />
          )}
        </Box>
      </ClickAwayListener>

      <Link
        style={{ width: '200px' }}
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
      <CardContent style={{ padding: '0px', marginLeft: '3px' }}>
        <Link
          props={movie.id}
          to={`/details/${mediaType}/${movie.id}/`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            className="hoverLink"
            variant="body2"
            color="textPrimary"
            component="p"
            style={{
              '&:hover': { cursor: 'pointer' },
              marginTop: '3px',
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
          style={{ verticalAlign: 'text-bottom' }}
        >
          {movie.first_air_date && movie.first_air_date.slice(0, 4)}
          {movie.release_date && movie.release_date.slice(0, 4)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
