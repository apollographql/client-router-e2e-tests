import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";
import { MY_FRAGMENT } from "../fragments";

const NON_DEFERRED_QUERY = gql`
  query deferVariation {
    allProducts {
      ...DimensionsAndVariation
      sku
      id
    }
  }
  ${MY_FRAGMENT}
`;

export default function NonDeferredQuery() {
  return <Products query={NON_DEFERRED_QUERY} />;
}
