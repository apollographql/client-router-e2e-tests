import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DEFER_INLINE_FRAGMENT = gql`
  query TestQuery {
    allProducts {
      ... on Product @defer {
        dimensions {
          size
        }
        variation {
          id
          name
        }
      }
      sku
      id
    }
  }
`;

export default function DeferInlineFragment() {
  return <Products query={DEFER_INLINE_FRAGMENT} />;
}
