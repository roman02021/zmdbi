import React from "react";
import { useHistory, Link } from "react-router-dom";
import { CreditPerson } from "./CreditsPerson";
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
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <h1>Actors</h1>
        {credits.cast.map((actor) => (
          <CreditPerson credits={actor} />
        ))}
      </div>
      <div style={{ width: "49%" }}>
        <h3>Art</h3>
        {art.map((art) => (
          <CreditPerson credits={art} />
        ))}
        <h3>Camera</h3>
        {camera.map((camera) => (
          <CreditPerson credits={camera} />
        ))}
        <h1>Crew</h1>
        {crewMembers.map((crewMembers) => (
          <CreditPerson credits={crewMembers} />
        ))}

        <h3>Costume & Make-Up</h3>
        {costume.map((costume) => (
          <CreditPerson credits={costume} />
        ))}
        <h3>Directing</h3>
        {directing.map((directing) => (
          <CreditPerson credits={directing} />
        ))}
        <h3>Editing</h3>
        {editing.map((editing) => (
          <CreditPerson credits={editing} />
        ))}
        <h3>Lighting</h3>
        {lighting.map((lighting) => (
          <CreditPerson credits={lighting} />
        ))}
        <h3>Production</h3>
        {production.map((production) => (
          <CreditPerson credits={production} />
        ))}
        <h3>Sound</h3>
        {sound.map((sound) => (
          <CreditPerson credits={sound} />
        ))}
        <h3>Visual Effects</h3>
        {visualEffects.map((visualEffects) => (
          <CreditPerson credits={visualEffects} />
        ))}
        <h3>Writing</h3>
        {writing.map((writing) => (
          <CreditPerson credits={writing} />
        ))}
      </div>
    </div>
  );
};

export default Credits;
