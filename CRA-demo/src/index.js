import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/index.css";
import Layout from "./layout";

// Each page is a separate Cypress test case
import Deferred from "./pages/deferred";
import NonDeferred from "./pages/nonDeferred";
import DisableDefer from "./pages/disableDefer";
import DisableDeferNullIf from "./pages/disableDeferNullIf";
import DeferTopLevelQueryField from "./pages/deferTopLevelQueryField";
import NestedDeferredFragments from "./pages/nestedDeferredFragments";
import DuplicateFragmentDeferredFirst from "./pages/duplicateFragmentDeferredFirst";
import DuplicateFragmentDeferredLast from "./pages/duplicateFragmentDeferredLast";
import DeferInlineFragment from "./pages/deferInlineFragment";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/deferred" element={<Deferred />}/>
          <Route path="/non-deferred" element={<NonDeferred />}/>
          <Route path="/disable-defer" element={<DisableDefer />}/>
          <Route path="/disable-defer-null-if" element={<DisableDeferNullIf />}/>
          <Route path="/disable-top-level-query-field" element={<DeferTopLevelQueryField />}/>
          <Route path="/nested-deferred-fragments" element={<NestedDeferredFragments />}/>
          <Route path="/duplicate-fragment-deferred-first" element={<DuplicateFragmentDeferredFirst />}/>
          <Route path="/duplicate-fragment-deferred-last" element={<DuplicateFragmentDeferredLast />}/>
          <Route path="/defer-inline-fragment" element={<DeferInlineFragment />}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
