import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button } from "@material-ui/core";
import {
  Context,
  useSearchRedirectUpdate,
  useSearchRedirect,
} from "../../contexts/SearchContext";
import SearchContext from "../../contexts/SearchContext";
import { Redirect } from "react-router-dom";
const SideInfo = ({ movieId, movieDetails }) => {
  const redirectToDiscover = useSearchRedirect();
  const redirectToDiscoverUpdate = useSearchRedirectUpdate();
  const [keywords, setKeywords] = useState(null);
  const [recommedations, setRecommendations] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    const keywords = await axios.get(
      "http://localhost:5000/details/movie/keywords",
      {
        params: { id: movieId },
      }
    );

    setKeywords(keywords.data);
    setLoaded(true);
  };

  console.log("KEYWORDS", keywords);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    loaded && (
      <div style={{ marginLeft: "30px" }}>
        {redirectToDiscover && (
          <Redirect
            to={{
              pathname: `/discover/${keyword}`,
              searchString: keyword,
              state: { hello: "hello" },
            }}
          ></Redirect>
        )}
        <Typography variant="h6">Status</Typography>
        {movieDetails.status != "" ? (
          <Typography>{movieDetails.status}</Typography>
        ) : (
          "-"
        )}
        <Typography variant="h6">Original Language</Typography>
        {movieDetails.original_language != "" ? (
          <Typography>{movieDetails.original_language}</Typography>
        ) : (
          "-"
        )}
        <Typography variant="h6">Budget</Typography>
        {movieDetails.budget ? (
          movieDetails.budget > 1000 ? (
            movieDetails.budget > 1000000 ? (
              <Typography>{movieDetails.budget / 1000000} million</Typography>
            ) : (
              <Typography>{movieDetails.budget / 1000} thousand</Typography>
            )
          ) : (
            <Typography>{movieDetails.budget}</Typography>
          )
        ) : (
          "-"
        )}
        <Typography variant="h6">Revenue</Typography>
        {movieDetails.revenue ? (
          movieDetails.revenue > 1000 ? (
            movieDetails.revenue > 1000000 ? (
              <Typography>{movieDetails.revenue / 1000000} million</Typography>
            ) : (
              <Typography>{movieDetails.revenue / 1000} thousand</Typography>
            )
          ) : (
            <Typography>{movieDetails.revenue}</Typography>
          )
        ) : (
          "-"
        )}
        <Typography variant="h6" style={{ margin: "10px 0 10px 0" }}>
          Keywords
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {console.log(keywords)}
          {keywords &&
            keywords.map((keyword) => (
              <Button
                onClick={(e) => {
                  redirectToDiscoverUpdate(true);
                  setKeyword(keyword.name);
                  localStorage.setItem("searchString", keyword.name);
                }}
                variant="outlined"
                style={{ margin: "5px", padding: "4px" }}
              >
                {keyword.name}
              </Button>
            ))}
        </div>
      </div>
    )
  );
};

export default SideInfo;
