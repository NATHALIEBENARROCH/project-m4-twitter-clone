import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { message } from "react-icons-kit/entypo/message";
import { cycle } from "react-icons-kit/entypo/cycle";
import { outlined } from "react-icons-kit/entypo/outlined";
import { upload } from "react-icons-kit/entypo/upload";
import { heart } from "react-icons-kit/entypo/heart";

const TweetActions = ({ id, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeIcon = () => {
    fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !isLiked }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => setIsLiked(!isLiked))
      .catch(console.error);
  };
  return (
    <Wrapper>
      <Icon icon={message} />
      <Icon icon={cycle} />
      <Icon onClick={handleLikeIcon} icon={isLiked ? heart : outlined} />
      <Icon icon={upload} />
    </Wrapper>
  );
};

export default TweetActions;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding-bottom: 30px;
`;
