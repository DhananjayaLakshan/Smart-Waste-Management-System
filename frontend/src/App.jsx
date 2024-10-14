import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footers from "./components/Footer";
import SignUp from "./pages/SignUp";
import Signin from "./pages/SignIn";
import About from "./pages/About";
import ScheduleCollection from "./pages/ScheduleCollection";
import QRPage from "./pages/QRPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/schedule/collection" element={<ScheduleCollection />} />
        <Route path="/qr/scan" element={<QRPage />} />
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}
