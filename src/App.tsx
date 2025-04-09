import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { FAQ } from "./FAQ";
import { Contact } from "./Components/Contact";
import Layout from "./Components/layouts/Layout";

function App() {
  return (
    <>
     <Routes>
      <Route  element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
