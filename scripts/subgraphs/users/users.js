const { ApolloOpenTelemetry } = require("supergraph-demo-opentelemetry");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker")
const { randomUUID } = require("crypto");
const { readFileSync } = require("fs");
const gql = require("graphql-tag");

const port = process.env.APOLLO_PORT || 4000;

// Open Telemetry (optional)
if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: "subgraph",
    name: "users",
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    },
  }).setupInstrumentation();
}

////////////////////////
// generate fake data //
////////////////////////

const generateUsers = (numberOfUsers) => {
  faker.seed(1234 * numberOfUsers);
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    let fn = faker.name.firstName();
    let ln = faker.name.lastName();
    users.push({
      id: randomUUID(),
      name: faker.name.fullName({ firstName: fn, lastName: ln }),
      email: faker.internet.exampleEmail(fn, ln),
      username: faker.internet.userName(fn, ln),
      phoneNumber: faker.phone.number(),
      title: faker.name.jobTitle(),
      avatarUrl: faker.internet.avatar(),
    });
  }
  return users;
};

const getSpecificUser = (id) => {
  faker.seed(5678);
  let fn = faker.name.firstName();
  let ln = faker.name.lastName();
  return {
    id,
    name: faker.name.fullName({ firstName: fn, lastName: ln }),
    email: faker.internet.exampleEmail(fn, ln),
    username: faker.internet.userName(fn, ln),
    phoneNumber: faker.phone.number(),
    title: faker.name.jobTitle(),
  };
};

const wait = async (time) => {
  return new Promise((res) => {
    setTimeout(res, time);
  });
};

const typeDefs = gql(readFileSync("./users.graphql", { encoding: "utf-8" }));

const resolvers = {
  Query: {
    users: (p, a, c, i) => {
      return generateUsers(5);
    },
    user: (p, a, c, i) => {
      return getSpecificUser(a.userId);
    },
  },
  Mutation: {
    makePayment: (p, a, c, i) => {
      let u = getSpecificUser(a.userId);
      return {
        id: uuidv4(),
        user: u,
      };
    },
  },
  User: {
    friends: async (p, a, c, i) => {
      console.log(a);
      await wait(a.first * 100);
      return generateUsers(4);
    },
  },
  MakePaymentResult: {
    paymentStatus: async (p, a, c, i) => {
      let pseudoRandom = Math.floor(Math.random() * 100);
      await wait(100 * 10);
      if (pseudoRandom % 2 === 0) {
        return {
          id: uuidv4(),
          billedAmount: Math.random() * 100 + Math.random(),
        };
      } else {
        return {
          id: uuidv4(),
          reason: "bad payment info",
        };
      }
    },
  },
  PaymentStatus: {
    __resolveType: (o, c, i) => {
      if (o.billedAmount) {
        return "PaymentSuccess";
      }
      if (o.reason) {
        return "PaymentFailed";
      }
      return null;
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
