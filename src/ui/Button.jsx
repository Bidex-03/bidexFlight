import styled from "styled-components";
import PropTypes from "prop-types";

// Styled-component for the button
const StyledButton = styled.button`
  padding: ${({ size }) => (size === "large" ? "15px 30px" : "10px 20px")};
  font-size: ${({ size }) => (size === "large" ? "1.2rem" : "1rem")};
  background-color: ${({ bgColor }) => bgColor || "var(--primary-color)"};
  color: ${({ textColor }) => textColor || "#fff"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  display: inline-block;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) =>
      hoverColor || "var(--secondary-color)"};
  }

  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
  }
`;

// Button component with props
const Button = ({
  children,
  onClick,
  size,
  bgColor,
  textColor,
  hoverColor,
  fullWidth,
  disabled,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      size={size}
      bgColor={bgColor}
      textColor={textColor}
      hoverColor={hoverColor}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

// Prop types for the button
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "large"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};

// Default props for the button
Button.defaultProps = {
  onClick: () => {},
  size: "small",
  bgColor: "var(--primary-color)",
  textColor: "#fff",
  hoverColor: "var(--secondary-color)",
  fullWidth: false,
  disabled: false,
};

export { Button };
