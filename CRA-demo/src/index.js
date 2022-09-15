import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/index.css";
import Layout from "./pages/layout";

// Each page is a separate Cypress test case
import DeferredQuery from "./pages/deferred";
import NonDeferredQuery from "./pages/nonDeferred";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/deferred" element={<DeferredQuery />}/>
          <Route path="/non-deferred" element={<NonDeferredQuery />}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
