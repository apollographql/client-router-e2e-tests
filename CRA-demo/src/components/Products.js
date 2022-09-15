import React from "react";
import { useQuery } from "@apollo/client";

export default function Products({ query, testId }) {
  const { loading, error, data } = useQuery(query);
  return (
    <div data-testid={testId}>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data?.allProducts.map(({ id, sku, dimensions, variation }) => (
        <div key={id}>
          <b>
            {id} - {sku}
          </b>
          <p>{dimensions ? <span>Size: {dimensions.size}</span> : ""}</p>
          <p>
            {variation ? (
              <span>Variation: {`${variation.id} - ${variation.name}`}</span>
            ) : (
              ""
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
