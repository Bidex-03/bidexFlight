import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import defaultUser from "../assets/default-user.jpg";
import { Button } from "../ui/Button";

const Avatar = styled.img`
  display: flex;
  width: 2rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--secondary-color);
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  color: var(--background-color);

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const UserAvatar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <Button onClick={() => navigate("/profile")}>
      <AvatarContainer>
        <Avatar src={avatar || defaultUser} alt={`Avatar of ${fullName}`} />
        <span>{fullName}</span>
      </AvatarContainer>
    </Button>
  );
};

export default UserAvatar;
