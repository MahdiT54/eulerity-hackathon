import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { SelectionProvider } from "./context/SelectionContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SelectionProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SelectionProvider>
    </ThemeProvider>
  </StrictMode>,
);
