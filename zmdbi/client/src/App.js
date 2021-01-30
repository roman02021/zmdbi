import "./App.css";
import DiscoverPage from "./components/Discover/DiscoverPage";
import NavBar from "./components/shared/NavBar";
import MoviePage from "./components/MovieDetails/MoviePage";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Credits from "./components/Credits/Credits";
import ActorPage from "./components/ActorPage/ActorPage";
import LandingPage from "./components/LandingPage/LandingPage";
import { ThemeProvider } from "@material-ui/core";
import Footer from "./components/shared/Footer";
import "./linkStyle.scss";

import SessionProvider from "./contexts/SessionContext";
import DiscoverProvider from "./contexts/DiscoverContext";

import SignedProvider from "./contexts/SignedContext";
import LoginApproved from "./LoginApproved";
import SearchResults from "./components/SearchPage/SearchResults";

import theme from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <DiscoverProvider>
            <SignedProvider>
              <SessionProvider>
                <NavBar />

                <Switch>
                  <Route path="/" exact>
                    <LandingPage />
                  </Route>
                  <Route path="/discover" component={DiscoverPage}>
                    <DiscoverPage />
                  </Route>
                  <Route path="/details/:media_type/:id" component={MoviePage}>
                    <MoviePage />
                  </Route>
                  <Route path="/credits/:movieId" component={Credits}>
                    <Credits />
                  </Route>
                  <Route path="/person/:personId" component={ActorPage}>
                    <ActorPage />
                  </Route>
                  <Route path="/logginApproved" component={LoginApproved}>
                    <LoginApproved />
                  </Route>
                  <Route path="/search/:query" component={SearchResults}>
                    <SearchResults />
                  </Route>
                </Switch>
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
