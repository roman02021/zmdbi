import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Credits from "./Credits";
const ActorPage = () => {
  let { actorId } = useParams();

  const [actorDetails, setActorDetails] = useState({});

  const [allCredits, setAllCredits] = useState(undefined);
  const [changedCredits, setChangedCredts] = useState(undefined);

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
    console.log("Ich bifafasfass", changedCredits);
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
  }
  console.log(changedCredits);
  useEffect(() => {
    fetchActorDetails();
    fetchAllCredits();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <h1>Actor: {actorDetails.name}</h1>
      <h2>Personal Info</h2>
      <h2>Known For: {actorDetails.known_for_department}</h2>
      <h2>Gender: {actorDetails.gender === 1 ? "Female" : "Male"}</h2>
      <h2>
        Birthday: {actorDetails.birthday}&nbsp;(
        {actorDetails.birthday &&
          Number(currentYear - actorDetails.birthday.slice(0, 4))}
        &nbsp;years old)
      </h2>
      <h2>Place of Birth: {actorDetails.place_of_birth}</h2>
      <p>Biography: {actorDetails.biography}</p>
      <img
        src={`https://www.themoviedb.org/t/p/w185/${actorDetails.profile_path}`}
      ></img>
      <h1>
        {changedCredits &&
          changedCredits.map((credit) => (
            <div style={{ display: "flex" }}>
              <p>
                {credit.release_date !== "3000" &&
                  credit.release_date.slice(0, 4)}
              </p>
              <p>
                {credit.title} as {credit.character}{" "}
                {credit.episode_count === 1 &&
                  ` (in ${credit.episode_count} episode)`}
                {credit.episode_count > 1 &&
                  ` (in ${credit.episode_count} episodes)`}
              </p>
              <p>{credit.media_type === "tv" ? "tv" : "movie"}</p>
            </div>
          ))}
      </h1>
    </div>
  );
};

export default ActorPage;
