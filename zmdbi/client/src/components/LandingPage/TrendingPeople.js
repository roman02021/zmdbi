import { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  actorContainer: {
    width: "100%",
    boxShadow: "1px 1px 5px gray",

    borderRadius: "7px",
    [theme.breakpoints.up("1150")]: {
      margin: "15px",
      display: "flex",
    },
    [theme.breakpoints.down("1150")]: {
      margin: "0",
      marginTop: "7px",
      marginBottom: "7px",
      display: "flex",
    },
  },
  trendingTitle: {
    fontWeight: 600,
  },
  peopleAndTitleContainer: {},
  trendingPeopleContainer: {
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",

    flexDirection: "column",
    [theme.breakpoints.down("600")]: {
      marginTop: "10px",
      flexDirection: "row",
    },
  },
}));

const TrendingPerson = ({ mobile }) => {
  const classes = useStyles();

  const [trendingPeople, setTrendingPeople] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchTrendingPeople = async () => {
    const trendingPeople = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/landingPage/trendingPeople"
    );

    setTrendingPeople(
      trendingPeople.data.results
        .sort((person1, person2) =>
          person1.popularity < person2.popularity ? 1 : -1
        )
        .slice(0, 3)
    );
    setLoaded(true);
  };

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  return (
    loaded && (
      <div
        style={{ width: "100%" }}
        className={classes.peopleAndTitleContainer}
      >
        <Box
          ml={2}
          style={{
            display: "flex",
            justifyContent: mobile ? "center" : "flex-start",
          }}
        >
          <Typography className={classes.trendingTitle} variant="h5">
            Trending People
          </Typography>
        </Box>
        <div
          style={{ width: "100%", display: "flex" }}
          className={classes.trendingPeopleContainer}
        >
          {trendingPeople.map((person) => (
            <div
              style={{ marginLeft: "10px", marginRight: "10px" }}
              key={person.id}
            >
              <Paper className={classes.actorContainer} elevation={1}>
                <Link
                  to={`/person/${person.id}/`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    height: "112px",
                  }}
                >
                  <img
                    alt={person.name}
                    style={{
                      width: "88px",
                      borderRadius: "7px 0px 0px 7px",
                    }}
                    src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                  />{" "}
                </Link>{" "}
                <div style={{ marginLeft: "10px" }}>
                  <Link
                    to={`/person/${person.id}/`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography
                      variant="h6"
                      className="hoverLink"
                      style={{ fontWeight: 600, marginTop: "6px" }}
                    >
                      {person.name}
                    </Typography>{" "}
                  </Link>{" "}
                  {mobile || (
                    <Box>
                      <Typography
                        variant="caption"
                        style={{ fontWeight: "700" }}
                      >
                        Known For
                      </Typography>
                      {person.known_for.map((movie) => (
                        <div key={movie.id}>
                          <Link
                            props={movie.id}
                            to={`/details/${movie.media_type}/${movie.id}/`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography variant="body2" className="hoverLink">
                              {movie.title}
                            </Typography>
                          </Link>
                        </div>
                      ))}
                    </Box>
                  )}
                </div>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default TrendingPerson;
