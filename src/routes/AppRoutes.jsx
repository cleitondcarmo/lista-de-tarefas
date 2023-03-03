import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

export function AppRoutes() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
