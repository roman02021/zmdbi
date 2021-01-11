import React, { useState } from "react";
import MovieCard from "./MovieCard";
import {
  Container,
  Card,
  Typography,
  CardMedia,
  CardContent,
  Box,
} from "@material-ui/core";

import { Link } from "react-router-dom";
const MovieSlider = ({ props }) => {
  const [isRendered, setIsRendered] = useState(props);

  return (
    <Box
      component="div"
      m={5}
      bgcolor="background.paper"
      height="370px"
      style={{
        margin: "0",
        marginTop: "15px",
        display: "flex",
        width: "100%",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
    >
      {props.map((movie) => (
        <MovieCard movie={movie} imgHeight="231" imgWidth="154" />
      ))}
    </Box>
  );
};

export default MovieSlider;
