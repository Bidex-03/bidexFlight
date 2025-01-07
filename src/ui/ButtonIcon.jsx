import styled from "styled-components";

const ButtonIcon = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--secondary-color);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--background-color);
  }
`;

export default ButtonIcon;
