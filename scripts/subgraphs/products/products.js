const { ApolloOpenTelemetry } = require("supergraph-demo-opentelemetry");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { readFileSync } = require("fs");
const gql = require("graphql-tag");

const port = process.env.APOLLO_PORT || 4000;

// Open Telemetry (optional)
if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: "subgraph",
    name: "products",
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    },
  }).setupInstrumentation();
}

const products = [
  {
    id: "apollo-federation",
    sku: "federation",
    package: "@apollo/federation",
    oldField: "deprecated",
  },
  { id: "apollo-studio", sku: "studio", package: "", oldField: "deprecated" },
  {
    id: "apollo-client",
    sku: "client",
    package: "@apollo/client",
    oldField: "deprecated",
  },
];

const variationByProduct = [
  { id: "apollo-federation", variation: { id: "OSS", name: "platform" } },
  { id: "apollo-studio", variation: { id: "platform", name: "platform-name" } },
  { id: "apollo-client", variation: { id: "OSS", name: "client" } },
];

const typeDefs = gql(readFileSync("./products.graphql", { encoding: "utf-8" }));
const resolvers = {
  Query: {
    allProducts: (_, args, context) => {
      return products;
    },
    product: (_, args, context) => {
      return products.find((p) => p.id == args.id);
    },
  },
  ProductItf: {
    __resolveType(obj, context, info) {
      return "Product";
    },
  },
  Product: {
    variation: (reference) => {
      return new Promise(
        (r) =>
          setTimeout(() => {
            if (reference.id) {
              const variation = variationByProduct.find(
                (p) => p.id == reference.id
              ).variation;
              r(variation);
            }
            r({ id: "defaultVariation", name: "default variation" });
          }, 2000) // artificial delay of 2s
      );
    },
    dimensions: () => {
      return { size: "1", weight: 1 };
    },
    errorField: () => {
      throw new Error("Error field");
    },
    nonNullErrorField: () => {
      return null;
    },
    promiseNonNullErrorField: () => {
      return Promise.resolve(null);
    },
    createdBy: (reference) => {
      return { email: "support@apollographql.com", totalProductsCreated: 1337 };
    },
    reviewsScore: () => {
      return 4.5;
    },
    __resolveReference: (reference) => {
      if (reference.id) return products.find((p) => p.id == reference.id);
      else if (reference.sku && reference.package)
        return products.find(
          (p) => p.sku == reference.sku && p.package == reference.package
        );
      else return { id: "rover", package: "@apollo/rover", ...reference };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port },
})
  .then(({ url }) => {
    console.log(`🚀 Users subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
