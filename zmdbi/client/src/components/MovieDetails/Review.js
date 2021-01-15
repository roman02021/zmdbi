import React, { useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  readBtn: {
    border: "none",
    backgroundColor: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Review = ({ reviews }) => {
  const [clamped, setClamped] = useState(true);
  console.log(reviews);
  const classes = useStyles();
  return (
    <Paper
      style={{
        display: "flex",
        marginTop: "35px",
        marginLeft: "10px",
        overflow: "hidden",

        margin: "20px auto 0 auto",
      }}
    >
      <div>
        <img
          style={{
            borderRadius: "50%",
            margin: "10px 15px 0 10px",
            width: "60px",
          }}
          src={`https://secure.gravatar.com/avatar/${reviews.author_details.avatar_path}`}
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">{reviews.author}</Typography>
          {reviews.author_details.rating && (
            <Typography> {reviews.author_details.rating}</Typography>
          )}
        </div>
        <Typography variant="subtitle2">
          Created at: {reviews.created_at.slice(0, 10)}
        </Typography>
        {clamped ? (
          <Typography variant="body2">
            {reviews.content.slice(0, 400)}...
            <button
              onClick={() => setClamped(false)}
              className={classes.readBtn}
            >
              Read More
            </button>
          </Typography>
        ) : (
          <Typography variant="body2">
            {reviews.content}
            <button
              onClick={() => setClamped(true)}
              className={classes.readBtn}
            >
              Read Less
            </button>
          </Typography>
        )}
      </div>
    </Paper>
  );
};
export default Review;
