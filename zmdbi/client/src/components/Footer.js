import React from "react";
import footerLogo from "../images/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg";
import { Container } from "@material-ui/core";
const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#032038",
        height: "300px",
        marginTop: "100px",
        justifyContent: "center",
      }}
    >
      <img src={footerLogo} style={{ width: "50%" }}></img>
    </div>
  );
};

export default Footer;
