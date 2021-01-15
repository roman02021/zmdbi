import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Credits from "../Credits";
import { Link } from "react-router-dom";
import { Container, Typography, Grid } from "@material-ui/core";
import ActorCredits from "./ActorCredits";
import { kategorieTeilung } from "../kategorieTeilung";
import "../../linkStyle.scss";
import ProfilePicHolder from "../../images/profile_pic_holder_long.png";
const ActorPage = () => {
  let { actorId } = useParams();

  const [actorDetails, setActorDetails] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCredits, setAllCredits] = useState(undefined);
  const [changedCredits, setChangedCredts] = useState(undefined);
  const [creditsSortedByPopularity, setCreditsSortedByPopularity] = useState(
    []
  );
  const [categories, setCategories] = useState({});
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
    console.log(allCredits);
    const sortedCredits = allCredits.cast.sort((credit1, credit2) =>
      credit1.popularity > credit2.popularity ? -1 : 1
    );
    setCreditsSortedByPopularity(sortedCredits.slice(0, 8));
  };
  console.log(creditsSortedByPopularity);
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
    setAllCredits(null);
  };

  console.log(categories);
  if (allCredits) {
    renameAndSortByReleaseDate();
    sortByPopularity();
    setCategories(kategorieTeilung(allCredits));
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchActorDetails();
    fetchAllCredits();
  }, []);
  return (
    isLoaded && (
      <Container>
        <Grid container style={{ display: "flex", marginTop: "20px" }}>
          <Grid item sm={3}>
            {actorDetails.profile_path ? (
              <img
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
              {actorDetails.birthday
                ? Number(currentYear - actorDetails.birthday.slice(0, 4))
                : "-"}
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
              <Typography variant="h3" style={{ marginBottom: "30px" }}>
                {actorDetails.name}
              </Typography>
              <Typography variant="h6" style={{ marginBottom: "15px" }}>
                Biography{" "}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {actorDetails.biography ? actorDetails.biography : "-"}
              </Typography>
            </div>
            <div
              style={{ display: "flex", overflowX: "scroll", width: "auto" }}
            >
              {creditsSortedByPopularity.map((credit) => (
                <div style={{ margin: "10px", width: "150px" }}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={{
                      pathname: `/details/${credit.id}`,
                    }}
                  >
                    <img
                      style={{ borderRadius: "5px" }}
                      src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${credit.poster_path}`}
                    />
                    <Typography className="hoverLink">
                      {credit.title}
                    </Typography>
                  </Link>
                </div>
              ))}
            </div>
            <ActorCredits changedCredits={changedCredits} />
          </Grid>
        </Grid>
      </Container>
    )
  );
};

export default ActorPage;
