import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, Link } from "react-router-dom";
import axios from "axios";
import SearchResult from "./SearchResult";
import SearchResultsSide from "./SearchResultsSide";
import PageNumNav from "./PageNumNav";
import { Container, Grid, Typography, Button, Paper } from "@material-ui/core";
import "../../index.css";
import profilePicHolder from "../../images/profile_pic_holder_w92.png";
import posterHolder from "../../images/no_image_holder_w92.png";

const SearchResults = () => {
  const history = useHistory();

  const location = useLocation();
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [searchedTv, setSearchedTv] = useState(null);
  const [searchedPeople, setSearchedPeople] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [resultsType, setResultsType] = useState("Movies");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalResultsMovies, setTotalResultsMovies] = useState(0);
  const [totalPagesMovies, setTotalPagesMovies] = useState(0);
  const [totalResultsTv, setTotalResultsTv] = useState(0);
  const [totalPagesTv, setTotalPagesTv] = useState(0);
  const [totalResultsPeople, setTotalResultsPeople] = useState(0);
  const [totalPagesPeople, setTotalPagesPeople] = useState(0);

  const fetchMovies = async () => {
    const searchedMovies = await axios.get(
      "http://localhost:5000/search/movie",
      {
        params: {
          searchQuery: history.location.state,
          page: currentPage,
        },
      }
    );
    console.log("MOVIES", searchedMovies);
    setSearchedMovies(searchedMovies.data.results);
    setTotalResultsMovies(searchedMovies.data.total_results);
    setTotalPagesMovies(searchedMovies.data.total_pages);
  };
  const fetchTv = async () => {
    const searchedTv = await axios.get("http://localhost:5000/search/tv", {
      params: {
        searchQuery: history.location.state,
        page: currentPage,
      },
    });
    console.log(searchedTv);
    setSearchedTv(searchedTv.data.results);
    setTotalResultsTv(searchedTv.data.total_results);
    setTotalPagesTv(searchedTv.data.total_pages);
  };
  const fetchPeople = async () => {
    const searchedPeople = await axios.get(
      "http://localhost:5000/search/people",
      {
        params: {
          searchQuery: history.location.state,
          page: currentPage,
        },
      }
    );
    console.log("TV", searchedPeople);
    setSearchedPeople(searchedPeople.data.results);
    setTotalResultsPeople(searchedPeople.data.total_results);
    setTotalPagesPeople(searchedPeople.data.total_pages);
  };

  console.log(searchedMovies);
  console.log(searchedTv);
  console.log(searchedPeople);

  useEffect(() => {
    fetchMovies();
    fetchTv();
    fetchPeople();
    setIsLoaded(true);
  }, [location.state]);

  useEffect(() => {
    if (resultsType === "Movies") {
      fetchMovies();
    } else if (resultsType === "TV") {
      fetchTv();
    } else if (resultsType === "People") {
      fetchPeople();
    }
  }, [currentPage]);

  return (
    <Container style={{ marginTop: "30px", minHeight: "60vh" }}>
      {isLoaded ? (
        <Grid container>
          <Grid xs={12} md={3}>
            <SearchResultsSide
              totalResultsMovies={totalResultsMovies}
              totalResultsPeople={totalResultsPeople}
              totalResultsTv={totalResultsTv}
              setResultsType={setResultsType}
              setCurrentPage={setCurrentPage}
            />
          </Grid>
          <Grid xs={12} md={9}>
            {resultsType === "Movies" && (
              <div>
                {console.log("SEARVHD MOIS", searchedMovies)}
                {searchedMovies &&
                  searchedMovies.map((movie) => (
                    <Paper
                      style={{
                        display: "flex",
                        marginBottom: "15px",
                      }}
                    >
                      {console.log(movie)}
                      <Link
                        to={`/details/movie/${movie.id}`}
                        style={{ height: "137px" }}
                      >
                        {movie.poster_path ? (
                          <img
                            className="searchPic"
                            src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                          ></img>
                        ) : (
                          <img className="searchPic" src={posterHolder}></img>
                        )}
                      </Link>
                      <div>
                        <Link
                          to={`/details/movie/${movie.id}`}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Typography
                            className="hoverStyleTitle"
                            variant="h6"
                            style={{
                              margin: "5px 0px 5px 10px",
                              color: "black",
                            }}
                          >
                            {movie.title}
                          </Typography>
                        </Link>
                        {movie.release_date ? (
                          <Typography style={{ margin: "5px 0px 5px 10px" }}>
                            {movie.release_date.slice(0, 4)}
                          </Typography>
                        ) : (
                          <Typography style={{ margin: "5px 0px 5px 10px" }}>
                            Not Released
                          </Typography>
                        )}
                      </div>
                    </Paper>
                  ))}
                <PageNumNav
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPagesMovies}
                />
              </div>
            )}
            {resultsType === "TV" && (
              <div>
                {searchedTv.map((tv) => (
                  <Paper
                    style={{
                      display: "flex",
                      marginBottom: "15px",
                    }}
                  >
                    {console.log(tv)}
                    <Link
                      to={`/details/tv/${tv.id}`}
                      style={{ height: "137px" }}
                    >
                      {tv.poster_path ? (
                        <img
                          className="searchPic"
                          src={`https://image.tmdb.org/t/p/w92/${tv.poster_path}`}
                        ></img>
                      ) : (
                        <img className="searchPic" src={posterHolder}></img>
                      )}
                    </Link>
                    <div>
                      <Link
                        to={`/details/movie/${tv.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Typography
                          variant="h6"
                          className="hoverStyleTitle"
                          style={{ margin: "5px 0px 5px 10px" }}
                        >
                          {tv.name}
                        </Typography>
                      </Link>
                      {tv.first_air_date ? (
                        <Typography style={{ margin: "5px 0px 5px 10px" }}>
                          {tv.first_air_date.slice(0, 4)}
                        </Typography>
                      ) : (
                        <Typography style={{ margin: "5px 0px 5px 10px" }}>
                          Not Released
                        </Typography>
                      )}
                    </div>
                  </Paper>
                ))}
                <PageNumNav
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPagesTv}
                />
              </div>
            )}
            {resultsType === "People" && (
              <div>
                {searchedPeople.map((person) => (
                  <Paper
                    style={{
                      display: "flex",
                      marginBottom: "15px",
                    }}
                  >
                    {console.log(person)}
                    <Link
                      to={`/actor/${person.id}`}
                      style={{ height: "137px" }}
                    >
                      {person.profile_path ? (
                        <img
                          className="searchPic"
                          src={`https://image.tmdb.org/t/p/w92/${person.profile_path}`}
                        ></img>
                      ) : (
                        <img className="searchPic" src={profilePicHolder}></img>
                      )}
                    </Link>
                    <div>
                      <Link
                        to={`/actor/${person.id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Typography
                          variant="h6"
                          className="hoverStyleTitle"
                          style={{ margin: "5px 0px 5px 10px" }}
                        >
                          {person.name}
                        </Typography>
                      </Link>
                      <Typography style={{ margin: "5px 0px 5px 10px" }}>
                        {person.known_for_department}
                      </Typography>
                    </div>
                  </Paper>
                ))}
                <PageNumNav
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPagesPeople}
                />
              </div>
            )}
          </Grid>
        </Grid>
      ) : (
        <div className="spinner"></div>
      )}
    </Container>
  );
};

export default SearchResults;
