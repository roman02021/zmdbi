import "./App.css";
import DiscoverPage from "./components/Discover/DiscoverPage";
import NavBar from "./components/shared/NavBar";
import MoviePage from "./components/MovieDetails/MoviePage";
// import { Context } from "./contexts/Context";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credits from "./components/Credits/Credits";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage/LandingPage";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Footer from "./components/shared/Footer";
import "./linkStyle.scss";
import SearchProvider from "./contexts/SearchContext";
import SessionProvider from "./contexts/SessionContext";
import DiscoverProvider from "./contexts/DiscoverContext";
import { blue, red } from "@material-ui/core/colors";
import SignedProvider from "./contexts/SignedContext";
import LoginApproved from "./LoginApproved";
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
          <DiscoverProvider>
            <SignedProvider>
              <SessionProvider>
                <SearchProvider>
                  <NavBar />

                  <Switch>
                    <Route path="/" exact>
                      <LandingPage />
                    </Route>
                    <Route path="/discover" component={DiscoverPage}>
                      <DiscoverPage />
                    </Route>
                    <Route
                      path="/details/:media_type/:id"
                      component={MoviePage}
                    >
                      <MoviePage />
                    </Route>
                    <Route path="/credits/:movieId" component={Credits}>
                      <Credits />
                    </Route>
                    <Route path="/actor/:actorId" component={ActorPage}>
                      <ActorPage />
                    </Route>
                    <Route path="/logginApproved" component={LoginApproved}>
                      <LoginApproved />
                    </Route>
                  </Switch>
                </SearchProvider>
              </SessionProvider>
            </SignedProvider>
          </DiscoverProvider>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
