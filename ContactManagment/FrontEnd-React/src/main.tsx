import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Registration from "./Signin/Registration.tsx";
import Login from "./Signin/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <App /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
