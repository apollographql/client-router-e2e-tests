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
import ErrorAsyncNonNullableInDeferredFragment from "./pages/errorAsyncNonNullableInDeferredFragment";
import ErrorInDeferredFragment from "./pages/errorInDeferredFragment";
import ErrorNonNullableInDeferredFragment from "./pages/errorNonNullableInDeferredFragment";
import ErrorNonNullableOutsideDeferredFragment from "./pages/errorNonNullableOutsideDeferredFragment";
import ErrorTopLevelQueryField from "./pages/errorTopLevelQueryField";
import DeferredMutation from "./pages/deferredMutation";

const root = ReactDOM.createRoot(document.getElementById("root") as any);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/deferred" element={<Deferred />} />
          <Route path="/non-deferred" element={<NonDeferred />} />
          <Route path="/disable-defer" element={<DisableDefer />} />
          <Route
            path="/disable-defer-null-if"
            element={<DisableDeferNullIf />}
          />
          <Route
            path="/defer-top-level-query-field"
            element={<DeferTopLevelQueryField />}
          />
          <Route
            path="/nested-deferred-fragments"
            element={<NestedDeferredFragments />}
          />
          <Route
            path="/duplicate-fragment-deferred-first"
            element={<DuplicateFragmentDeferredFirst />}
          />
          <Route
            path="/duplicate-fragment-deferred-last"
            element={<DuplicateFragmentDeferredLast />}
          />
          <Route
            path="/defer-inline-fragment"
            element={<DeferInlineFragment />}
          />
          <Route
            path="/error-async-non-nullable-in-deferred-fragment"
            element={<ErrorAsyncNonNullableInDeferredFragment />}
          />
          <Route
            path="/error-in-deferred-fragment"
            element={<ErrorInDeferredFragment />}
          />
          <Route
            path="/error-non-nullable-in-deferred-fragment"
            element={<ErrorNonNullableInDeferredFragment />}
          />
          <Route
            path="/error-non-nullable-outside-deferred-fragment"
            element={<ErrorNonNullableOutsideDeferredFragment />}
          />
          <Route
            path="/error-top-level-query-field"
            element={<ErrorTopLevelQueryField />}
          />
          <Route path="/deferred-mutation" element={<DeferredMutation />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
