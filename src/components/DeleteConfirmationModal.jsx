import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%; /* Adjusts width for smaller screens */
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px; /* Adjust padding for mobile screens */
  }
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px; /* Smaller font size for mobile */
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 8px 16px; /* Smaller button size for mobile */
    font-size: 14px; /* Smaller font size for mobile */
  }
`;

const CancelButton = styled(Button)`
  background-color: grey;
  color: white;
`;

const ConfirmButton = styled(Button)`
  background-color: red;
  color: white;
`;

const DeleteConfirmationModal = ({ flightNumber, onConfirm, onCancel }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalTitle>
          Are you sure you want to delete flight-{flightNumber}?
        </ModalTitle>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Okay</ConfirmButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default DeleteConfirmationModal;
