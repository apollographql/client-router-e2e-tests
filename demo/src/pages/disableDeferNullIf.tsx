import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DISABLE_DEFER_NULL_IF_QUERY = gql`
  query TestQuery($shouldDefer: Boolean) {
    allProducts {
      ...DimensionsAndVariation @defer(if: $shouldDefer)
      sku
      id
    }
  }
  fragment DimensionsAndVariation on Product {
    dimensions {
      size
    }
    variation {
      id
      name
    }
  }
`;

export default function DisableDeferNullIf() {
  return <Products query={DISABLE_DEFER_NULL_IF_QUERY} />;
}
