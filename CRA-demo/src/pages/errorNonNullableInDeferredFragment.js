import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const NON_NULLABLE_ERROR_IN_DEFERRED_FRAGMENT = gql`
  query TestQuery {
    allProducts {
      ...ErrorFragment @defer
      sku
      id
    }
  }
  fragment ErrorFragment on Product {
    nonNullErrorField
  }
`;

export default function NonNullableErrorInDeferredFragment() {
  return <Products query={NON_NULLABLE_ERROR_IN_DEFERRED_FRAGMENT} />;
}
