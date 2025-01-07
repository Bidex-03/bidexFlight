// this component is currently not in use //
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const TicketContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
`;

const TicketCard = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;

  h2 {
    color: var(--primary-color);
  }

  p {
    font-size: 16px;
    margin: 10px 0;
    color: var(--text-color);
  }
`;

const BoardingPass = () => {
  const location = useLocation();
  const {
    userName,
    flightNumber,
    gateNumber,
    seatNumber,
    departureTime,
    route,
  } = location.state;

  return (
    <TicketContainer>
      <TicketCard>
        <h2>Boarding Pass</h2>
        <p>
          <strong>Passenger Name:</strong> {userName}
        </p>
        <p>
          <strong>Flight Number:</strong> {flightNumber}
        </p>
        <p>
          <strong>Gate Number:</strong> {gateNumber}
        </p>
        <p>
          <strong>Seat Number:</strong> {seatNumber}
        </p>
        <p>
          <strong>Departure Time:</strong>{" "}
          {new Date(departureTime).toLocaleString()}
        </p>
        <p>
          <strong>Route:</strong> {route}
        </p>
      </TicketCard>
    </TicketContainer>
  );
};

export default BoardingPass;
