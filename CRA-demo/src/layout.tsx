import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import "./css/App.css";

const link = new BatchHttpLink({
  uri: "http://127.0.0.1:4000/",
  batchMax: 5, // No more than 5 operations per batch
  batchInterval: 20, // Wait no more than 20ms after first batched operation
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function Layout() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>Testing query batching with Apollo Router.</p>
        </header>
        <div className="Grid-column">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Layout;
