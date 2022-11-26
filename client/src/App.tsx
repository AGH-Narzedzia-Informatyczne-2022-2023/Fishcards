import React from "react";
import { ThemeProvider } from "styled-components";
import Navbar from "./Components/Global/Navbar";
import GlobalStyle from "./Components/Global/Styles/GlobalStyle";
import Collection from "./pages/Collection";
import { defaultTheme } from "./Utils/themes";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <GlobalStyle />
      <Collection />
    </ThemeProvider>
  );
}

export default App;
