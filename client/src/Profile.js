import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";
import { Icon } from "react-icons-kit";
import { pin } from "react-icons-kit/entypo/pin";
import { calendar } from "react-icons-kit/entypo/calendar";
import Tweet from "./Tweet";

const Profile = () => {
  // params = {profileId: 'treasureymog'}
  //PARAMS TAKES THE WILD CARD AND READS IT AS THE KEY WHATEVER IT IS
  // TAKE THAT WILD CARD VALUE
  //const params = useParams();
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  //  create a new local state for feed

  useEffect(() => {
    upDateProfile();
    getFeed();
  }, [profileId]);
  console.log(profile);

  const getFeed = () => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((feedData) => {
        const tweetsdata = Object.values(feedData.tweetsById);
        setTweets(tweetsdata);
        //setFeed with data setFeed(data)
      });
  };

  const upDateProfile = () => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  };
  const followToggle = () => {
    fetch(`/api/${profileId}/follow`, { method: `PUT` })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          upDateProfile();
        }
      });
  };

  const unfollowToggle = () => {
    fetch(`/api/${profileId}/unfollow`, { method: `PUT` })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          upDateProfile();
        }
      });
  };

  if (profile)
    return (
      <Wrapper>
        <Banner
          style={{ backgroundImage: `url(${profile.profile.bannerSrc})` }}
        />
        <Avatar src={profile.profile.avatarSrc} />
        {profile.profile.isBeingFollowedByYou === true ? (
          <Button onClick={unfollowToggle}>Following</Button>
        ) : (
          <Button onClick={followToggle}>Follow</Button>
        )}
        <Wrapper2>
          <span>
            <strong>{profile.profile.displayName}</strong>
          </span>
          <Wrapper3>
            <Copy>@{profile.profile.handle}</Copy>
          </Wrapper3>
          <span>{profile.profile.bio}</span>
          <Wrapper3>
            <Copy>
              <Icon icon={pin} />
              {profile.profile.location}
            </Copy>
            <Copy>
              <Icon icon={calendar} />
              {profile.profile.joined}
            </Copy>
          </Wrapper3>
          <Wrapper3>
            <Copy>{profile.profile.numFollowing} Following</Copy>
            <Copy>{profile.profile.numFollowers}Followers</Copy>
          </Wrapper3>
        </Wrapper2>
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
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
  position: relative;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  margin: 10px;
`;

const Wrapper3 = styled.div`
  margin-top: 10px;
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

const Copy = styled.span`
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
