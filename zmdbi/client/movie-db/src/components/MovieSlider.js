import React from "react";
import MovieCard from "./MovieCard";
import {
  Container,
  Card,
  Typography,
  CardMedia,
  CardContent,
} from "@material-ui/core";

import { Link } from "react-router-dom";
const MovieSlider = ({ props }) => {
  return (
    <div style={{ display: "flex", overflowX: "scroll" }}>
      {props.map((movie) => (
        <div style={{ marginRight: 30 }}>
          <Link
            props={movie.id}
            to={`/details/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            ></img>
          </Link>
          <Link
            props={movie.id}
            to={`/details/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="subtitle2">{movie.original_title}</Typography>
          </Link>

          <Typography variant="caption">
            {movie.release_date.slice(0, 4)}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default MovieSlider;
