import React from "react";
import { useHistory } from "react-router-dom";
import CreditPerson from "./CreditsPerson";
import { Container, Typography } from "@material-ui/core";
import { kategorieTeilung } from "../shared/kategorieTeilung";
import { useMediaQuery } from "@material-ui/core";
const Credits = () => {
  let history = useHistory();
  const credits = history.location.state.credits;
  const isMobile = useMediaQuery("(max-width:800px)");
  //crew categories

  const categories = kategorieTeilung(credits.crew);

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "30px",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <div style={{ width: isMobile ? "100%" : "50%" }}>
        <Typography variant="h6">Actors</Typography>
        {credits.cast.map((actor) => (
          <CreditPerson credits={actor} />
        ))}
      </div>
      <div style={{ width: isMobile ? "100%" : "50%" }}>
        {categories.art.length !== 0 && (
          <Typography variant="h6">Art</Typography>
        )}
        {categories.art.map((art) => (
          <CreditPerson credits={art} />
        ))}
        {categories.camera.length !== 0 && (
          <Typography variant="h6">Camera</Typography>
        )}
        {categories.camera.map((camera) => (
          <CreditPerson credits={camera} />
        ))}
        {categories.crewMembers.length !== 0 && (
          <Typography variant="h6">Crew Members</Typography>
        )}
        {categories.crewMembers.map((crewMembers) => (
          <CreditPerson credits={crewMembers} />
        ))}

        {categories.costume.length !== 0 && (
          <Typography variant="h6">Costume & Make-Up</Typography>
        )}
        {categories.costume.map((costume) => (
          <CreditPerson credits={costume} />
        ))}
        {categories.directing.length !== 0 && (
          <Typography variant="h6">Directing</Typography>
        )}
        {categories.directing.map((directing) => (
          <CreditPerson credits={directing} />
        ))}
        {categories.editing.length !== 0 && (
          <Typography variant="h6">Editing</Typography>
        )}
        {categories.editing.map((editing) => (
          <CreditPerson credits={editing} />
        ))}
        {categories.lighting.length !== 0 && (
          <Typography variant="h6">Lighting</Typography>
        )}
        {categories.lighting.map((lighting) => (
          <CreditPerson credits={lighting} />
        ))}
        {categories.production.length !== 0 && (
          <Typography variant="h6">Production</Typography>
        )}
        {categories.production.map((production) => (
          <CreditPerson credits={production} />
        ))}
        {categories.sound.length !== 0 && (
          <Typography variant="h6"> Sound</Typography>
        )}
        {categories.sound.map((sound) => (
          <CreditPerson credits={sound} />
        ))}
        {categories.visualEffects.length !== 0 && (
          <Typography variant="h6">Visual Effects</Typography>
        )}
        {categories.visualEffects.map((visualEffects) => (
          <CreditPerson credits={visualEffects} />
        ))}
        {categories.writing.length !== 0 && (
          <Typography variant="h6">Writing</Typography>
        )}

        {categories.writing.map((writing) => (
          <CreditPerson credits={writing} />
        ))}
      </div>
    </Container>
  );
};

export default Credits;
