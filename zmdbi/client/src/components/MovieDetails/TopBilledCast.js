import React from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NoProfilePic from "../../images/profile_pic_holder_smaller.png";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actorImage: {
    width: "138px",
    height: "175px",
    borderRadius: "5px 5px 0 0",
    [theme.breakpoints.down("600")]: {
      width: "92px",
      height: "138px",
    },
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
    width: "137px",
    [theme.breakpoints.down("600")]: {
      width: "92px",
    },
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
}));

const TopBilledCast = ({ topBilledCast, movieDetails, credits }) => {
  const classes = useStyles();

  const isMobile = useMediaQuery("(max-width:600px)");

  return topBilledCast.length > 0 ? (
    <div
      style={{
        display: "flex",

        overflowX: "scroll",
        textAlign: "center",
      }}
    >
      {topBilledCast.map((actor) => (
        <Paper className={classes.actorPaper} key={actor.id}>
          {actor.profile_path ? (
            <Link
              to={{
                pathname: `/person/${actor.id}`,
              }}
            >
              <img
                alt={actor.name}
                className={classes.actorImage}
                src={
                  isMobile
                    ? `https://www.themoviedb.org/t/p/w92/${actor.profile_path}`
                    : `https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`
                }
              ></img>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/person/${actor.id}`,
              }}
            >
              <img
                alt={actor.name}
                className={classes.actorImage}
                src={NoProfilePic}
              ></img>
            </Link>
          )}

          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to={{
              pathname: `/person/${actor.id}`,
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
      {topBilledCast.length > 3 && (
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
            <Button
              style={{ width: "120px", display: "flex", alignItems: "center" }}
            >
              <NavigateNextIcon />
              <Typography style={{ fontWeight: 500 }}>Show Cast</Typography>
            </Button>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <Typography>No Cast</Typography>
  );
};

export default TopBilledCast;
