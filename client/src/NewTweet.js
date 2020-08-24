import React, { useState } from "react";

import styled from "styled-components";
import { COLORS } from "./constants";

const NewTweet = ({ setTweets, setTweetsStatus }) => {
  const [currentTweet, setCurrentTweet] = useState("");
  const [error, setError] = useState(false);

  const errorMessage = "you have reached character limit of 280 characters";
  const MAXCHAR = 280;
  const maxCharacters = (characters) => {
    if (characters > MAXCHAR) {
      setError(true);
    } else {
      setError(false);
    }
  };
  //REVIEW ON CHANGE
  const handleOnChange = (ev) => {
    maxCharacters(ev.target.value.length);
    console.log(ev.target.value);
    setCurrentTweet(ev.target.value);
  };

  const handleSubmitTweet = () => {
    fetch(`/api/tweet`, {
      method: "POST",
      body: JSON.stringify({ status: currentTweet }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
      })

      .catch(console.error);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {error && <div>{errorMessage}</div>}
      <form onSubmit={maxCharacters}>
        <Wrapper>
          <Div>
            <TextArea
              // style={{ rows:"4" ,cols:"50" }}
              type="text"
              name="content"
              value={currentTweet}
              onChange={handleOnChange}
            ></TextArea>
          </Div>
          <Button
            onClick={handleSubmitTweet}
            type="submit"
            disabled={currentTweet.length > 0 ? false : true}
          >
            MEOOOW
          </Button>
        </Wrapper>
        <Copy>Remaining Characters: {MAXCHAR - currentTweet.length}</Copy>
      </form>
    </div>
  );
};

const Button = styled.button`
  height: 30px;
  width: 120px;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 15px;
  padding: 4px;
  margin-left: 380px;
  margin-top: 30px;
`;

const TextArea = styled.textarea`
  height: 100px;
  width: 500px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Copy = styled.h5`
  color: ${COLORS.primary};
`;

const Avatar = styled.img`
  border-radius: 50%;
  max-width: 80px;
  position: absolute;
  top: 260px;
  left: 20px;
  border: 2px white solid;
`;

const Div = styled.div`
  display: flex;
`;
export default NewTweet;
