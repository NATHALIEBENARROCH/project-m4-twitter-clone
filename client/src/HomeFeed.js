import React, { useState, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import styled from "styled-components";

const HomeFeed = () => {
  const { status } = useContext(CurrentUserContext);
  const [tweets, setTweets] = useState([]);
  const [tweetsStatus, setTweetsStatus] = useState("loading");

  React.useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //data is received
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
  //when? on load otherwise if empty each render will
  console.log(tweets);
  const tweetDisplay =
    tweetsStatus == "idle" ? (
      tweets.tweetIds.map((id) => {
        const tweet = tweets.tweetsById[id];
        //whatever (id) get object of id related to it
        //SQUARE OBJECTS MAKE ME ACCESS THE VALUE OF THOSE OBJECTS
        return <Tweet tweet={tweet} />;
      })
    ) : (
      <div> TD loading</div>
    );

  return status == "idle" ? (
    <TweetFeed>
      <NewTweet setTweets={setTweets} setTweetsStatus={setTweetsStatus} />
      <div>{tweetDisplay}</div>
    </TweetFeed>
  ) : status == "loading" ? (
    <div>loading</div>
  ) : (
    <div>error</div>
  );
};

const TweetFeed = styled.div`
  padding-left: 10px;
`;
export default HomeFeed;
