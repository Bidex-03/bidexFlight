import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
// import heroImg from "../assets/hero-image.jpg"
import heroImg from "../assets/hero-image.webp";

// Styled-components for the landing page sections
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
`;

const HeroSection = styled.section`
  width: 100%;
  height: 80vh;
  background: url(${heroImg}) no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--background-color);
  text-align: center;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 50px 20px;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .features {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .feature-card {
      background-color: var(--background-color);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 4px 6px var(--black-color);
      flex: 1;
      min-height: 150px;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
        color: var(--text-color);
      }
    }
  }
`;

const CTASection = styled.section`
  background-color: var(--secondary-color);
  color: var(--background-color);
  padding: 50px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <h1>Fly with Comfort & Safety</h1>
        <p>Your adventure starts here. Book your flight today!</p>
        <Button onClick={() => navigate("/book-ticket")}>Book a Flight</Button>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <h2>Our Services</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Book Flights</h3>
            <p>
              Book your next flight with ease using our seamless booking system.
            </p>
          </div>
          <div className="feature-card">
            <h3>Customer Support</h3>
            <p>Our 24/7 customer support ensures you get the help you need.</p>
          </div>
        </div>
      </FeaturesSection>

      {/* Call to Action Section */}
      <CTASection>
        <h2>Ready to Take Off?</h2>
        <Button size="large" onClick={() => navigate("/book-ticket")}>
          Book Now
        </Button>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
