import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const NON_NULLABLE_ERROR_OUTSIDE_DEFERRED_FRAGMENT = gql`
  query TestQuery {
    allProducts {
      nonNullErrorField
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

export default function NonNullableErrorOutsideDeferredFragment() {
  return <Products query={NON_NULLABLE_ERROR_OUTSIDE_DEFERRED_FRAGMENT} />;
}
