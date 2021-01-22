import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper } from "@material-ui/core";

const ActorCreditCategory = ({ credits }) => {
  const [year, setYear] = useState(0);

  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "10px" }}>
        {credits[0].department || <div>Acting</div>}
      </Typography>
      <Paper>
        {credits &&
          credits.map((credit, i, array) => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "5px",
                margin: "10px",
              }}
            >
              {console.log(credit)}
              <Typography
                variant="subtitle1"
                color="primary"
                style={{ textAlign: "center", width: "50px" }}
              >
                {credit.release_date !== "3000"
                  ? credit.release_date.slice(0, 4)
                  : "-"}
                &nbsp;
              </Typography>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                }}
                to={{
                  pathname: `/details/${credit.media_type}/${credit.id}`,
                }}
              >
                <Typography
                  className="hoverLink"
                  style={{ fontWeight: "600", alignSelf: "center" }}
                >
                  {credit.title}
                </Typography>
              </Link>
              &nbsp;
              <Typography style={{ alignSelf: "center" }}>
                {credit.character && "  as " + credit.character}
                {credit.episode_count === 1 &&
                  ` (in ${credit.episode_count} episode)`}
                {credit.episode_count > 1 &&
                  ` (in ${credit.episode_count} episodes)`}
              </Typography>
              {i !== array.length - 1 &&
                credit.release_date.slice(0, 4) !==
                  array[i + 1].release_date.slice(0, 4) && (
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "solid #DEDEDE 1px",
                      margin: 0,
                      padding: 0,
                    }}
                  ></div>
                )}
              {/* { <p>{credit.media_type === "tv" ? "tv" : "movie"}</p> */}
            </div>
          ))}
      </Paper>
    </div>
  );
};
export default ActorCreditCategory;
