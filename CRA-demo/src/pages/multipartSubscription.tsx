import React from "react";
import { gql, DocumentNode, useSubscription } from "@apollo/client";

const MULTIPART_SUBSCRIPTION = gql`
  subscription MySubscription {
    aNewDieWasCreated {
      die {
        roll
        sides
        color
      }
    }
  }
`;

function NewDieCreated({ subscription }: { subscription: DocumentNode }) {
  const { loading, error, data } = useSubscription<{
    aNewDieWasCreated: {
      die: {
        color: string;
        roll: number;
        sides: number;
      };
    };
  }>(subscription);

  return (
    <div style={{ marginTop: "1rem" }}>
      {loading ? <p>Loading...</p> : ""}
      {error ? <p>Error :(</p> : ""}
      {data ? (
        <>
          <span
            style={{
              color: data.aNewDieWasCreated.die.color,
            }}
          >
            {data.aNewDieWasCreated.die.color}
          </span>{" "}
          - {data.aNewDieWasCreated.die.roll} -{" "}
          {data.aNewDieWasCreated.die.sides}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default function DuplicateFragmentDeferredFirst() {
  return <NewDieCreated subscription={MULTIPART_SUBSCRIPTION} />;
}