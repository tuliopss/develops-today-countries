import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Container from "./components/Container/Container";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Home />
      </Container>
    </BrowserRouter>
  );
}

export default App;
