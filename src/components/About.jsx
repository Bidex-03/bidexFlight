import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AboutContainer = styled.div`
  padding: 40px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--secondary-text-color);
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>About Us</Title>

      <Section>
        <Paragraph>
          Welcome to <strong>BidexFlight</strong>, where we redefine your travel
          experience. Our airline management system is designed to provide
          seamless booking, personalized services, and efficient management of
          flight schedules, ensuring a smooth and stress-free journey for every
          customer.
        </Paragraph>
      </Section>

      <Section>
        <Title>Our Mission</Title>
        <Paragraph>
          Our mission is to make air travel simple, affordable, and accessible
          to everyone. We are committed to providing excellent customer
          satisfaction, innovation through technology, and the highest safety
          standards.
        </Paragraph>
      </Section>

      <Section>
        <Title>Our Vision</Title>
        <Paragraph>
          We envision a world where air travel is no longer a hassle but an
          opportunity to explore, create memories, and connect with loved ones.
          We aim to become a leader in air travel solutions, known for our
          exceptional customer service.
        </Paragraph>
      </Section>

      <Section>
        <Title>Why Choose Us?</Title>
        <Paragraph>
          At <strong>BidexFlight</strong>, we offer a seamless booking experience,
          on-time flights, affordable travel, and world-class service. Whether
          you're traveling for business or leisure, we ensure you get the best
          experience.
        </Paragraph>
      </Section>

      <Section>
        <Title>Sustainability and Safety</Title>
        <Paragraph>
          We prioritize sustainability and safety in all aspects of our
          operations. By adopting sustainable practices and adhering to
          international safety standards, we ensure you fly responsibly and
          securely.
        </Paragraph>
      </Section>

      <Section>
        <Title>Contact Us</Title>
        <Paragraph>
          For inquiries, feel free to contact us via our{" "}
          <Link to="/contact">Contact Page</Link> or email us at support@BidexFlight.com.
          We're always ready to help with your travel needs.
        </Paragraph>
      </Section>
    </AboutContainer>
  );
};

export default About;
