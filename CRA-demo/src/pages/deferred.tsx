import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DEFERRED_QUERY = gql`
  query TestQuery {
    allProducts {
      ...DimensionsAndVariation @defer
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

export default function DeferredQuery() {
  return <Products query={DEFERRED_QUERY} />;
}
