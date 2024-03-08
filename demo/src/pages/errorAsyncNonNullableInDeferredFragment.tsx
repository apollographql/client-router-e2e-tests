import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const ASYNC_NON_NULLABLE_ERROR_IN_DEFERRED_FRAGMENT = gql`
  query TestQuery {
    allProducts {
      ...ErrorFragment @defer
      sku
      id
    }
  }
  fragment ErrorFragment on Product {
    promiseNonNullErrorField
  }
`;

export default function AsyncNonNullableErrorInDeferredFragment() {
  return <Products query={ASYNC_NON_NULLABLE_ERROR_IN_DEFERRED_FRAGMENT} />;
}
