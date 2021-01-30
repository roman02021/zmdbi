import React, { useState } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenuMovies, setShowSubMenuMovies] = useState(false);
  const [showSubMenuTv, setShowSubMenuTv] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
      <div style={{ display: "none" }} className="hamburgerMenu">
        <Button
          variant="text"
          disableRipple
          className="hamburgerMenu"
          style={{
            display: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <CloseIcon></CloseIcon> : <MenuIcon></MenuIcon>}
        </Button>

        <div className={showMenu ? "sideMenuOn" : "sideMenuOff"}>
          <div className="subMenuContainerPhone">
            <Button
              disableRipple
              variant="text"
              onClick={() => setShowSubMenuMovies(!showSubMenuMovies)}
            >
              <Typography variant="h6" style={{ color: "white" }}>
                Movies
              </Typography>
            </Button>
            <Box
              className={showSubMenuMovies ? "subMenuOn" : "subMenuOff"}
              component="div"
            >
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuMovies(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "popularity.desc",
                    mediaType: false,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Popular
                </Typography>
              </Link>

              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuMovies(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "vote_average.desc",
                    mediaType: false,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Top Rated
                </Typography>
              </Link>
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuMovies(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "release_date.desc",
                    mediaType: false,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  New
                </Typography>
              </Link>
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuMovies(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "vote_count.desc",
                    mediaType: false,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Discover
                </Typography>
              </Link>
            </Box>
          </div>
          <div className="subMenuContainerPhone">
            <Button
              disableRipple
              variant="text"
              onClick={() => setShowSubMenuTv(!showSubMenuTv)}
            >
              <Typography variant="h6" style={{ color: "white" }}>
                TV Shows
              </Typography>
            </Button>
            <Box
              className={showSubMenuTv ? "subMenuOn" : "subMenuOff"}
              component="div"
            >
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuTv(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "popularity.desc",
                    mediaType: true,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Popular
                </Typography>
              </Link>

              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuTv(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "vote_average.desc",
                    mediaType: true,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Top Rated
                </Typography>
              </Link>
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuTv(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "release_date.desc",
                    mediaType: true,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  New
                </Typography>
              </Link>
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuTv(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "vote_count.desc",
                    mediaType: true,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Discover
                </Typography>
              </Link>
            </Box>
          </div>
          {/* <div className="subMenuContainerPhone">
            <Button
              disableRipple
              variant="text"
              onClick={() => setShowSubMenuPeople(!showSubMenuPeople)}
            >
              <Typography variant="h6" style={{ color: "white" }}>
                People
              </Typography>
            </Button>
            <Box
              className={showSubMenuPeople ? "subMenuOn" : "subMenuOff"}
              component="div"
            >
              <Link
                onClick={() => {
                  setShowMenu(false);
                  setShowSubMenuPeople(false);
                }}
                to={{
                  pathname: "/discover",
                  state: {
                    sortOption: "popularity.desc",
                    mediaType: true,
                  },
                }}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Typography className="subMenuItemPhone" variant="body2">
                  Popular
                </Typography>
              </Link>
            </Box>
          </div> */}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default HamburgerMenu;
