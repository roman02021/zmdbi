import React, { useState, useRef, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GenreCheckboxes from "./GenreCheckboxes";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Slider from "@material-ui/core/Slider";
import {
  Button,
  InputBase,
  InputLabel,
  NativeSelect,
  FormLabel,
} from "@material-ui/core";
import "../style.scss";

const CustomInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },

  input: {
    padding: "10px",
    borderRadius: 3,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,

    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderRadius: 3,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.1rem rgba(0,0,0, 0.5)",
    },
    "&:hover": {
      borderRadius: 3,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.1rem rgba(0,0,0, 0.5)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  sortSelect: {},
  searcherContainer: {
    maxWidth: "270px",
    [theme.breakpoints.down("760")]: {
      display: "flex",
      justifyContent: "center",
      maxWidth: "100%",
    },
  },
  filterOptions: {
    color: "black",
    padding: "3px",
    borderRadius: "6px",
    boxShadow: "1px 1px 5px #9fa1a6",
    marginTop: "10px",
  },
  optionsToggle: {
    width: "270px",
    justifyContent: "flex-start",
  },
  margin: {
    marginTop: "10px",
  },

  form: {
    width: "250px",
    [theme.breakpoints.down("760")]: {
      width: "100%",
    },
  },
}));

const Searcher = ({
  setRuntime,
  setScore,
  score,
  setSortOption,
  runtime,
  genres,
  setReleaseDate,
  submitHandle,
  setLanguage,
  mediaType,
  setMediaType,
  sortOption,
  language,
  releaseDate,
  setGenres,
}) => {
  const releaseMarks = [
    {
      value: 1900,
      label: "1900",
    },
    {
      value: 2021,
      label: "2021",
    },
  ];
  const runtimeMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 120,
      label: "120",
    },
    {
      value: 240,
      label: "240",
    },
    {
      value: 360,
      label: "360",
    },
  ];
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "|",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const sortSelect = useRef(null);
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const date = new Date();

  let yearRange = new Array();
  for (
    let i = 0, years = 1870;
    years <= date.toISOString().slice(0, 4);
    i++, years++
  ) {
    yearRange[i] = years;
  }

  const handleRuntime = (e, newValue) => {
    setRuntime(newValue);
  };
  const handleScore = (e, newValue) => {
    setScore(newValue);
  };
  const handleReleaseDate = (e, newValue) => {
    setReleaseDate(newValue);
  };

  const classes = useStyles();
  useEffect(() => {
    setSortOption(sortSelect.current.childNodes[0].value);
  }, []);

  return (
    <div className={classes.searcherContainer}>
      <form
        className={classes.form}
        onSubmit={(e) => {
          submitHandle();
          e.preventDefault();
        }}
      >
        <div className={classes.filterOptions}>
          <Button
            style={{
              width: "100%",
              justifyContent: "space-between",
              color: "black",
              fontWeight: 600,
              fontSize: "18px",
            }}
            onClick={() => setShowSort(!showSort)}
            className={classes.optionsToggle}
            endIcon={showSort ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            Sort
          </Button>
          <div
            style={{
              display: showSort ? "block" : "none",
              padding: "5px 20px 20px 20px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="sortingOptions" disableAnimation="true">
                Sorting Options
              </InputLabel>
              <NativeSelect
                className={classes.sortSelect}
                id="sortingOptions"
                input={<CustomInput />}
                margin="dense"
                onChange={(e) => setSortOption(e.target.value)}
                ref={sortSelect}
                value={sortOption}
              >
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="release_date.desc">
                  Release Date Descending
                </option>
                <option value="release_date.asc">Release Date Ascending</option>
                <option value="revenue.desc">Revenue Descending</option>
                <option value="revenue.asc">Revenue Date Ascending</option>
                <option value="original_title.desc">
                  Original Title Descending
                </option>
                <option value="original_title.asc">
                  Original Title Date Ascending
                </option>

                <option value="vote_count.desc">Vote Count Descending</option>
                <option value="vote_count.asc">Vote Count Ascending</option>
              </NativeSelect>
            </FormControl>
          </div>

          {/* </select> */}
        </div>
        <div className={classes.filterOptions}>
          <Button
            style={{
              width: "100%",
              color: "black",
              fontWeight: 600,
              fontSize: "18px",
              justifyContent: "space-between",
            }}
            endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setShowFilters(!showFilters)}
            className={classes.optionsToggle}
          >
            Filters
          </Button>
          <div
            style={{
              display: showFilters ? "flex" : "none",
              justifyContent: "flex-start",
              flexDirection: "column",
              padding: "20px 30px 20px 20px",
            }}
          >
            <div style={{ display: showFilters ? "block" : "none" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Movies</Typography>

                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      checked={mediaType}
                      onChange={() => {
                        setMediaType(!mediaType);
                        setGenres(" ");
                      }}
                      color="primary"
                    />
                  }
                />
                <Typography>Tv</Typography>
              </div>
              <GenreCheckboxes
                genres={genres}
                setGenres={setGenres}
                movieOrTv={mediaType}
              />
              <FormLabel component="legend">Genres</FormLabel>

              <FormControl fullWidth>
                <InputLabel
                  htmlFor="languageOptions"
                  disableAnimation="true"
                  shrink={false}
                >
                  Language
                </InputLabel>
                <NativeSelect
                  className={classes.sortSelect}
                  id="languageOptions"
                  input={<CustomInput />}
                  onChange={(e) => setLanguage(e.target.value)}
                  name="sort"
                  id="languageOptions"
                  value={language}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="es">Spanish</option>
                  <option value="ja">Japanese</option>
                  <option value="zh">Chinese</option>
                  <option value="hi">Hindi</option>
                  <option value="ar">Arabic</option>
                  <option value="bn">Bengali</option>
                  <option value="pt">Portugese</option>
                  <option value="ru">Russion</option>
                  <option value="sk">Slovak</option>
                </NativeSelect>
              </FormControl>
            </div>
            <Typography className={classes.margin}>
              Release Range (Years)
            </Typography>
            <Slider
              value={releaseDate}
              onChange={handleReleaseDate}
              valueLabelDisplay="auto"
              min={1900}
              max={2021}
              marks={releaseMarks}
              aria-labelledby="range-slider"
            />{" "}
            <Typography className={classes.margin}>
              Runtime (Minutes)
            </Typography>
            <Slider
              value={runtime}
              onChange={handleRuntime}
              valueLabelDisplay="auto"
              min={0}
              max={360}
              marks={runtimeMarks}
              aria-labelledby="range-slider"
            />
            <Typography className={classes.margin}>
              User Rating (0-10)
            </Typography>
            <Slider
              className="slider"
              value={score}
              onChange={handleScore}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              aria-labelledby="range-slider"
              marks={marks}
            />
          </div>
        </div>
        <Button
          className={classes.margin}
          variant="contained"
          type="submit"
          color="primary"
          fullWidth
          style={{
            fontWeight: 600,
            fontSize: "18px",
            display: "block",
            borderRadius: "15px",
            height: "40px",
          }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Searcher;
