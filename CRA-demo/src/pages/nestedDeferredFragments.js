import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const NESTED_DEFER_QUERY = gql`
  query TestQuery {
    allProducts {
      ...Dimensions @defer(label: "DeferTop")
      sku
      id
    }
  }
  fragment Dimensions on Product {
    dimensions {
      size
    }
    ...Variation @defer(label: "DeferNested")
  }
  fragment Variation on Product {
    variation {
      id
      name
    }
  }
`;

export default function NestedDeferredFragments() {
  return <Products query={NESTED_DEFER_QUERY} />;
}
