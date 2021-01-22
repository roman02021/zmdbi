import React, { useState } from "react";
import MovieCard from "../shared/MovieCard";
import { Box } from "@material-ui/core";

const MovieSlider = ({ props, mediaType }) => {
  return (
    <Box
      component="div"
      m={5}
      height="auto"
      style={{
        backgroundColor: "#FAFAFA",
        margin: "0",
        marginTop: "15px",
        display: "flex",
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
        paddingBottom: "none",
      }}
    >
      {props.map((movie) => (
        <MovieCard
          movie={movie}
          imgHeight="231"
          imgWidth="154"
          mediaType={mediaType}
        />
      ))}
    </Box>
  );
};

export default MovieSlider;
