import React from "react";
import { useQuery } from "@apollo/client";

export default function Products({ query }) {
  const { loading, error, data } = useQuery(query);
  return (
    <div>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data?.allProducts.map(({ id, sku, dimensions, variation }) => (
        <div key={id}>
          {id && sku ? (
            <b>
              {id} - {sku}
            </b>
          ) : (
            ""
          )}
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
