# About `@apollo/client` E2E tests with Cypress

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It runs a series of end-to-end tests with [Cypress](https://www.cypress.io/) [inspired by the `graphql-js` `@defer` test suite](https://github.com/graphql/graphql-js/blob/main/src/execution/__tests__/defer-test.ts).

Each test case corresponds to a single page in the demo app inside of `CRA-demo/src/pages`. Pages contain the test query they execute via `useQuery` and are imported inside of `CRA-demo/src/index.js` where each page is rendered at a corresponding route.

The tests can be found in `CRA-demo/cypress/e2e/defer.cy.js`: each `it` block renders a single route and makes assertions based on the expected output as `@apollo/client@beta` is used to parse `apollo-router`'s multipart response and render the chunks incrementally.

## Available Scripts

In this project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Starts the development server and runs Cypress tests in headless mode via `cypress run`.

### `npm run test:local`

~Starts the development server and runs Cypress tests in a headful browser via `cypress open`. This opens the Cypress GUI where you can run, re-run and inspect the E2E test results.~
