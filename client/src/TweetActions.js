import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { message } from "react-icons-kit/entypo/message";
import { cycle } from "react-icons-kit/entypo/cycle";
import { outlined } from "react-icons-kit/entypo/outlined";
import { upload } from "react-icons-kit/entypo/upload";
import { Link } from "react-router-dom";

const TweetActions = () => {
  return (
    <Wrapper>
      <Link>
        <Icon icon={message} />
      </Link>
      <Link>
        <Icon icon={cycle} />
      </Link>
      <Link>
        <Icon icon={outlined} />
      </Link>
      <Link>
        <Icon icon={upload} />
      </Link>
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
