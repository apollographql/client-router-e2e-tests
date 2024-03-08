import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const USER_QUERY = gql`
  mutation ($userId: ID!) {
    makePayment(userId: $userId) {
      ... @defer {
        id
      }
    }
  }
`;

const variables = {
  userId: "1",
};

const MakePayment = () => {
  const [makePayment, { data, loading, error }] = useMutation(USER_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <div>error.message</div>;
  }
  return (
    <div>
      {!data && !loading && (
        <>
          <button onClick={() => makePayment({ variables })}>
            Make Payment
          </button>
        </>
      )}
      {data && <>{JSON.stringify(data)}</>}
    </div>
  );
};

export default MakePayment;
