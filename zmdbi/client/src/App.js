import "./App.css";
import DiscoverPage from "./components/DiscoverPage";
import NavBar from "./components/NavBar";
import MoviePage from "./components/MovieDetails/MoviePage";
// import { Context } from "./contexts/Context";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credits from "./components/Credits";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Footer from "./components/Footer";
import "./linkStyle.scss";
import SearchProvider from "./contexts/SearchContext";

import { blue, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  pallete: {
    primary: red,
  },
});

function App() {
  const [showMoviesMode, setShowMoviesMode] = useState("popularity");

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SearchProvider>
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
          </SearchProvider>

          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
