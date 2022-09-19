import React from "react";
import { gql } from "@apollo/client";
import Products from "../components/Products";

const ERROR_TOP_LEVEL_QUERY_FIELD = gql`
  query TestQuery {
    ...QueryFragment @defer
  }
  fragment QueryFragment on Query {
    allProducts {
      errorField
    }
  }
`;

export default function ErrorTopLevelQueryField() {
  return <Products query={ERROR_TOP_LEVEL_QUERY_FIELD} />;
}
