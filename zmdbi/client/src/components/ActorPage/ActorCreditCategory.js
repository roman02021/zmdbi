import React from "react";
import { Link } from "react-router-dom";
import { Typography, Paper } from "@material-ui/core";

const ActorCreditCategory = ({ credits }) => {
  return (
    <div>
      <div>
        {credits.length > 0 && (
          <Typography style={{ marginTop: "10px" }}>
            {credits[0].department || (
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                Acting
              </Typography>
            )}
          </Typography>
        )}

        <Paper>
          {credits &&
            credits.map((credit, i, array) => (
              <div
                key={credit.id}
                style={{
                  display: "flex",

                  flexWrap: "nowrap",
                  borderRadius: "5px",
                  margin: "10px",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    style={{
                      textAlign: "center",
                      width: "50px",
                    }}
                  >
                    {credit.release_date !== "3000"
                      ? credit.release_date.slice(0, 4)
                      : "-"}
                    &nbsp;
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ fontWeight: "600" }} variant="body2">
                    <Link
                      className="hoverLink"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      to={{
                        pathname: `/details/${credit.media_type}/${credit.id}`,
                      }}
                    >
                      {credit.title}{" "}
                    </Link>
                    <Typography variant="subtitle2">
                      {credit.character && "  as " + credit.character}
                      {credit.episode_count === 1 &&
                        ` (in ${credit.episode_count} episode)`}
                      {credit.episode_count > 1 &&
                        ` (in ${credit.episode_count} episodes)`}
                    </Typography>
                  </Typography>
                  &nbsp;
                  {i !== array.length - 1 &&
                    credit.release_date.slice(0, 4) !==
                      array[i + 1].release_date.slice(0, 4) && (
                      <div
                        style={{
                          borderBottom: "solid #DEDEDE 10px",
                          margin: 0,
                        }}
                      ></div>
                    )}
                </div>
              </div>
            ))}
        </Paper>
      </div>
    </div>
  );
};
export default ActorCreditCategory;
