import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalStateProvider } from "./Contexts/Global-state-context";
import { FirebaseProvider } from "./Contexts/Firebase-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalStateProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </GlobalStateProvider>,
);
