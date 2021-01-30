import React, { useState, useEffect } from "react";
import { Typography, Button, Paper, useMediaQuery } from "@material-ui/core";

import "./style.scss";

const SearchResultsSide = ({
  totalResultsTv,
  totalResultsMovies,
  totalResultsPeople,
  setResultsType,
  setCurrentPage,
}) => {
  console.log(totalResultsPeople);
  const [categories, setCategories] = useState([]);
  console.log("hhe", totalResultsPeople);

  const isSmall = useMediaQuery("(max-width: 100px)");

  useEffect(() => {
    console.log(categories);
    console.log(totalResultsPeople);
    setCategories(
      [
        {
          category: "Movies",
          totalResults: totalResultsMovies,
        },
        {
          category: "TV",
          totalResults: totalResultsTv,
        },
        {
          category: "People",
          totalResults: totalResultsPeople,
        },
      ].sort((a, b) => (a.totalResults < b.totalResults ? 1 : -1)),
      () => {
        setResultsType(categories[0].category);
      }
    );
  }, [totalResultsTv, totalResultsMovies, totalResultsPeople]);

  console.log("CATE", isSmall);
  return (
    <div className="yes">
      <Paper style={{ width: "250px" }} className="searchCategoriesContainer">
        <Typography
          variant="h6"
          style={{
            padding: "10px",
            backgroundColor: "#01B4E4",
            color: "white",
            borderRadius: "5px 5px 0 0",
          }}
        >
          Search Categories
        </Typography>
        {categories.map((category) => (
          <div
            className="hoverStyle"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 10px 5px 10px",
            }}
          >
            <Button
              variant="text"
              onClick={() => {
                setCurrentPage(1);
                setResultsType(category.category);
              }}
            >
              {category.category}
            </Button>
            <Typography
              className="results"
              style={{ padding: "0 13px 0 13px", borderRadius: "15px" }}
            >
              {category.totalResults}
            </Typography>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default SearchResultsSide;
