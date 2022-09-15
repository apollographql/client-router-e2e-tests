import { gql } from '@apollo/client';

export const MY_FRAGMENT = gql`
  fragment DimensionsAndVariation on Product {
    dimensions {
      size
    }
    variation {
      id
      name
    }
  }
`;