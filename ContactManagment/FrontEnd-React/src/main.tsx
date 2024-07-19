import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Registration from "./Signin/Registration.tsx";
import Login from "./Signin/Login.tsx";
import Benefits from "./components/Benefits.tsx";
import ProfileEdit from "./components/Edit-Profile/ProfileEdit.tsx";
import ProfilePage from "./components/Edit-Profile/ProfilePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <App /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfilePage/>} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);
