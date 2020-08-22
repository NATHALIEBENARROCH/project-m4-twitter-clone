import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Notifications from "./Notifications";
import HomeFeed from "./HomeFeed";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppContainer>
        <MainWrapper>
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
            <Route path="/profile/:profileId">
              <Profile />
            </Route>
          </Switch>
        </MainWrapper>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 900px;
`;
