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
  console.log("is rendered", isRendered);
  console.log("hmmmm", props);
  return (
    <Box
      component="div"
      my={2}
      overflow="scroll"
      bgcolor="background.paper"
      width="50px"
      style={{ display: "flex", width: "100%", whiteSpace: "nowrap" }}
    >
      {props.map((movie) => (
        <MovieCard movie={movie} imgSize="154" />
      ))}
    </Box>
  );
};

export default MovieSlider;
