import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const NON_DEFERRED_QUERY = gql`
  query TestQuery {
    allProducts {
      ...DimensionsAndVariation
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

export default function NonDeferredQuery() {
  return <Products query={NON_DEFERRED_QUERY} />;
}
