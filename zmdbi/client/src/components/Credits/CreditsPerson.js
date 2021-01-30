import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "../../linkStyle.scss";
import profilePicHolder from "../../images/profile_pic_holder2.png";
const CreditPerson = ({ credits }) => {
  return (
    <div style={{ display: "flex", margin: "20px 20px 20px 0" }}>
      <Link
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
        }}
        to={{
          pathname: `/person/${credits.id}`,
        }}
      >
        {credits.profile_path ? (
          <img
            alt={credits.name}
            style={{ borderRadius: "5px" }}
            src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${credits.profile_path}`}
          ></img>
        ) : (
          <img
            alt={credits.name}
            style={{ width: "66px", height: "66px", borderRadius: "5px" }}
            src={profilePicHolder}
          ></img>
        )}
      </Link>
      <Typography style={{ alignSelf: "center", marginLeft: "15px" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/person/${credits.id}`,
          }}
        >
          <Typography className="hoverLink" variant="subtitle2">
            {" "}
            {credits.name}
          </Typography>
        </Link>
        {credits.character ? (
          <Typography variant="caption">
            {credits.character ? credits.character : credits.job}
          </Typography>
        ) : (
          <Typography variant="caption">
            {credits.known_for_department}
          </Typography>
        )}
      </Typography>
    </div>
  );
};

export default CreditPerson;
