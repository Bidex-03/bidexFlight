import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { supabase } from "../services/supabase";
import GlobalStyles from "../styles/GlobalStyles";
import toast from "react-hot-toast";
import { useUser } from "../authentication/useUser";
import LoadingSpinner from "../ui/Spinner";
import { FullPage } from "../ui/ProtectedRoute";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";

const Container = styled.div`
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);

  h1 {
    margin-bottom: 20px;
    color: var(--primary-color);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    font-weight: bold;
  }

  input,
  select {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 16px;
    outline: red;
  }

  select {
    background-color: var(--background-color);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary-color);
  }

  &:disabled {
    background-color: var(--border-color);
    cursor: not-allowed;
  }
`;

const BookTicket = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useUser();
  const priceRef = useRef(null); // UseRef to update the price field dynamically
  const classRef = useRef(null); // Reference to the class input
  const [seatNumber, setSeatNumber] = useState(""); // Store auto-assigned seat number
  let economyPrice = useRef(0); // Reference to hold the economy price

  const { data: flights, isLoading: flightsLoading } = useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
  });

  const { mutate: bookTicket, isLoading: bookingLoading } = useMutation({
    mutationFn: bookFlight,
    onSuccess: () => {
      queryClient.invalidateQueries("flights");
      toast.success("Flight booked successfully!");
      navigate("/bookings");
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast.error("Error booking the flight");
    },
  });

  if (flightsLoading) {
    return (
      <FullPage>
        <LoadingSpinner />
      </FullPage>
    );
  }

  // Function to update the price based on selected class
  const updatePrice = () => {
    const selectedClass = classRef.current.value;
    if (selectedClass === "business") {
      priceRef.current.value =
        economyPrice.current + economyPrice.current * 0.75;
    } else {
      priceRef.current.value = economyPrice.current;
    }
  };

  // Function to generate a unique seat number
  const generateUniqueSeatNumber = (bookedSeats) => {
    const seatPrefix = ["A", "B", "C", "D", "E", "F"];
    const totalRows = 30; // Assume 30 rows
    for (let row = 1; row <= totalRows; row++) {
      for (let prefix of seatPrefix) {
        const seat = `${prefix}${row}`;
        if (!bookedSeats.includes(seat)) {
          return seat; // Return the first available seat
        }
      }
    }
    return null; // No available seats
  };

  const handleFlightChange = async (e) => {
    const flightId = e.target.value;

    // Reset other fields when a new flight is selected
    setSeatNumber(""); // Reset seat number
    classRef.current.value = "economy"; // Reset class to "economy"
    priceRef.current.value = ""; // Reset price field

    if (!flightId) return;

    // Fetch the selected flight's details to get the economy price
    const { data: flight, error: flightError } = await supabase
      .from("flights")
      .select("price")
      .eq("flight_id", flightId)
      .single();

    if (flightError) {
      console.error("Error fetching flight price:", flightError);
      toast.error("Error fetching flight price");
      return;
    }

    economyPrice.current = flight.price;
    priceRef.current.value = flight.price;

    // Fetch booked seats for the selected flight
    const { data: bookedSeats, error: seatError } = await supabase
      .from("bookings")
      .select("seat_number")
      .eq("flight_id", flightId);

    if (seatError) {
      console.error("Error fetching booked seats:", seatError);
      toast.error("Error fetching booked seats");
      return;
    }

    // Extract the seat numbers from the bookings and generate a unique seat
    const bookedSeatNumbers = bookedSeats.map((seat) => seat.seat_number);
    const uniqueSeat = generateUniqueSeatNumber(bookedSeatNumbers);

    if (!uniqueSeat) {
      toast.error("No available seats for this flight.");
      return;
    }

    // Set the unique seat number
    setSeatNumber(uniqueSeat);
  };

  const handleBookTicket = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You must be logged in to book a flight.");
      return;
    }

    const formData = new FormData(e.target);
    const flightId = formData.get("flight_id");
    const ticketClass = formData.get("class");
    const price = formData.get("price");

    bookTicket({
      flight_id: flightId,
      seat_number: seatNumber, // Use auto-assigned seat number
      user_id: user.id,
      class: ticketClass,
      price: parseFloat(price),
    });
  };

  return (
    <Container>
      <GlobalStyles />
      <h1>Book a Flight</h1>

      <form onSubmit={handleBookTicket}>
        <label htmlFor="flight_id">Select Flight:</label>
        <select
          id="flight_id"
          name="flight_id"
          required
          onChange={handleFlightChange}
        >
          <option value="">Select Route</option>
          {flights.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              {flight.departure_city} → {flight.destination_city} (
              {flight.departure_time})
            </option>
          ))}
        </select>

        <label htmlFor="seat_number">Seat Number (Auto-assigned):</label>
        <input
          type="text"
          id="seat_number"
          name="seat_number"
          placeholder="Seat Number"
          value={seatNumber}
          readOnly
        />

        <label htmlFor="class">Class:</label>
        <select
          id="class"
          name="class"
          required
          ref={classRef}
          onChange={updatePrice}
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
        </select>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          readOnly
          ref={priceRef}
        />
        
        <Button type="submit" disabled={bookingLoading}>
          {bookingLoading ? <SpinnerMini /> : "Book Ticket"}
        </Button>
      </form>
    </Container>
  );
};

// Fetch all available flights
const fetchFlights = async () => {
  const { data, error } = await supabase.from("flights").select("*");
  if (error) throw new Error(error.message);
  return data;
};

// Mutation to book a flight
const bookFlight = async ({
  flight_id,
  seat_number,
  user_id,
  class: ticketClass,
  price,
}) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ flight_id, seat_number, user_id, class: ticketClass, price }]);

  if (error) throw new Error(error.message);
  return data;
};

export default BookTicket;