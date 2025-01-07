import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #0f4c75;
    --secondary-color: #3282b8;
    --background-color: #f5f5f5;
    --border-color: #ccc;
    --black-color: rgba(0, 0, 0, 0.1);
    --text-color: #333;
    --error-color: #d32f2f;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
  }
`;

export default GlobalStyles;
