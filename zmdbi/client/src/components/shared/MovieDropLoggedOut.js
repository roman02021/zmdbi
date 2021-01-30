import React from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles({
  action: {
    "&:hover": {
      backgroundColor: "#CCCCCC",
    },
  },
  margin: {
    marginLeft: "8px",
  },
});

const MovieDropLoggedOut = () => {
  const classes = useStyles();
  const login = async () => {
    const token = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/authentication"
    );

    window.location = `https://www.themoviedb.org/authenticate/${token.data}?redirect_to=https://nameless-shore-33653.herokuapp.com/LogginApproved`;
  };
  const signUp = () => {
    window.open("https://www.themoviedb.org/signup");
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: "33px",
        left: "40px",
        width: "200px",
        zIndex: "10",
        borderRadius: "5px",
        boxShadow: "1px 1px 5px gray",
      }}
    >
      <Typography variant="body2" className={classes.margin}>
        Want to rate or add this item to a watchlist?
      </Typography>
      <Box className={classes.action}>
        <Button onClick={() => login()}>Login</Button>
      </Box>
      <Typography variant="body2" className={classes.margin}>
        Not a member ?
      </Typography>
      <Box className={classes.action}>
        <Button onClick={() => signUp()}>Sign up</Button>
      </Box>
    </div>
  );
};

export default MovieDropLoggedOut;
