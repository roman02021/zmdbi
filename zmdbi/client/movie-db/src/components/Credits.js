import React from "react";
import { useHistory, Link } from "react-router-dom";
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
          <div style={{ display: "flex" }}>
            {actor.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${actor.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{actor.name}</h1>
          </div>
        ))}
      </div>
      <div style={{ width: "49%" }}>
        <h1>Crew</h1>
        <h3>Art</h3>
        {art.map((artist) => (
          <div style={{ display: "flex" }}>
            {artist.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${artist.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{artist.name}</h1>
          </div>
        ))}
        <h3>Camera</h3>
        {art.map((camera) => (
          <div style={{ display: "flex" }}>
            {camera.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${camera.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{camera.name}</h1>
          </div>
        ))}
        <h3>Costume & Make-Up</h3>
        {art.map((costume) => (
          <div style={{ display: "flex" }}>
            {costume.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${costume.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{costume.name}</h1>
          </div>
        ))}
        <h3>Crew</h3>
        {art.map((crew) => (
          <div style={{ display: "flex" }}>
            {crew.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${crew.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{crew.name}</h1>
          </div>
        ))}
        <h3>Directing</h3>
        {art.map((director) => (
          <div style={{ display: "flex" }}>
            {director.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${director.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{director.name}</h1>
          </div>
        ))}
        <h3>Editing</h3>
        {art.map((editing) => (
          <div style={{ display: "flex" }}>
            {editing.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${editing.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{editing.name}</h1>
          </div>
        ))}
        <h3>Lighting</h3>
        {art.map((lighting) => (
          <div style={{ display: "flex" }}>
            {lighting.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${lighting.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{lighting.name}</h1>
          </div>
        ))}
        <h3>Production</h3>
        {art.map((production) => (
          <div style={{ display: "flex" }}>
            {production.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${production.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{production.name}</h1>
          </div>
        ))}
        <h3>Sound</h3>
        {art.map((Sound) => (
          <div style={{ display: "flex" }}>
            {Sound.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${Sound.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{Sound.name}</h1>
          </div>
        ))}
        <h3>Visual Effects</h3>
        {art.map((visual) => (
          <div style={{ display: "flex" }}>
            {visual.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${visual.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{visual.name}</h1>
          </div>
        ))}
        <h3>Writing</h3>
        {art.map((writing) => (
          <div style={{ display: "flex" }}>
            {writing.profile_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w66_and_h66_face/${writing.profile_path}`}
              ></img>
            ) : (
              <img
                style={{ width: "66px", height: "66px" }}
                src="https://it.fitnyc.edu/wp-content/uploads/2018/01/Untitled-design.png"
              ></img>
            )}
            <h1>{writing.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
