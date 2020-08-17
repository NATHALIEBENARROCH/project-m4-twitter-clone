import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Notifications from "./Notifications";
import HomeFeed from "./HomeFeed";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import { COLORS } from "./GlobalStyles";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <GlobalStyles>
      <wrapper>
        <BrowserRouter>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </BrowserRouter>
      </wrapper>
    </GlobalStyles>
  );
};

export default App;
