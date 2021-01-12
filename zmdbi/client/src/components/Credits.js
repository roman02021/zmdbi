import React from "react";
import { useHistory, Link } from "react-router-dom";
import { CreditPerson } from "./CreditsPerson";
import { Container, Typography } from "@material-ui/core";
const Credits = () => {
  let history = useHistory();
  const credits = history.location.state.credits;

  //crew categories
  let production = [];
  let art = [];
  let crewMembers = [];
  let costume = [];
  let camera = [];
  let directing = [];
  let editing = [];
  let lighting = [];
  let sound = [];
  let visualEffects = [];
  let writing = [];
  credits.crew.map((crew) => {
    if (crew.department === "Production") {
      production.push(crew);
    } else if (crew.department === "Art") {
      art.push(crew);
    } else if (crew.department === "Crew") {
      crewMembers.push(crew);
    } else if (crew.department === "Costume & Make-Up") {
      costume.push(crew);
    } else if (crew.department === "Camera") {
      camera.push(crew);
    } else if (crew.department === "Directing") {
      directing.push(crew);
    } else if (crew.department === "Editing") {
      editing.push(crew);
    } else if (crew.department === "Lighting") {
      lighting.push(crew);
    } else if (crew.department === "Sound") {
      sound.push(crew);
    } else if (crew.department === "Visual Effects") {
      visualEffects.push(crew);
    } else if (crew.department === "Writing") {
      writing.push(crew);
    }
  });
  console.log(credits);

  return (
    <Container style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <Typography>Actors</Typography>
        {credits.cast.map((actor) => (
          <CreditPerson credits={actor} />
        ))}
      </div>
      <div style={{ width: "49%" }}>
        <Typography>Art</Typography>
        {art.map((art) => (
          <CreditPerson credits={art} />
        ))}
        <Typography>Camera</Typography>
        {camera.map((camera) => (
          <CreditPerson credits={camera} />
        ))}
        <Typography>Crew</Typography>
        {crewMembers.map((crewMembers) => (
          <CreditPerson credits={crewMembers} />
        ))}

        <Typography>Costume & Make-Up</Typography>
        {costume.map((costume) => (
          <CreditPerson credits={costume} />
        ))}
        <Typography>Directing</Typography>
        {directing.map((directing) => (
          <CreditPerson credits={directing} />
        ))}
        <Typography>Editing</Typography>
        {editing.map((editing) => (
          <CreditPerson credits={editing} />
        ))}
        <Typography>Lighting</Typography>
        {lighting.map((lighting) => (
          <CreditPerson credits={lighting} />
        ))}
        <Typography>Production</Typography>
        {production.map((production) => (
          <CreditPerson credits={production} />
        ))}
        <Typography>Sound</Typography>
        {sound.map((sound) => (
          <CreditPerson credits={sound} />
        ))}
        <Typography>Visual Effects</Typography>
        {visualEffects.map((visualEffects) => (
          <CreditPerson credits={visualEffects} />
        ))}
        <Typography>Writing</Typography>
        {writing.map((writing) => (
          <CreditPerson credits={writing} />
        ))}
      </div>
    </Container>
  );
};

export default Credits;
