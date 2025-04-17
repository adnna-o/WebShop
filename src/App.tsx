import React from "react";
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
import PersonalSettings from "./Components/PersonalSettings/PersonalSettings";
import UserData from "./Components/UserData/UserData";
import Layout from "./Components/layouts/layouts";
import { FAQ } from "./Components/FAQ";
import { Contact } from "./Components/Contact";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

function App() {
  return (
  
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
        <Route path="/personalSettings" element={<PersonalSettings />}>
        {/* Ovo je nested ruta */}
        <Route path="userData" element={<UserData />} />
        </Route>
        <Route path="/adminPanel" element={<AdminPanel />} />
      </Route>
    </Routes>

  );
}

export default App;
