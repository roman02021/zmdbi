import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  hideKeywords: {
    display: 'none',
  },
});
const SideInfo = ({ movieId, movieDetails, mediaType }) => {
  const classes = useStyles();

  const [keywords, setKeywords] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [loaded, setLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const keywords = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/details/${mediaType}/keywords`,
        {
          params: { id: movieId },
        }
      );
      if (keywords.data.results) {
        setKeywords(keywords.data.results);
      } else {
        setKeywords(keywords.data.keywords);
      }

      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    loaded && (
      <div style={{ marginLeft: '30px' }}>
        <Typography variant="h6">Status</Typography>
        {movieDetails.status !== '' ? (
          <Typography>{movieDetails.status}</Typography>
        ) : (
          '-'
        )}
        <Typography variant="h6">Original Language</Typography>
        {movieDetails.original_language !== '' ? (
          <Typography>{movieDetails.original_language}</Typography>
        ) : (
          '-'
        )}
        <Typography variant="h6">Budget</Typography>
        {movieDetails.budget ? (
          movieDetails.budget > 1000 ? (
            movieDetails.budget > 1000000 ? (
              <Typography>{movieDetails.budget / 1000000} million</Typography>
            ) : (
              <Typography>{movieDetails.budget / 1000} thousand</Typography>
            )
          ) : (
            <Typography>{movieDetails.budget}</Typography>
          )
        ) : (
          '-'
        )}
        <Typography variant="h6">Revenue</Typography>
        {movieDetails.revenue ? (
          movieDetails.revenue > 1000 ? (
            movieDetails.revenue > 1000000 ? (
              <Typography>
                {Number(movieDetails.revenue / 1000000).toFixed(2)} million
              </Typography>
            ) : (
              <Typography>
                {Number(movieDetails.revenue / 1000).toFixed(2)} thousand
              </Typography>
            )
          ) : (
            <Typography>{Number(movieDetails.revenue).toFixed(2)} $</Typography>
          )
        ) : (
          '-'
        )}
        <div className={isMobile && classes.hideKeywords}>
          <Typography variant="h6" style={{ margin: '10px 0 10px 0' }}>
            Keywords
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {keywords ? (
              keywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  to={{
                    pathname: `/search/${keyword.name}`,
                    state: keyword.name,
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    onClick={(e) => {
                      localStorage.setItem('searchString', keyword.name);
                    }}
                    variant="outlined"
                    style={{ margin: '5px', padding: '4px' }}
                  >
                    {keyword.name}
                  </Button>
                </Link>
              ))
            ) : (
              <Typography>No keywords have been added.</Typography>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SideInfo;
