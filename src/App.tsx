import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { FAQ } from "./FAQ";
import { Contact } from "./Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq"element={<FAQ/>}/>
        <Route path="/contact"element={<Contact/>}/>

      </Routes>
    </>
  );
}

export default App;
