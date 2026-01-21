// Imports the HTML5 backend for react-dnd (handles native drag-and-drop)
import { HTML5Backend } from "react-dnd-html5-backend";

// Imports ReactDOM for rendering React components to the DOM
import ReactDOM from "react-dom/client";

// Imports the provider for enabling drag-and-drop context
import { DndProvider } from "react-dnd";

// Imports the core React library
import React from "react";

// Imports the root App component
import App from "./App";

// Imports global CSS styles
import "./index.css";

// Creates a root React DOM node linked to the HTML element with id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
);
