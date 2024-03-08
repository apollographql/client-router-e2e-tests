import React from "react";
import { gql, DocumentNode, useSubscription } from "@apollo/client";

const MULTIPART_SUBSCRIPTION = gql`
  subscription Subscription {
    countdown(from: 10)
  }
`;

function NewDieCreated({ subscription }: { subscription: DocumentNode }) {
  const { loading, error, data } = useSubscription(subscription);
  console.log(data);
  return (
    <div>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data ? <p>Countdown: {data.countdown}</p> : ""}
    </div>
  );
}

export default function DuplicateFragmentDeferredFirst() {
  return <NewDieCreated subscription={MULTIPART_SUBSCRIPTION} />;
}
