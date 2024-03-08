import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DUPLICATE_FRAGMENT_DEFERRED_LAST = gql`
  query TestQuery {
    allProducts {
      sku
      id
      ...Variation
      ...Variation @defer(label: "DeferTop")
    }
  }
  fragment Variation on Product {
    variation {
      id
      name
    }
  }
`;

export default function DuplicateFragmentDeferredLast() {
  return <Products query={DUPLICATE_FRAGMENT_DEFERRED_LAST} />;
}
