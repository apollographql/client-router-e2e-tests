import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DISABLE_DEFER_QUERY = gql`
  query TestQuery {
    allProducts {
      ...DimensionsAndVariation @defer(if: false)
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

export default function DisableDefer() {
  return <Products query={DISABLE_DEFER_QUERY} />;
}
