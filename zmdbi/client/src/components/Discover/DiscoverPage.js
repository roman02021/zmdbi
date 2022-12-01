import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDiscover, useDiscoverUpdate } from '../../contexts/DiscoverContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../shared/MovieCard';
import '../../index.css';
import { useMediaQuery } from '@material-ui/core';
import { Grid, Container, Button, Typography, Box } from '@material-ui/core';
import './style.scss';
import Searcher from './Searcher/Searcher';
import MovieCardPhone from './MovieCardPhone';

const useStyles = makeStyles((theme) => ({
  movie: {
    maxWidth: '238px',
  },
  cardsGrid: {
    marginLeft: '30px',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('760')]: {
      marginLeft: 0,
      padding: '0px',
      justifyContent: 'center',
    },
  },
  posts: {
    [theme.breakpoints.down('600')]: {
      marginTop: '30px',
    },
  },
}));

const MainPage = () => {
  const location = useLocation();

  const isMobile = useMediaQuery('(max-width:600px)');

  const posts = useDiscover();
  const setPosts = useDiscoverUpdate();

  const [postsLoaded, setPostsLoaded] = useState(false);

  const classes = useStyles();
  const date = new Date();
  const [sortOption, setSortOption] = useState(location.state.sortOption);
  const [page, setPage] = useState(1);
  const [releaseDate, setReleaseDate] = useState([
    1900,
    parseInt(date.toISOString().slice(0, 4)),
  ]);

  const [score, setScore] = useState([0, 10]);
  const [genres, setGenres] = useState(' ');
  const [runtime, setRuntime] = useState([0, 360]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [language, setLanguage] = useState('en');

  const [loadContent, setLoadContent] = useState(false);

  const [mediaType, setMediaType] = useState(location.state.mediaType);

  const submitHandle = async () => {
    if (mediaType === false) {
      const discoverResults = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/media/movie/discover`,
        {
          params: {
            sortOption,
            page,

            releaseDateMin: releaseDate[0] + '-12-31',
            releaseDateMax: releaseDate[1] + '-12-31',
            scoreMin: score[0],
            scoreMax: score[1],
            genres: genres.replace(' ', ''),
            runtimeMin: runtime[0],
            runtimeMax: runtime[1],
            language,
          },
        }
      );

      setPage(1);
      setTotalResults(discoverResults.data.total_results);
      setTotalPages(discoverResults.data.total_pages);
      setPosts(discoverResults.data.results);
      setPostsLoaded(true);
    } else {
      const discoverResults = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/media/tv/discover`,
        {
          params: {
            sortOption,
            page,
            releaseDateMin: releaseDate[0] + '-12-31',
            releaseDateMax: releaseDate[1] + '-12-31',
            scoreMin: score[0],
            scoreMax: score[1],
            genres: genres.replace(' ', ''),
            runtimeMin: runtime[0],
            runtimeMax: runtime[1],
            language,
          },
        }
      );

      setPage(1);
      setTotalResults(discoverResults.data.total_results);
      setTotalPages(discoverResults.data.total_pages);
      setPosts(discoverResults.data.results);
      setPostsLoaded(true);
    }
  };

  const loadMore = async () => {
    if (page + 1 <= totalPages) {
      if (mediaType === false) {
        const discoverResults = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/media/movie/discover`,
          {
            params: {
              sortOption,
              page: page + 1,
              releaseDateMin: releaseDate[0] + '-12-31',
              releaseDateMax: releaseDate[1] + '-12-31',
              scoreMin: score[0],
              scoreMax: score[1],
              genres: genres.replace(' ', ''),
              runtimeMin: runtime[0],
              runtimeMax: runtime[1],
              language,
            },
          }
        );

        setPage(page + 1);
        setPosts(posts.concat(discoverResults.data.results));
      } else {
        const discoverResults = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/media/tv/discover`,
          {
            params: {
              sortOption,
              page: page + 1,
              releaseDateMin: releaseDate[0] + '-01-01',
              releaseDateMax: releaseDate[1] + '-12-31',
              scoreMin: score[0],
              scoreMax: score[1],
              genres: genres.replace(' ', ''),
              runtimeMin: runtime[0],
              runtimeMax: runtime[1],
              language,
            },
          }
        );
        setPage(page + 1);
        setPosts(posts.concat(discoverResults.data.results));
      }
    }
  };

  useEffect(() => {
    submitHandle();
    setLoadContent(false);
  }, [loadContent]);

  useEffect(() => {
    setSortOption(location.state.sortOption);
    setMediaType(location.state.mediaType);
    setLoadContent(true);
  }, [location.state.sortOption, location.state.mediaType]);

  return (
    <>
      {postsLoaded ? (
        <Container>
          <div
            style={{ display: 'flex', marginTop: '20px' }}
            className="searcherAndResults"
          >
            <Searcher
              genres={genres}
              setGenres={setGenres}
              defaultSortMode={location.state.sortOption}
              sortOption={sortOption}
              setRuntime={setRuntime}
              runtime={runtime}
              setScore={setScore}
              score={score}
              submitHandle={submitHandle}
              releaseDate={releaseDate}
              setReleaseDate={setReleaseDate}
              setSortOption={setSortOption}
              setLanguage={setLanguage}
              language={language}
              setMediaType={setMediaType}
              mediaType={mediaType}
            />

            <div
              className={classes.posts}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {isMobile ? (
                <Box>
                  {posts.map((post) => (
                    <MovieCardPhone mediaType={mediaType} mediaDetails={post} />
                  ))}{' '}
                  {totalPages > 1 && (
                    <Button
                      onClick={loadMore}
                      variant="contained"
                      style={{
                        width: '100%',
                        display: 'block',
                        borderRadius: '10px',
                        height: '40px',
                      }}
                    >
                      <Typography variant="h6">
                        Load More (
                        {totalPages !== page ? totalResults - page * 20 : 0}{' '}
                        results)
                      </Typography>
                    </Button>
                  )}
                </Box>
              ) : (
                <Grid container spacing={1} className={classes.cardsGrid}>
                  {posts &&
                    posts.map((post) => (
                      <Grid
                        lg={3}
                        xs={6}
                        sm={4}
                        item
                        className={classes.movie}
                        key={post.id}
                      >
                        {mediaType === false ? (
                          <MovieCard
                            movie={post}
                            imgWidth="200"
                            imgHeight="300"
                            mediaType="movie"
                          />
                        ) : (
                          <MovieCard
                            movie={post}
                            imgWidth="200"
                            imgHeight="300"
                            mediaType="tv"
                          />
                        )}
                      </Grid>
                    ))}
                  {totalPages > 1 && (
                    <Button
                      onClick={loadMore}
                      variant="contained"
                      style={{
                        width: '100%',
                        display: 'block',
                        borderRadius: '10px',
                        height: '40px',
                      }}
                    >
                      <Typography variant="h6">
                        Load More (
                        {totalPages !== page ? totalResults - page * 20 : 0}{' '}
                        results)
                      </Typography>
                    </Button>
                  )}
                </Grid>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <div className="spinner"></div>
      )}
    </>
  );
};

export default MainPage;
