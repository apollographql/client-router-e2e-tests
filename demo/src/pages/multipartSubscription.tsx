import React from "react";
import { gql, DocumentNode, useSubscription } from "@apollo/client";

const MULTIPART_SUBSCRIPTION = gql`
  subscription Subscription {
    productUpdate {
      id
    }
  }
`;

function NewDieCreated({ subscription }: { subscription: DocumentNode }) {
  const { loading, error, data } = useSubscription(subscription);

  return (
    <div>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data ? <p>New product: {data.productUpdate.id}</p> : ""}
    </div>
  );
}

export default function DuplicateFragmentDeferredFirst() {
  return <NewDieCreated subscription={MULTIPART_SUBSCRIPTION} />;
}
