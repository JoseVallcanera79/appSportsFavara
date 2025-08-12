import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ReservaProvider } from "./context/ReservaContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx"; // <-- Importamos el nuevo provider
import App from "../App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReservaProvider>
          <UsersProvider>
            <App />
          </UsersProvider>
        </ReservaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
