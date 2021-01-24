import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Credits from "../Credits/Credits";
import { Link } from "react-router-dom";
import { Container, Typography, Grid } from "@material-ui/core";
import ActorCredits from "./ActorCredits";
import { kategorieTeilung } from "../shared/kategorieTeilung";
import "../../linkStyle.scss";
import ProfilePicHolder from "../../images/profile_pic_holder_long.png";
import NoImageHolderSmall from "../../images/no_image_holder_small.png";
const ActorPage = () => {
  let { actorId } = useParams();

  const [actorDetails, setActorDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCredits, setAllCredits] = useState(null);
  const [changedCredits, setChangedCredts] = useState(null);
  const [creditsSortedByPopularity, setCreditsSortedByPopularity] = useState(
    null
  );
  const [crewCredits, setCrewCredits] = useState(null);

  const currentYear = new Date().getFullYear();

  const fetchActorDetails = async () => {
    const actorDetails = await axios.get(
      "http://localhost:5000/details/actor",
      {
        params: { actorId: actorId },
      }
    );

    setActorDetails(actorDetails.data);
  };

  const fetchAllCredits = async () => {
    const actorCredits = await axios.get(
      "http://localhost:5000/details/actor/credits/all",
      {
        params: { actorId: actorId },
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
  console.log("ACOTR DETES", actorDetails);
  return isLoaded ? (
    <Container>
      {actorDetails && (
        <Grid container style={{ display: "flex", marginTop: "20px" }}>
          <Grid item sm={3}>
            {actorDetails.profile_path ? (
              <img
                alt={actorDetails.name}
                style={{ borderRadius: "5px" }}
                src={`https://www.themoviedb.org/t/p/w300/${actorDetails.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ borderRadius: "5px", width: "300px", height: "450px" }}
                src={ProfilePicHolder}
              ></img>
            )}

            <Typography color="primary" variant="h6">
              Known For{" "}
            </Typography>
            <Typography>
              {actorDetails.known_for_department
                ? actorDetails.known_for_department
                : "-"}
            </Typography>
            <Typography color="primary" variant="h6">
              Gender{" "}
            </Typography>
            <Typography>
              {actorDetails.gender === 1 ? "Female" : "Male"}
            </Typography>
            <Typography color="primary" variant="h6">
              Birthday
            </Typography>
            <Typography>
              {actorDetails.birthday ? (
                <div>
                  {actorDetails.birthday} (
                  {Number(currentYear - actorDetails.birthday.slice(0, 4))}{" "}
                  years old)
                </div>
              ) : (
                "-"
              )}
            </Typography>
            <Typography color="primary" variant="h6">
              Place of Birth{" "}
            </Typography>
            <Typography>
              {actorDetails.place_of_birth ? actorDetails.place_of_birth : "-"}
            </Typography>
          </Grid>
          <Grid item sm={9} style={{ paddingLeft: "20px" }}>
            <div>
              <Typography
                variant="h3"
                style={{ marginBottom: "30px", fontWeight: 600 }}
              >
                {actorDetails.name}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: "15px" }}>
                Biography{" "}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {actorDetails.biography
                  ? actorDetails.biography
                  : "No biography"}
              </Typography>
            </div>
            {creditsSortedByPopularity.length > 0 && (
              <div>
                {console.log("CREDS BY POP ", creditsSortedByPopularity)}
                <Typography variant="h4" style={{ marginBottom: "15px" }}>
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
                        {console.log(credit)}
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
