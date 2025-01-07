import { useState } from "react";
import styled from "styled-components";
import { updateBooking } from "../services/bookingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  z-index: 1000;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    padding: 20px;
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
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 16px;
    color: var(--text-color);
  }

  select {
    padding: 8px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;

  &:nth-child(1) {
    background-color: var(--secondary-color);
    color: #fff;

    &:hover {
      background-color: var(--primary-color);
    }
  }

  &:nth-child(2) {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const EditBookingModal = ({ booking, onClose }) => {
  const [updatedClass, setUpdatedClass] = useState(booking.class);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedBooking) => updateBooking(updatedBooking),
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ booking_id: booking.booking_id, class: updatedClass });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <Title>Edit Booking</Title>
        <Form onSubmit={handleSubmit}>
          <label>
            Class:
            <select
              value={updatedClass}
              onChange={(e) => setUpdatedClass(e.target.value)}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </label>
          <ButtonGroup>
            <Button type="submit">Save</Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </>
  );
};

export default EditBookingModal;
