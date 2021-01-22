import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper } from "@material-ui/core";
import CreditPerson from "../Credits/CreditsPerson";
import { Link } from "react-router-dom";
import "../../linkStyle.scss";
const TrendingPerson = (props) => {
  const [trendingPeople, setTrendingPeople] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const fetchTrendingPeople = async () => {
    const trendingPeople = await axios.get(
      "http://localhost:5000/landingPage/trendingPeople"
    );
    console.log("heh", trendingPeople.data.results);
    setTrendingPeople(
      trendingPeople.data.results
        .sort((person1, person2) =>
          person1.popularity < person2.popularity ? 1 : -1
        )
        .slice(0, 3)
    );
    setLoaded(true);
  };

  console.log("trending men", trendingPeople);
  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  return (
    loaded && (
      <div style={{ width: "100%" }}>
        <Typography variant="h4" style={{ marginLeft: "10px" }}>
          Trending Actors
        </Typography>

        {trendingPeople.map((person) => (
          <div>
            <Paper style={{ display: "flex", margin: "10px" }}>
              <Link
                to={`/actor/${person.id}/`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  style={{
                    width: "88px",
                    borderRadius: "5px 0 0 5px",
                    margin: "5px 10px 0px 5px",
                  }}
                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                />{" "}
              </Link>{" "}
              <div>
                <Link
                  to={`/actor/${person.id}/`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="h6" className="hoverLink">
                    {person.name}
                  </Typography>{" "}
                </Link>{" "}
                <Typography variant="caption">Known For</Typography>
                {person.known_for.map((movie) => (
                  <div>
                    <Link
                      props={movie.id}
                      to={`/details/${movie.media_type}/${movie.id}/`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography variant="body2" className="hoverLink">
                        {movie.title}
                      </Typography>
                    </Link>
                  </div>
                ))}
              </div>
            </Paper>
          </div>
        ))}
      </div>
    )
  );
};

export default TrendingPerson;
