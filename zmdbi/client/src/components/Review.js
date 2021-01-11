import React from "react";
import { Typography } from "@material-ui/core";
const Review = ({ reviews }) => {
  return (
    <div>
      <Typography variant="h5">Author: {reviews.author}</Typography>
      <Typography>Created at: {reviews.created_at.slice(0, 10)}</Typography>
      <Typography>Review: {reviews.content}</Typography>
    </div>
  );
};
export default Review;
