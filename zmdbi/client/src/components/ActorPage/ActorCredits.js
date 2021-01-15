import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper } from "@material-ui/core";
import "../../linkStyle.scss";
const ActorCredits = ({ changedCredits }) => {
  const [filter, setFilter] = useState("");

  return (
    <div>
      <div>
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Acting
        </Typography>
      </div>
      <Paper>
        {changedCredits &&
          changedCredits.map((credit) => (
            <div
              style={{
                display: "flex",

                borderRadius: "5px",
                margin: "10px",
                width: "70%",
              }}
            >
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
                  pathname: `/details/${credit.id}`,
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
              {/* <p>{credit.media_type === "tv" ? "tv" : "movie"}</p> */}
            </div>
          ))}
      </Paper>
    </div>
  );
};

export default ActorCredits;
