import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 40px;
  text-align: center;
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <h2>Your Profile</h2>
      {/* Add user profile information and edit functionality here */}
    </ProfileContainer>
  );
};

export default Profile;
