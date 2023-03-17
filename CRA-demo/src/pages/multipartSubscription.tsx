import React from "react";
import randomColor from "randomcolor";
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

  let colors;
  if (data) {
    colors = randomColor({
      hue: data.aNewDieWasCreated.die.color,
      count: data.aNewDieWasCreated.die.roll,
    });
  }

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
            Color: {data.aNewDieWasCreated.die.color}
          </span>{" "}
          Number: {data.aNewDieWasCreated.die.roll}
          <div style={{ margin: '2rem 10rem' }}>
            {colors?.map((color, i) => {
              return (
                <span
                  key={`${color}-${i}`}
                  style={{
                    background: color,
                    width: "1.5em",
                    height: "1.5em",
                    borderRadius: "50%",
                    display: "block",
                    textIndent: "-1000px",
                    float: "left",
                    overflow: "hidden",
                    margin: "0 1em 1em 0",
                  }}
                >
                  #ff7856
                </span>
              );
            })}
          </div>
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
