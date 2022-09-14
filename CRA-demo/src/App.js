import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const MY_FRAGMENT = gql`
  fragment MyFragment on Product {
    dimensions {
      size
    }
    variation {
      id
      name
    }
  }
`;

// a deferred query
const DEFERRED_QUERY = gql`
  query deferVariation {
    allProducts {
      ...MyFragment @defer
      sku
      id
    }
  }
  ${MY_FRAGMENT}
`;

// a non-deferred query
const NON_DEFERRED_QUERY = gql`
  query deferVariation {
    allProducts {
      ...MyFragment
      sku
      id
    }
  }
  ${MY_FRAGMENT}
`;

function DeferredProducts() {
  return Render(DEFERRED_QUERY, 'deferred');
}

function NonDeferredProducts() {
  return Render(NON_DEFERRED_QUERY, 'nonDeferred');
}

function Render(query, testId) {
  const { loading, error, data } = useQuery(query);
  return (
    <div data-testid={testId}>
      {loading ? <p>Loading...</p> : ''}
      {error ? <p>Error :(</p> : ''}
      {data?.allProducts.map(({ id, sku, dimensions, variation }) => (
        <div key={id}>
          <b>
            {id} - {sku}
          </b>
          <p>
            {dimensions ? <span>Size: {dimensions.size}</span> : ''}
          </p>
          <p>
            {variation ? <span>Variation: {`${variation.id} - ${variation.name}`}</span> : ''}
          </p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>Testing @defer with Apollo Router.</p>
        </header>
        <div className="Grid-column">
          <div>
            <h2 className="Nondeferred-query">A non-deferred query ⏲️</h2>
            <NonDeferredProducts />
          </div>
          <div>
            <h2 className="Deferred-query">A deferred query 🚀</h2>
            <DeferredProducts />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
