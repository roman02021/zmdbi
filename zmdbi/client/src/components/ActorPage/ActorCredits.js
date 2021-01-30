import React from "react";
import "../../linkStyle.scss";
import { kategorieTeilung } from "../shared/kategorieTeilung";
import ActorCreditCategory from "./ActorCreditCategory";

const ActorCredits = ({ changedCredits, crewCredits }) => {
  const categories = kategorieTeilung(crewCredits);

  return (
    <div>
      <div>
        {changedCredits && <ActorCreditCategory credits={changedCredits} />}
        {categories.art.length > 0 && (
          <ActorCreditCategory credits={categories.art} />
        )}
        {categories.camera.length > 0 && (
          <ActorCreditCategory credits={categories.camera} />
        )}
        {categories.costume.length > 0 && (
          <ActorCreditCategory credits={categories.costume} />
        )}
        {categories.directing.length > 0 && (
          <ActorCreditCategory credits={categories.directing} />
        )}
        {categories.crewMembers.length > 0 && (
          <ActorCreditCategory credits={categories.crewMembers} />
        )}

        {categories.editing.length > 0 && (
          <ActorCreditCategory credits={categories.editing} />
        )}
        {categories.lighting.length > 0 && (
          <ActorCreditCategory credits={categories.lighting} />
        )}
        {categories.sound.length > 0 && (
          <ActorCreditCategory credits={categories.sound} />
        )}
        {categories.production.length > 0 && (
          <ActorCreditCategory credits={categories.production} />
        )}
        {categories.writing.length > 0 && (
          <ActorCreditCategory credits={categories.writing} />
        )}
        {categories.visualEffects.length > 0 && (
          <ActorCreditCategory credits={categories.visualEffects} />
        )}
      </div>
    </div>
  );
};

export default ActorCredits;
