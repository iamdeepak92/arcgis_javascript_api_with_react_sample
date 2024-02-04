//Added essential tools for building a React app
import React from "react";
import ReactDOM from "react-dom/client";

// Import custom components to create our app's structure and content

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

// Import tools for handling navigation and routing within the app
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wraped everything in React's strict mode for better error handling and potential future features

  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* When someone lands on the main page (/), show them the Home component */}
        <Route path="/" element={<Home />} />
        {/* When someone visits /about, guide them to the About component */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
