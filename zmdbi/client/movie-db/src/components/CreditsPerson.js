import React from "react";
import { Link } from "react-router-dom";
export const CreditPerson = ({ credits }) => {
  console.log(credits);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
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

          <h1>{credits.name}</h1>
        </Link>
      </div>
    </div>
  );
};
