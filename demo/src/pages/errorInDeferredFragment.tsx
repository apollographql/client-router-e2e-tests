import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const ERRORS_IN_DEFERRED_FRAGMENT = gql`
  query TestQuery {
    allProducts {
      ...ErrorFragment @defer
      sku
      id
    }
  }
  fragment ErrorFragment on Product {
    errorField
  }
`;

export default function ErrorInDeferredFragment() {
  return <Products query={ERRORS_IN_DEFERRED_FRAGMENT} />;
}
