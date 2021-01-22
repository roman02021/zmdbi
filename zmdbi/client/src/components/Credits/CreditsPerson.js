import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
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
          pathname: `/actor/${credits.id}`,
        }}
      >
        {credits.profile_path ? (
          <img
            style={{ borderRadius: "5px" }}
            src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${credits.profile_path}`}
          ></img>
        ) : (
          <img
            style={{ width: "66px", height: "66px", borderRadius: "5px" }}
            src={profilePicHolder}
          ></img>
        )}
      </Link>
      <Typography style={{ alignSelf: "center", marginLeft: "15px" }}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/actor/${credits.id}`,
          }}
        >
          <Typography className="hoverLink"> {credits.name}</Typography>
        </Link>
        {credits.character ? (
          <Typography variant="subtitle2">
            {credits.character ? credits.character : credits.job}
          </Typography>
        ) : (
          credits.known_for_department
        )}
      </Typography>
    </div>
  );
};

export default CreditPerson;
