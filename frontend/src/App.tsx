import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Container from "./components/Container/Container";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryInfo from "./pages/CountryInfo/CountryInfo";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/countryInfo/:countryCode' element={<CountryInfo />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
