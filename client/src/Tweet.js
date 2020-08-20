import React, { useState, Component } from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { COLORS } from "./constants";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const Tweet = ({ tweet }) => {
  console.log(tweet);
  let history = useHistory();
  function handleClick(ev) {
    ev.preventDefault();
    history.push(`/profile/${tweet.author.handle}`);
  }

  return tweet ? (
    <MyLink to={`/tweet/${tweet.id}`}>
      <Wrapper>
        <Div3>
          <Div1>
            <Avatar src={tweet.author.avatarSrc} onClick={handleClick} />
            <Div2>
              <Author2 onClick={handleClick}>
                <strong>{tweet.author.displayName} </strong>
              </Author2>
              <Author onClick={handleClick}> @{tweet.author.handle} </Author>
              <Author>
                {" "}
                {format(new Date(tweet.timestamp), "MM/dd/yyyy")}{" "}
              </Author>
            </Div2>
          </Div1>
          <Div4>
            <Author> {tweet.status} </Author>
            <MediaPic src={tweet.media.length > 0 ? tweet.media[0].url : ""} />
            <TweetActions id={tweet.id} liked={tweet.isLiked}>
              Tweet bar actions icons
            </TweetActions>
          </Div4>
        </Div3>
      </Wrapper>
    </MyLink>
  ) : (
    <div>loading</div>
  );
};

export default Tweet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  border: 0.5px solid ${COLORS.customgrey};
  padding-bottom: 20px;
  margin: 10px;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: space-around;
  align-items: center;
  background-color: white;
`;

//cannot fix space around
const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  background-color: white;
`;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
`;

const Div4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  padding-left: 60px;
`;

const Avatar = styled.img`
  max-width: 60px;
  border-radius: 50%;
  z-index: 10;
`;

const MediaPic = styled.img`
  max-width: 90%;
  padding-bottom: 20px;
  border-radius: 5%;
`;

const Author2 = styled.span`
  font-size: 0.6 rem;
`;

const Author = styled.span`
  font-size: 0.4 rem;
`;

const MyLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
