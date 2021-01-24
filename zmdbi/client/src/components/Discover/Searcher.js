import React, { useState, useRef, useEffect } from "react";
import { useDiscoverUpdate, useDiscover } from "../../contexts/DiscoverContext";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";

import axios from "axios";
import "../searcher.scss";

const Searcher = ({
  setRuntime,
  setScore,
  score,
  releaseDateMax,
  releaseDateMin,
  setSortOption,
  runtime,
  setReleaseDateMax,
  setReleaseDateMin,
  submitHandle,
  setLanguage,
  mediaType,
  setMediaType,
  defaultSortMode,
}) => {
  const setPosts = useDiscoverUpdate();
  const posts = useDiscover();

  const sortOption = useRef(null);
  console.log("REFAFFFA", sortOption);

  const date = new Date();

  let yearRange = new Array();
  for (
    let i = 0, years = 1870;
    years <= date.toISOString().slice(0, 4);
    i++, years++
  ) {
    yearRange[i] = years;
  }
  console.log("hehe", releaseDateMax);

  const handleRuntime = (e, newValue) => {
    setRuntime(newValue);
    console.log(runtime);
  };
  const handleScore = (e, newValue) => {
    console.log(typeof newValue);
    setScore(newValue);
    console.log(score);
  };
  useEffect(() => {
    console.log(defaultSortMode);
    console.log(sortOption.current);
    Array.from(sortOption.current.childNodes)
      .find((element) => element.value === defaultSortMode)
      .setAttribute("selected", "");
  }, []);

  console.log(releaseDateMin);
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandle();
          e.preventDefault();
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="sortOptions">Sort</label>
          <select
            style={{ padding: "5px" }}
            name="sort"
            id="sortOptions"
            onChange={(e) => setSortOption(e.target.value)}
            ref={sortOption}
          >
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="revenue.desc">Revenue Descending</option>
            <option value="revenue.asc">Revenue Date Ascending</option>
            <option value="original_title.desc">
              Original Title Descending
            </option>
            <option value="original_title.asc">
              Original Title Date Ascending
            </option>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Date Ascending</option>
            <option value="vote_count.desc">Vote Count Descending</option>
            <option value="vote_count.asc">Vote Count Ascending</option>
          </select>
        </div>
        <p>Filters</p>

        <div style={{ display: "flex", flexDirection: "column" }}>
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
                  onChange={() => setMediaType(!mediaType)}
                  color="primary"
                />
              }
            />
            <Typography>Tv</Typography>
          </div>
          <label for="languageOptions">Language</label>
          <select
            name="sort"
            id="languageOptions"
            style={{ padding: "5px" }}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en-US">English</option>
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
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="releaseDateMin">From</label>
          <select
            style={{ padding: "5px" }}
            name="releaseDateMin"
            id="releaseDateMin"
            onChange={(e) =>
              setReleaseDateMin(releaseDateMin.replace(/\d{4}/, e.target.value))
            }
          >
            <option key={0} value="none"></option>
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="releaseDateMax">To</label>
          <select
            style={{ padding: "5px" }}
            name="releaseDateMax"
            id="releaseDateMax"
            onChange={(e) =>
              setReleaseDateMax(releaseDateMax.replace(/\d{4}/, e.target.value))
            }
          >
            {yearRange.reverse().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Typography style={{ marginTop: "15px" }}>Runtime (minutes)</Typography>
        <Slider
          value={runtime}
          onChange={handleRuntime}
          valueLabelDisplay="auto"
          max="360"
          aria-labelledby="range-slider"
        />
        <Typography>User Rating (0-10)</Typography>
        <Slider
          value={score}
          onChange={handleScore}
          valueLabelDisplay="auto"
          max="10"
          aria-labelledby="range-slider"
        />

        <Button variant="contained" type="submit" color="primary">
          Apply
        </Button>
      </form>
    </div>
  );
};

export default Searcher;
