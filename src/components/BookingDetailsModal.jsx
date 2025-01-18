import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  color: var(--primary-color);
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const DetailsText = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--secondary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const BookingDetailsModal = ({ booking, onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <Title>Booking Details</Title>
        <DetailsText>
          Flight Number: {booking.flights?.flight_number || "N/A"}
        </DetailsText>
        <DetailsText>
          Departure City: {booking.flights?.departure_city || "N/A"}
        </DetailsText>
        <DetailsText>
          Destination City: {booking.flights?.destination_city || "N/A"}
        </DetailsText>
        <DetailsText>
          Gate Number: {booking.flights?.gate_number || "N/A"}
        </DetailsText>
        <DetailsText>
          Departure Time:{" "}
          {booking.flights?.departure_time
            ? formatTimestamp(booking.flights.departure_time)
            : "N/A"}
        </DetailsText>
        <DetailsText>
          Arrival Time:{" "}
          {booking.flights?.arrival_time
            ? formatTimestamp(booking.flights.arrival_time)
            : "N/A"}
        </DetailsText>
        <DetailsText>Class: {booking.class}</DetailsText>
        <DetailsText>Price: ${booking.price}</DetailsText>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </>
  );
};

// Helper function to format the timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default BookingDetailsModal;
