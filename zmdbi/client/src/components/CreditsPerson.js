import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
export const CreditPerson = ({ credits }) => {
  console.log(credits);
  return (
    <Paper style={{ margin: "15px" }}>
      <div style={{ display: "flex" }}>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
          }}
          to={{
            pathname: `/actor/${credits.id}`,
          }}
        >
          {credits.profile_path ? (
            <img
              src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${credits.profile_path}`}
            ></img>
          ) : (
            <img
              style={{ width: "66px", height: "66px" }}
              src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
            ></img>
          )}

          <Typography>{credits.name}</Typography>
        </Link>
      </div>
    </Paper>
  );
};
