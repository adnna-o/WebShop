import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";

import Women from "./Pages/Women/Women";
import Men from "./Pages/Men/Men";
import Children from "./Pages/Children/Children";
import All from "./Pages/All/All";
import Favourites from "./Pages/Favourites/Favourites";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import { FAQ } from "./FAQ";
import { Contact } from "./Components/Contact";
import Layout from "./Components/layouts/Layout";


function App() {
  return (
    <>
     <Routes>
      <Route  element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/children" element={<Children />} />
        <Route path="/all" element={<All />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

     
      </Route>
    </Routes>

    </>
  );
}

export default App;
