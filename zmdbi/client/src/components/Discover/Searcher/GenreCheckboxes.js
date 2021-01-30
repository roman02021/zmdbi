import React, { useEffect } from "react";
import { FormControlLabel, FormGroup, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  margin: {
    margin: 0,
  },
});

const GenreCheckboxes = ({ setGenres, genres, movieOrTv }) => {
  const genreCheckboxHandle = (e) => {
    if (e.target.checked) {
      console.log(genres + "," + e.target.value);
      setGenres(genres + "," + e.target.value);
      console.log(genres);
    } else {
      console.log("HEHEEH", genres);
      setGenres(genres.replace("," + e.target.value, ""));
    }
  };
  const classes = useStyles();
  console.log(Array.from(document.getElementsByClassName("checkbox"))[0]);
  console.log("MEDIA TYPE", movieOrTv);
  return (
    <div>
      {movieOrTv ? (
        <FormGroup aria-label="position" row>
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10762"
            control={<Checkbox color="primary" className="checkbox" />}
            label="Kids"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="16"
            control={<Checkbox color="primary" />}
            label="Animation"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10759"
            control={<Checkbox color="primary" />}
            label="Action & Adventure"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10768"
            control={<Checkbox color="primary" />}
            label="War & Politics"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10767"
            control={<Checkbox color="primary" />}
            label="Talk"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="99"
            control={<Checkbox color="primary" />}
            label="Documentary"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="80"
            control={<Checkbox color="primary" />}
            label="Crime"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10763"
            control={<Checkbox color="primary" />}
            label="News"
            labelPlacement="start"
          />

          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="35"
            control={<Checkbox color="primary" />}
            label="Comedy"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="18"
            control={<Checkbox color="primary" />}
            label="Drama"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10765"
            control={<Checkbox color="primary" />}
            label="Sci-Fi & Fantasy"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="9648"
            control={<Checkbox color="primary" />}
            label="Mystery"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10766"
            control={<Checkbox color="primary" />}
            label="Soap"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="53"
            control={<Checkbox color="primary" />}
            label="Thriller"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="37"
            control={<Checkbox color="primary" />}
            label="Western"
            labelPlacement="start"
          />
        </FormGroup>
      ) : (
        <FormGroup aria-label="position" row>
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="27"
            control={<Checkbox color="primary" />}
            label="Horror"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="12"
            control={<Checkbox color="primary" />}
            label="Adventure"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="28"
            control={<Checkbox color="primary" />}
            label="Action"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="878"
            control={<Checkbox color="primary" />}
            label="Sci-fi"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="99"
            control={<Checkbox color="primary" />}
            label="Documentary"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="80"
            control={<Checkbox color="primary" />}
            label="Crime"
            labelPlacement="start"
          />

          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="16"
            control={<Checkbox color="primary" />}
            label="Animation"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="35"
            control={<Checkbox color="primary" />}
            label="Comedy"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="18"
            control={<Checkbox color="primary" />}
            label="Drama"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="14"
            control={<Checkbox color="primary" />}
            label="Fantasy"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="9648"
            control={<Checkbox color="primary" />}
            label="Mystery"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="10749"
            control={<Checkbox color="primary" />}
            label="Romance"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="53"
            control={<Checkbox color="primary" />}
            label="Thriller"
            labelPlacement="start"
          />
          <FormControlLabel
            onChange={(e) => genreCheckboxHandle(e)}
            className={classes.margin}
            value="37"
            control={<Checkbox color="primary" />}
            label="Western"
            labelPlacement="start"
          />
        </FormGroup>
      )}
    </div>
  );
};
export default GenreCheckboxes;
