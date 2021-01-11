import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Credits from "./Credits";
import { Link } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
const ActorPage = () => {
  let { actorId } = useParams();

  const [actorDetails, setActorDetails] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCredits, setAllCredits] = useState(undefined);
  const [changedCredits, setChangedCredts] = useState(undefined);
  const [creditsSortedByPopularity, setCreditsSortedByPopularity] = useState(
    []
  );
  console.log("yes", allCredits);
  const currentYear = new Date().getFullYear();

  const fetchActorDetails = async () => {
    const actorDetails = await axios.get(
      "http://localhost:5000/details/actor",
      {
        params: { actorId: actorId },
      }
    );
    console.log("GO OFF");
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

    setChangedCredts(changedCredits);

    setAllCredits(undefined);
  };
  console.log("CHANGED CREDITS", changedCredits);
  if (allCredits) {
    renameAndSortByReleaseDate();
    setIsLoaded(true);
  }
  console.log(changedCredits);
  useEffect(() => {
    fetchActorDetails();
    fetchAllCredits();
  }, []);
  return (
    isLoaded && (
      <Container style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <img
            src={`https://www.themoviedb.org/t/p/w185/${actorDetails.profile_path}`}
          ></img>

          <Typography color="primary">Known For </Typography>
          <Typography>{actorDetails.known_for_department}</Typography>
          <Typography color="primary">Gender </Typography>
          <Typography>
            {actorDetails.gender === 1 ? "Female" : "Male"}
          </Typography>
          <Typography color="primary">Birthday</Typography>
          <Typography>
            {actorDetails.birthday}&nbsp;(
            {actorDetails.birthday &&
              Number(currentYear - actorDetails.birthday.slice(0, 4))}
            &nbsp;years old)
          </Typography>

          <Typography color="primary">Place of Birth </Typography>
          <Typography>{actorDetails.place_of_birth}</Typography>
        </div>
        <div style={{ width: "80%" }}>
          <h1>Actor: {actorDetails.name}</h1>
          <Typography>Biography: {actorDetails.biography}</Typography>
          <Typography>
            {changedCredits &&
              changedCredits.map((credit) => (
                <div style={{ display: "flex" }}>
                  <Typography color="primary">
                    {credit.release_date !== "3000" &&
                      credit.release_date.slice(0, 4)}
                    &nbsp;
                  </Typography>

                  <Typography>
                    {console.log(credit)}
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={{
                        pathname: `/details/${credit.id}`,
                      }}
                    >
                      {credit.title}
                    </Link>
                    {credit.character && " as " + credit.character}
                    {credit.episode_count === 1 &&
                      ` (in ${credit.episode_count} episode)`}
                    {credit.episode_count > 1 &&
                      ` (in ${credit.episode_count} episodes)`}
                  </Typography>
                  {/* <p>{credit.media_type === "tv" ? "tv" : "movie"}</p> */}
                </div>
              ))}
          </Typography>
        </div>
      </Container>
    )
  );
};

export default ActorPage;
