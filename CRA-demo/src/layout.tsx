import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./css/App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function Layout() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>Testing @defer with Apollo Router.</p>
        </header>
        <div className="Grid-column">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Layout;
