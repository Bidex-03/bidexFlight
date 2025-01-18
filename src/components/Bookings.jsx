import { useState } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBookings, deleteBooking } from "../services/bookingService";
import Spinner from "../ui/Spinner";
import BookingDetailsModal from "./BookingDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { FullPage } from "../ui/ProtectedRoute";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BookingsContainer = styled.div`
  padding: 40px;
  background-color: var(--background-color);

  h2 {
    margin-bottom: 20px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Enables horizontal scrolling on smaller screens */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px; /* Ensure a minimum width for better display on mobile */
`;

const TableHead = styled.th`
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
  white-space: nowrap;
`;

const ActionButton = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: var(--secondary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
  }
`;

// Media query for responsiveness
const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${TableCell}, ${TableHead} {
      padding: 8px;
      font-size: 14px;
    }

    ${ActionButton} {
      padding: 4px 8px;
      font-size: 12px;
    }
  }
`;

const NoBookingsMessage = styled.p`
  color: var(--text-color); // Use your theme color variable
  font-size: 18px;
  margin: 20px 0;
  text-align: center;

  a {
    color: var(--primary-color); // Change to your primary color
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      color: var(--secondary-color); // Change to your secondary color on hover
      text-decoration: none; // Optional: remove underline on hover
    }
  }
`;

const Bookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { user } = useUser();

  const { isLoading, error } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: () => fetchBookings(user.id),
    enabled: !!user,
    onSuccess: (data) => {
      setBookings(data); // Set bookings to local state on success
    },
  });

  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (deletedId) => {
      // Update local state to remove the deleted booking
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.booking_id !== deletedId)
      );
      setIsDeleting(false); // Close the modal after successful deletion
      toast.success(
        `Flight ${selectedBooking.flights.flight_number} has been deleted successfully!`
      );
    },
  });

  const handleDelete = (id) => {
    // Show confirmation modal before deleting
    setSelectedBooking(bookings.find((booking) => booking.booking_id === id));
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    if (selectedBooking) {
      mutation.mutate(selectedBooking.booking_id);
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false); // Close the modal if cancel is clicked
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsViewing(true);
  };

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (error) return <p>Error loading bookings.</p>;

  return (
    <BookingsContainer>
      <h2>Your Bookings</h2>
      <TableWrapper>
        <ResponsiveContainer>
          {bookings.length === 0 ? (
            <NoBookingsMessage>
              No bookings available. Kindly book a flight here{" "}
              <Link to="/book-ticket">Book a Flight</Link>
            </NoBookingsMessage>
          ) : (
            <Table>
              <thead>
                <tr>
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id}>
                    <TableCell>{booking.flights.flight_number}</TableCell>
                    <TableCell>{booking.flights.departure_city}</TableCell>
                    <TableCell>{booking.flights.destination_city}</TableCell>
                    <TableCell>{booking.class}</TableCell>
                    <TableCell>${booking.price}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleView(booking)}>
                        View
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDelete(booking.booking_id)}
                      >
                        Delete
                      </ActionButton>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </ResponsiveContainer>
      </TableWrapper>

      {isViewing && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setIsViewing(false)}
        />
      )}
      {isDeleting && selectedBooking && (
        <DeleteConfirmationModal
          flightNumber={selectedBooking.flights.flight_number}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </BookingsContainer>
  );
};

export default Bookings;
