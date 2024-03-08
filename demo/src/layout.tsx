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
          <p>E2E Testing with Apollo Client and Apollo Router 🚀</p>
        </header>
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default Layout;
