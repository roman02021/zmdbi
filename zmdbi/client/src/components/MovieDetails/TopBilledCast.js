import React from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const useStyles = makeStyles({
  actorImage: {
    borderRadius: "5px 5px 0 0",
  },
  backrop: {
    zIndex: 0,
    position: "absolute",
    height: "632px",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    filter: "brightness(30%)",

    width: "100%",
  },
  actorPaper: {
    margin: "10px",
  },
  acotrSubtitle: {
    fontSize: "12px",

    fontWeight: "bold",
    color: "#757575",
  },
  textStyle: {
    margin: "5px",
    marginLeft: "15px",
  },
});

const TopBilledCast = ({ topBilledCast, movieDetails, credits }) => {
  const classes = useStyles();

  return topBilledCast.length > 0 ? (
    <div
      style={{
        display: "flex",

        overflowX: "scroll",
        textAlign: "center",
      }}
    >
      {topBilledCast.map((actor) => (
        <Paper className={classes.actorPaper}>
          {actor.profile_path ? (
            <Link
              to={{
                pathname: `/actor/${actor.id}`,
              }}
            >
              <img
                className={classes.actorImage}
                src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`}
              ></img>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/actor/${actor.id}`,
              }}
            >
              <img
                style={{ width: "138px", height: "175px" }}
                className={classes.actorImage}
                src={`https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png`}
              ></img>
            </Link>
          )}

          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={{
              pathname: `/actor/${actor.id}`,
            }}
          >
            <Typography
              style={{ margin: "0 6px 0 6px" }}
              variant="body2"
              className="hoverLink"
            >
              {actor.original_name}
            </Typography>
          </Link>
          <Typography
            style={{ margin: "0 6px 0 6px" }}
            variant="caption"
            classes={{
              caption: classes.acotrSubtitle,
            }}
          >
            {actor.character}
          </Typography>
        </Paper>
      ))}
      <div style={{ display: "flex", alignSelf: "center" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/credits/${movieDetails.id}`,
            state: {
              credits: credits,
            },
          }}
        >
          <Button style={{ width: "150px" }}>
            <NavigateNextIcon />
            Show Cast
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <Typography>No Cast</Typography>
  );
};

export default TopBilledCast;
