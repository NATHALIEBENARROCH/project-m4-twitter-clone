import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";
import { Icon } from "react-icons-kit";
import { pin } from "react-icons-kit/entypo/pin";
import { calendar } from "react-icons-kit/entypo/calendar";

const Profile = () => {
  // params = {profileId: 'treasureymog'}
  //PARAMS TAKES THE WILD CARD AND READS IT AS THE KEY WHATEVER IT IS
  // TAKE THAT WILD CARD VALUE
  //const params = useParams();
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  }, [profileId]);
  console.log("error in line 23", profile);
  if (profile)
    return (
      <Wrapper>
        <Banner
          style={{ backgroundImage: `url(${profile.profile.bannerSrc})` }}
        />
        <Avatar src={profile.profile.avatarSrc} />
        <Button>Follow</Button>
        <Wrapper2>
          <span>
            <strong>{profile.profile.displayName}</strong>
          </span>

          <Wrapper3>
            <Copy>@{profile.profile.handle}</Copy>
            if (isFollowingyou === true) return (<Copy>Follows you </Copy>)
          </Wrapper3>
          <h4>{profile.profile.bio}</h4>
          <Wrapper4>
            <Copy>
              <Icon icon={pin} />
              {profile.profile.location}
            </Copy>
            <Copy>
              <Icon icon={calendar} />
              {profile.profile.joined}
            </Copy>
          </Wrapper4>
          <Wrapper5>
            <Copy>{profile.profile.numFollowing} Following</Copy>
            <Copy>{profile.profile.numFollowers}Followers</Copy>
          </Wrapper5>
        </Wrapper2>
      </Wrapper>
    );
  else return <span>loading</span>;
};

// if ((params = currentUser.profile.handle))
export default Profile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  border: 0.5px solid ${COLORS.customgrey};
  padding-bottom: 20px;
  margin: 10px;
  position: relative;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  margin-top: 5px;
`;

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
  margin: 0px;
  border: 2px red solid;
`;

const Wrapper4 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
`;

const Wrapper5 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
`;

const Banner = styled.div`
  max-width: 100%;
  padding-bottom: 20px;
  min-height: 300px;
  background-size: cover;
`;

const Avatar = styled.img`
  border-radius: 50%;
  max-width: 80px;
  position: absolute;
  top: 260px;
  left: 20px;
  border: 2px white solid;
`;

const Copy = styled.h5`
  color: ${COLORS.mediumgrey};
`;

const Button = styled.button`
  width: 120px;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 15px;
  padding: 4px;
  margin-left: 550px;
  margin-top: 30px;
`;
