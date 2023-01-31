import React from "react";
import { DocumentNode, useQuery } from "@apollo/client";

export default function Products({ query }: { query: DocumentNode }) {
  const { loading, error, data } = useQuery<{
    allProducts: {
      id: string;
      sku: string;
      dimensions?: { size: string };
      variation?: { id: string; name: string };
    }[];
  }>(query);

  return (
    <div>
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
