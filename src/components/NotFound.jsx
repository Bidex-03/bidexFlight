import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--error-color);
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404 - Page Not Found</h1>
    </NotFoundContainer>
  );
};

export default NotFound;
