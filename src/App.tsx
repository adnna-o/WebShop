import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import Favourites from "./Pages/Favourites/Favourites";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import PersonalSettings from "./Components/PersonalSettings/PersonalSettings";
import UserData from "./Components/UserData/UserData";
import Layout from "./Components/layouts/layouts";
import { FAQ } from "./Components/FAQ";
import { Contact } from "./Components/Contact";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import LogIn from "./Pages/LogIn/LogIn";
import SignIn from "./Pages/SignIn/SignIn";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import Colors from "./Pages/Colors/Colors";
import Sizes from "./Pages/Sizes/Sizes";
import Discounts from "./Pages/Discounts/Discounts";
import SendCode from "./Pages/SendCode/SendCode";
import Shop from "./Pages/Shop/Shop";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/:gender" element={<Shop />} />
        <Route path="/all" element={<Shop />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/personalSettings" element={<PersonalSettings />}>
          {/* Ovo je nested ruta */}
          <Route path="userData" element={<UserData />} />
        </Route>
      </Route>

      {/*RUTE ZA ADMINA */}
      <Route path="/adminPanel" element={<AdminPanel />}>
        <Route index element={<Products />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/discounts" element={<Discounts />} />

        <Route path="admin/categories" element={<Categories />} />
        <Route path="admin/brands" element={<Brands />} />
        <Route path="admin/colors" element={<Colors />} />
        <Route path="admin/sizes" element={<Sizes />} />
      </Route>

      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/sendCode" element={<SendCode />} />
    </Routes>
  );
}

export default App;
