import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";
import { MY_FRAGMENT } from "../fragments";

const DISABLE_DEFER_QUERY = gql`
  query deferVariation {
    allProducts {
      ...DimensionsAndVariation @defer(if: false)
      sku
      id
    }
  }
  ${MY_FRAGMENT}
`;

export default function NonDeferredQuery() {
  return <Products query={DISABLE_DEFER_QUERY} />;
}
