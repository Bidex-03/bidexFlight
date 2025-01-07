// this component is currently not in use //
import { useNavigate, useLocation } from "react-router-dom";
import { useFlights } from "../services/flightService";
import styled from "styled-components";
import { Button } from "../ui/Button";

const FlightsContainer = styled.div`
  padding: 20px;
  background-color: var(--background-color);
`;

const AvailableFlights = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedFrom, selectedTo, departureDate, returnDate } =
    location.state || {};

  console.log("Selected search options:", {
    selectedFrom,
    selectedTo,
    departureDate,
    returnDate,
  });

  const {
    data: flights,
    isLoading,
    isError,
  } = useFlights({
    from: selectedFrom,
    to: selectedTo,
    departureDate,
    returnDate,
  });

  const handleBookFlight = (flight) => {
    navigate(`/book-flight/${flight.id}`);
  };

  return (
    <FlightsContainer>
      <h1>Available Flights</h1>

      {isLoading ? (
        <p>Loading flights...</p>
      ) : isError ? (
        <p>Error fetching flights. Please try again.</p>
      ) : flights?.length ? (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Arrival Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flight_number}</td>
                <td>{flight.departure_city}</td>
                <td>{flight.destination_city}</td>
                <td>{flight.departure_time}</td>
                <td>{flight.arrival_time}</td>
                <td>{flight.price}</td>
                <td>
                  <Button onClick={() => handleBookFlight(flight)}>Book</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No flights found for your search criteria.</p>
      )}
    </FlightsContainer>
  );
};

export default AvailableFlights;
