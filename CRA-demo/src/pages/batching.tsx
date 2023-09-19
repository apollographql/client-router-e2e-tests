import { gql, useQuery } from "@apollo/client";

const ME_QUERY_ID = gql`
  query MeQueryId {
    me {
      id
    }
  }
`;

const ME_QUERY_NAME = gql`
  query MeQueryName {
    me {
      name
    }
  }
`;

export default function Index() {
  const { data: firstData } = useQuery(ME_QUERY_ID);
  const { data: secondData } = useQuery(ME_QUERY_NAME);

  return (
    <div>
      id: {firstData?.me.id}
      name: {secondData?.me.name}
    </div>
  );
}
