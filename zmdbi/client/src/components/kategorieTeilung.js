export function kategorieTeilung(credits) {
  let categories = {
    production: [],
    art: [],
    crewMembers: [],
    costume: [],
    camera: [],
    directing: [],
    editing: [],
    lighting: [],
    sound: [],
    visualEffects: [],
    writing: [],
  };

  credits.crew.map((crew) => {
    if (crew.department === "Production") {
      categories.production.push(crew);
    } else if (crew.department === "Art") {
      categories.art.push(crew);
    } else if (crew.department === "Crew") {
      categories.crewMembers.push(crew);
    } else if (crew.department === "Costume & Make-Up") {
      categories.costume.push(crew);
    } else if (crew.department === "Camera") {
      categories.camera.push(crew);
    } else if (crew.department === "Directing") {
      categories.directing.push(crew);
    } else if (crew.department === "Editing") {
      categories.editing.push(crew);
    } else if (crew.department === "Lighting") {
      categories.lighting.push(crew);
    } else if (crew.department === "Sound") {
      categories.sound.push(crew);
    } else if (crew.department === "Visual Effects") {
      categories.visualEffects.push(crew);
    } else if (crew.department === "Writing") {
      categories.writing.push(crew);
    }
  });
  return categories;
}
