import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const DEFER_TOP_LEVEL_QUERY_FIELD = gql`
  query TestQuery {
    ...QueryFragment @defer
  }
  fragment QueryFragment on Query {
    allProducts {
      dimensions {
        size
      }
      variation {
        id
        name
      }
      sku
      id
    }
  }
`;

export default function DeferTopLevelQueryField() {
  return <Products query={DEFER_TOP_LEVEL_QUERY_FIELD} />;
}
