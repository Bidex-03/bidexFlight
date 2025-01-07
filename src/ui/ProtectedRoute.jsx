import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "./Spinner";

export const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is no authenticated user, redirect to the /sign-in
  useEffect(() => {
    if (!isAuthenticated && isLoading) navigate("/sign-in");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        {/* <Spinner /> */}
        <LoadingSpinner />
      </FullPage>
    );

  // 4. If there's a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
