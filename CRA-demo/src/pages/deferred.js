import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";
import { MY_FRAGMENT } from "../fragments";

const DEFERRED_QUERY = gql`
  query deferVariation {
    allProducts {
      ...DimensionsAndVariation @defer
      sku
      id
    }
  }
  ${MY_FRAGMENT}
`;

export default function DeferredQuery() {
  return <Products query={DEFERRED_QUERY} />;
}
