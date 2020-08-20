import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);
  const [tweetsStatus, setTweetsStatus] = useState("loading");

  React.useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      //HIGHER ORDER FUNCTION?RES THEN DATA?
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweet(data.tweet);
        // When the data is received, the staus is changed to idle
        setTweetsStatus("idle");
      })
      .catch((error) => {
        console.log("an error occured please refresh", error);
        if (error) {
          // window.location.href = "/error";
        }
      });
  }, [tweetId]);

  return tweetsStatus == "idle" ? (
    <Tweet tweet={tweet} />
  ) : tweetsStatus == "loading" ? (
    <div>loading</div>
  ) : (
    <div>error</div>
  );
};

export default TweetDetails;
