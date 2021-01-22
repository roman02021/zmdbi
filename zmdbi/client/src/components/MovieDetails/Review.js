import React, { useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import GradeIcon from "@material-ui/icons/Grade";
const useStyles = makeStyles({
  readBtn: {
    border: "none",
    padding: "0px",
    paddingLeft: "2px",
    backgroundColor: "transparent",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Review = ({ reviews }) => {
  const [clamped, setClamped] = useState(true);

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
        <Typography variant="h6">{reviews.author}</Typography>
        {reviews.author_details.rating && (
          <div
            style={{
              margin: "7px 0 5px0",
              padding: "2px 0px 0px 0px",
              color: "white",
              backgroundColor: "black",
              width: "60px",
              textAlign: "center",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <GradeIcon
              color="primary"
              style={{ marginLeft: "5px" }}
            ></GradeIcon>
            <Typography
              variant="button"
              style={{ marginRight: "4px", fontWeight: 600, fontSize: 16 }}
            >
              {reviews.author_details.rating}
            </Typography>
          </div>
        )}

        <Typography variant="subtitle2">
          Created at: {reviews.created_at.slice(0, 10)}
        </Typography>
        {reviews.content.length <= 400 && reviews.content}
        {reviews.content.length > 400 &&
          (clamped ? (
            <Typography variant="body2">
              {reviews.content.slice(0, 400)}...
              <button
                onClick={() => setClamped(false)}
                className={classes.readBtn}
              >
                <Typography variant="body2" color="secondary">
                  Read More
                </Typography>
              </button>
            </Typography>
          ) : (
            <Typography variant="body2">
              {reviews.content}
              <button
                onClick={() => setClamped(true)}
                className={classes.readBtn}
              >
                <Typography variant="body2" color="primary">
                  Read Less
                </Typography>
              </button>
            </Typography>
          ))}
      </div>
    </Paper>
  );
};
export default Review;
