import React, { useState, useContext } from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { Icon } from "react-icons-kit";
import { bell } from "react-icons-kit/feather/bell";
import { home3 } from "react-icons-kit/icomoon/home3";
import { bookmark } from "react-icons-kit/icomoon/bookmark";
import { smile } from "react-icons-kit/icomoon/smile";
import { NavLink } from "react-router-dom";

import CurrentUserContext from "./CurrentUserContext";

import { COLORS } from "./constants";
import styled from "styled-components";

const Sidebar = () => {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <BigLogo />
      <Wrapper2>
        <MyLink exact to="/">
          <Icon icon={home3} /> Home
        </MyLink>
        {currentUser ? (
          <MyLink to={`/profile/${currentUser.profile.handle}`}>
            <Icon icon={smile} /> Profile
          </MyLink>
        ) : (
          <span>loading</span>
        )}
        <MyLink to="/notifications">
          <Icon icon={bell} /> Notifications
        </MyLink>
        <MyLink to="/bookmarks">
          <Icon icon={bookmark} /> Bookmarks
        </MyLink>
      </Wrapper2>
      <Button>Meow</Button>
    </Wrapper>
  );
};

const MyLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: ${COLORS.primary};
  }
`;

const BigLogo = styled(Logo)`
  max-width: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: left;
  background-color: white;
  padding-left: 30px;
  min-width: 160px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 900;
  justify-content: space-between;
  background-color: white;
  min-height: 120px;
`;

const Button = styled.button`
  width: 120px;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 15px;
  margin-top: 20px;
  padding: 4px;
`;

export default Sidebar;
