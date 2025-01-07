import { supabase } from "./supabase";

export const fetchBookings = async (userId) => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      booking_id,
      class,
      price,
      flight_id,
      flights:flight_id (
        flight_number,
        departure_city,
        destination_city,
        departure_time,
        arrival_time,
        gate_number
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Error fetching bookings");
  }

  return data;
};

// Update a booking
export const updateBooking = async (updatedBooking) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      class: updatedBooking.class,
    })
    .eq("booking_id", updatedBooking.booking_id);

  if (error) {
    console.error("Error updating booking:", error);
    throw new Error("Error updating booking");
  }

  return data;
};

export const deleteBooking = async (bookingId) => {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("booking_id", bookingId);

  console.log("Supabase Response:", { data, error }); // Log the response

  if (error) {
    console.error("Error deleting booking:", error.message); // Log the error if any
    throw new Error("Error deleting booking");
  }

  console.log("Booking deleted successfully:", data); // Log the success message with data
  return bookingId; // Return the booking ID for further use
};
