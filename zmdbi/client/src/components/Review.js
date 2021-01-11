import React from "react";

const Review = ({ reviews }) => {
  return (
    <div>
      <h2>Author: {reviews.author}</h2>
      <h3>Created at: {reviews.created_at.slice(0, 10)}</h3>
      <p>Review: {reviews.content}</p>
    </div>
  );
};
export default Review;
