import React, { useState } from "react";
import { Typography, Paper } from "@material-ui/core";
const Review = ({ reviews }) => {
  const [clamped, setClamped] = useState(true);

  return (
    <Paper
      style={{
        margin: "35px",

        overflow: "hidden",
      }}
    >
      <Typography variant="h5">Author: {reviews.author}</Typography>
      <Typography>Created at: {reviews.created_at.slice(0, 10)}</Typography>
      {clamped ? (
        <Typography>
          {reviews.content.slice(0, 400)}...
          <button onClick={() => setClamped(false)}>Read More</button>
        </Typography>
      ) : (
        <Typography>
          {reviews.content}
          <button onClick={() => setClamped(true)}>Read Less</button>
        </Typography>
      )}
    </Paper>
  );
};
export default Review;
