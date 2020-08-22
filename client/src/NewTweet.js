import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";

const NewTweet = () => {
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
        window.location.reload();
      })

      .catch(console.error);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {error && <div>{errorMessage}</div>}
      <form onSubmit={maxCharacters}>
        <Wrapper>
          <TextArea
            // style={{ rows:"4" ,cols:"50" }}
            type="text"
            name="content"
            value={currentTweet}
            onChange={handleOnChange}
          ></TextArea>

          <Button
            onClick={handleSubmitTweet}
            type="submit"
            disabled={currentTweet.length > 0 ? false : true}
          >
            MEOW
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

export default NewTweet;
