import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const ContactInfo = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }

  .contact-details {
    font-weight: bold;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <h1>Contact Us</h1>
        <p className="contact-details">Email: support@BidexFlight.com</p>
        <p className="contact-details">Phone: (123) 456-7890</p>
        <p>We're available 24/7 to assist you!</p>
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact;
