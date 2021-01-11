import "./App.css";
import DiscoverPage from "./components/DiscoverPage";
import NavBar from "./components/NavBar";
import MoviePage from "./components/MoviePage";
import { Context } from "./contexts/Context";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credits from "./components/Credits";
import ActorPage from "./components/ActorPage";
import LandingPage from "./components/LandingPage";
function App() {
  const [showMoviesMode, setShowMoviesMode] = useState("popularity");
  const [search, setSearch] = useState("");
  return (
    <Router>
      <div className="App">
        <Context.Provider
          value={{ showMoviesMode, setShowMoviesMode, search, setSearch }}
        >
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/discover" component={DiscoverPage}>
              <DiscoverPage />
            </Route>
            <Route path="/details/:movieId" component={MoviePage}>
              <MoviePage />
            </Route>
            <Route path="/credits/:movieId" component={Credits}>
              <Credits />
            </Route>
            <Route path="/actor/:actorId" component={ActorPage}>
              <ActorPage />
            </Route>
          </Switch>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
