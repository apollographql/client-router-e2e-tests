import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DUPLICATE_FRAGMENT_DEFERRED_FIRST = gql`
  query TestQuery {
    allProducts {
      sku
      id
      ...Variation @defer(label: "DeferTop")
      ...Variation
    }
  }
  fragment Variation on Product {
    variation {
      id
      name
    }
  }
`;

export default function DuplicateFragmentDeferredFirst() {
  return <Products query={DUPLICATE_FRAGMENT_DEFERRED_FIRST} />;
}
