import React, { useState, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import Tweet from "./Tweet";
import styled from "styled-components";

const HomeFeed = () => {
  const { setCurrentUser, currentUser, status, setStatus } = useContext(
    CurrentUserContext
  );
  const [tweets, setTweets] = useState([]);
  const [tweetsStatus, setTweetsStatus] = useState("loading");

  React.useEffect(() => {
    fetch("/api/me/home-feed")
      //HIGHER ORDER FUNCTION?RES THEN DATA?
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweets(data);
        // When the data is received, the staus is changed to idle
        setTweetsStatus("idle");
      })
      .catch((error) => {
        console.log("an error occured please refresh", error);
        if (error) {
          window.location.href = "/error";
        }
      });
  }, []);
  console.log(tweets);
  const tweetDisplay =
    tweetsStatus == "idle" ? (
      tweets.tweetIds.map((id) => {
        const tweet = tweets.tweetsById[id];
        //add IF BEING FOLLOWED BY YOU?
        console.log(tweet);
        return <Tweet tweet={tweet} />;
      })
    ) : (
      <div>"TWEET COMPONENT</div>
    );

  return status == "idle" ? (
    <TweetFeed>
      <H1>Home</H1>
      <div>TWEETFEED{tweetDisplay}</div>
    </TweetFeed>
  ) : status == "loading" ? (
    <div>loading</div>
  ) : (
    <div>error</div>
  );
};

const H1 = styled.h1`
  font-size: 1rem;
  padding-left: 10px;
`;

const TweetFeed = styled.div`
  padding-left: 10px;
`;
export default HomeFeed;
