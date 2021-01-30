import React from "react";

import { Container, Typography } from "@material-ui/core";

import logo from "../../images/logo_big.png";
import "./style.scss";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#032038" }}>
      <Container
        style={{
          display: "flex",

          height: "200px",
          marginTop: "100px",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            fontWeight: 600,
          }}
          variant="h6"
        >
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <a href="https://www.themoviedb.org/">
            <img
              alt="TMBDb logo"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              className="footerLogoTmdb"
            ></img>
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={logo} alt="ZMDBi logo" className="footerLogoZmdbi"></img>

            <Typography
              style={{ color: "white", marginTop: "10px" }}
              variant="h6"
            >
              By Roman Zemanik
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
