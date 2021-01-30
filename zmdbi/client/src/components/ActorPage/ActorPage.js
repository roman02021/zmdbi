import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import { Container, Typography, Grid, Box } from "@material-ui/core";
import ActorCredits from "./ActorCredits";

import "../../linkStyle.scss";
import ProfilePicHolder from "../../images/profile_pic_holder_long.png";
import NoImageHolderSmall from "../../images/no_image_holder_small.png";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  topInfo: {
    display: "flex",
  },
  actorInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "15px",
    },
  },
  biography: {
    paddingLeft: "10px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0px",
    },
  },
}));

const ActorPage = () => {
  let { personId } = useParams();
  const classes = useStyles();
  const [actorDetails, setActorDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCredits, setAllCredits] = useState(null);
  const [changedCredits, setChangedCredts] = useState(null);
  const [creditsSortedByPopularity, setCreditsSortedByPopularity] = useState(
    null
  );

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isAlmostMobile = useMediaQuery("(max-width: 935px)");
  const [crewCredits, setCrewCredits] = useState(null);

  const currentYear = new Date().getFullYear();

  const fetchActorDetails = async () => {
    const actorDetails = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/details/actor",
      {
        params: { actorId: personId },
      }
    );

    setActorDetails(actorDetails.data);
  };

  const fetchAllCredits = async () => {
    const actorCredits = await axios.get(
      "https://arcane-reef-43492.herokuapp.com/details/actor/credits/all",
      {
        params: { actorId: personId },
      }
    );
    setAllCredits(actorCredits.data);
  };

  const sortByPopularity = () => {
    const sortedCredits = allCredits.cast.sort((credit1, credit2) =>
      credit1.popularity > credit2.popularity ? -1 : 1
    );

    setCreditsSortedByPopularity(sortedCredits.slice(0, 8));
  };

  const renameAndSortByReleaseDate = () => {
    let changedCredits = allCredits.cast.map((credit) => {
      if (credit.hasOwnProperty("first_air_date")) {
        credit.release_date = credit.first_air_date;
        if (credit.hasOwnProperty("name")) {
          credit.title = credit.name;
          delete credit.name;
        }
        delete credit.first_air_date;
        return credit;
      } else {
        if (credit.release_date === undefined || credit.release_date === "") {
          credit.release_date = "3000";
        }
        return credit;
      }
    });
    changedCredits = changedCredits.sort((credit1, credit2) =>
      Number(credit1.release_date.slice(0, 4)) >
      Number(credit2.release_date.slice(0, 4))
        ? -1
        : 1
    );

    let changedCrewCredits = allCredits.crew.map((credit) => {
      if (credit.hasOwnProperty("first_air_date")) {
        credit.release_date = credit.first_air_date;
        if (credit.hasOwnProperty("name")) {
          credit.title = credit.name;
          delete credit.name;
        }
        delete credit.first_air_date;
        return credit;
      } else {
        if (credit.release_date === undefined || credit.release_date === "") {
          credit.release_date = "3000";
        }
        return credit;
      }
    });
    changedCrewCredits = changedCrewCredits.sort((credit1, credit2) =>
      Number(credit1.release_date.slice(0, 4)) >
      Number(credit2.release_date.slice(0, 4))
        ? -1
        : 1
    );
    setCrewCredits(changedCrewCredits);
    setChangedCredts(changedCredits);
    setAllCredits(null);
  };

  if (allCredits) {
    renameAndSortByReleaseDate();
    sortByPopularity();

    setIsLoaded(true);
  }

  useEffect(() => {
    fetchActorDetails();
    fetchAllCredits();
  }, []);

  return isLoaded ? (
    <Container>
      {actorDetails && (
        <Grid
          spacing={1}
          container
          style={{ display: "flex", marginTop: "20px" }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={3}
            className={isMobile && classes.topInfo}
          >
            {actorDetails.profile_path ? (
              <div>
                <img
                  alt={actorDetails.name}
                  style={{ borderRadius: "5px" }}
                  src={
                    isAlmostMobile
                      ? `https://www.themoviedb.org/t/p/w185/${actorDetails.profile_path}`
                      : `https://www.themoviedb.org/t/p/w300/${actorDetails.profile_path}`
                  }
                ></img>
              </div>
            ) : (
              <img
                alt={actorDetails.name}
                style={{
                  borderRadius: "5px",
                  width: isAlmostMobile ? "185px" : "300px",
                  height: isAlmostMobile ? "278px" : "450px",
                }}
                src={ProfilePicHolder}
              ></img>
            )}
            <div className={classes.actorInfo}>
              {isMobile && (
                <Typography
                  variant="h5"
                  className="actorName"
                  style={{ fontWeight: 600 }}
                  gutterBottom
                >
                  {actorDetails.name}
                </Typography>
              )}

              <Box>
                <Typography color="primary" variant="subtitle1">
                  Known For{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {actorDetails.known_for_department
                    ? actorDetails.known_for_department
                    : "-"}
                </Typography>
              </Box>
              <Box>
                <Typography color="primary" variant="subtitle1">
                  Gender{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {actorDetails.gender === 1 ? "Female" : "Male"}
                </Typography>
              </Box>
              {actorDetails.deathday ? (
                <Box>
                  <Typography color="primary" variant="subtitle1">
                    Birthday
                  </Typography>
                  <Typography variant="subtitle2">
                    {actorDetails.birthday ? (
                      <div>
                        {actorDetails.birthday} (died at{" "}
                        {Number(
                          actorDetails.deathday.slice(0, 4) -
                            actorDetails.birthday.slice(0, 4)
                        )}{" "}
                        years old)
                      </div>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography color="primary" variant="subtitle1">
                    Birthday
                  </Typography>
                  <Typography variant="subtitle2">
                    {actorDetails.birthday ? (
                      <div>
                        {actorDetails.birthday} (
                        {Number(
                          currentYear - actorDetails.birthday.slice(0, 4)
                        )}{" "}
                        years old)
                      </div>
                    ) : (
                      "-"
                    )}
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography color="primary" variant="subtitle1">
                  Place of Birth{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {actorDetails.place_of_birth
                    ? actorDetails.place_of_birth
                    : "-"}
                </Typography>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <div className={classes.biography}>
              {!isMobile && (
                <Typography
                  variant="h4"
                  style={{ fontWeight: 600 }}
                  gutterBottom
                >
                  {actorDetails.name}
                </Typography>
              )}
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: 600 }}
                >
                  Biography{" "}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {actorDetails.biography
                    ? actorDetails.biography
                    : "No biography"}
                </Typography>
              </div>
            </div>
            {creditsSortedByPopularity.length > 0 && (
              <div>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "15px", marginLeft: "10px" }}
                >
                  Known For
                </Typography>
                <div
                  style={{
                    display: "flex",
                    overflowX: "scroll",
                    width: "auto",
                  }}
                >
                  {creditsSortedByPopularity.map((credit) => (
                    <div
                      style={{ margin: "10px", width: "150px" }}
                      key={credit.credit_id}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={{
                          pathname: `/details/${credit.media_type}/${credit.id}`,
                        }}
                      >
                        {credit.poster_path ? (
                          <img
                            alt={credit.title}
                            style={{ borderRadius: "5px" }}
                            src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${credit.poster_path}`}
                          />
                        ) : (
                          <img
                            alt={credit.title}
                            style={{ borderRadius: "5px" }}
                            src={NoImageHolderSmall}
                          />
                        )}

                        <Typography className="hoverLink">
                          {credit.title}
                        </Typography>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ActorCredits
              changedCredits={changedCredits}
              crewCredits={crewCredits}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  ) : (
    <div className="spinner"></div>
  );
};

export default ActorPage;
