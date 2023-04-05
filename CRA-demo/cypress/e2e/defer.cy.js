describe("@defer tests", () => {
  it("Can execute query without @defer", () => {
    cy.visit("/non-deferred");
    // the products are returned by our subgraph with a 2000ms delay
    // we'll wait just under 2000ms to check that the
    // query is still pending in its entirety (since @defer is absent)
    cy.findByText(/loading/i).should("exist");
    cy.wait(2000);
    cy.findByText(/apollo-federation/i, { timeout: 1 }).should("not.exist");
    cy.wait(1500);
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L106
  it("Can defer fragments containing scalar types", () => {
    cy.visit("/deferred");
    // for the deferred query, we can see the sku + id (fast fields)
    // already rendered...
    // and after waiting >2s the deferred fields are present
    cy.findByText(/apollo-federation/i, { timeout: 1000 }).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L144
  it("Can disable defer using if argument", () => {
    cy.visit("/disable-defer");
    // defer is disabled so entire query should pend for >2s
    cy.findByText(/loading/i).should("exist");
    cy.wait(2000);
    cy.findByText(/apollo-federation/i, { timeout: 1 }).should("not.exist");
    cy.wait(1500);
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L271
  it("Can defer a fragment within an already deferred fragment", () => {
    cy.visit("/nested-deferred-fragments");
    cy.findByText(/apollo-federation/i, { timeout: 1000 }).should("exist");
    cy.findByText(/apollo-studio/i).should("exist");
    // because of nested @defer directives,
    // the fast data in the first @defer fragment comes back quickly
    cy.findAllByText(/size: 1/i).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L398
  it("Can defer an inline fragment", () => {
    cy.visit("/defer-inline-fragment");
    cy.findByText(/apollo-federation/i, { timeout: 1000 }).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L321
  it("Can defer a fragment that is also not deferred, deferred fragment is first", () => {
    cy.visit("/duplicate-fragment-deferred-first");
    cy.findByText(/loading/i).should("exist");
    // when the query has the same fragment twice, once with @defer and once without
    // it also effectively behaves like a non-deferred query, since the first chunk will
    // contain the un-deferred fragment, and the second chunk the deferred fragment
    cy.wait(1500);
    cy.findByText(/apollo-federation/i, { timeout: 1 }).should("not.exist");
    cy.wait(1500);
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L359
  it("Can defer a fragment that is also not deferred, non-deferred fragment is first", () => {
    cy.visit("/duplicate-fragment-deferred-last");
    cy.findByText(/loading/i).should("exist");
    // when the query has the same fragment twice, once with @defer and once without
    // it also effectively behaves like a non-deferred query, since the first chunk will
    // contain the un-deferred fragment, and the second chunk the deferred fragment
    cy.wait(1500);
    cy.findByText(/apollo-federation/i, { timeout: 1 }).should("not.exist");
    cy.wait(1500);
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L424
  it("Handles errors thrown in deferred fragments", () => {
    cy.visit("/error-in-deferred-fragment");
    cy.findByText(/loading/i).should("exist");
    cy.findByText(/Error :\(/i).should("exist");
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/apollo-studio/i).should("exist");
    cy.findAllByText(/apollo-client/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L460
  it("Handles non-nullable errors thrown in deferred fragments", () => {
    cy.visit("/error-non-nullable-in-deferred-fragment");
    cy.findByText(/Error :\(/i).should("exist");
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/apollo-studio/i).should("exist");
    cy.findAllByText(/apollo-client/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L497
  it("Handles non-nullable errors thrown outside deferred fragments", () => {
    cy.visit("/error-non-nullable-outside-deferred-fragment");
    cy.findByText(/Error :\(/i).should("exist");
    cy.findAllByText(/apollo-federation/i).should("not.exist");
    cy.findAllByText(/apollo-studio/i).should("not.exist");
    cy.findAllByText(/apollo-client/i).should("not.exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L167
  it("Does not disable defer with null if argument", () => {
    cy.visit("/disable-defer-null-if");
    cy.findByText(/apollo-federation/i, { timeout: 1000 }).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L196
  it("Can defer fragments on the top level Query field", () => {
    cy.visit("/defer-top-level-query-field");
    cy.wait(2000);
    cy.findByText(/apollo-federation/i, { timeout: 1 }).should("not.exist");
    cy.wait(1500);
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L230
  it("Can defer fragments with errors on the top level Query field", () => {
    cy.visit("/error-top-level-query-field");
    cy.findByText(/Error :\(/i).should("exist");
    cy.findAllByText(/apollo-federation/i).should("not.exist");
    cy.findAllByText(/apollo-studio/i).should("not.exist");
    cy.findAllByText(/apollo-client/i).should("not.exist");
  });

  // router issue: https://github.com/apollographql/router/issues/1834
  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L529
  it("Handles async non-nullable errors thrown in deferred fragments", () => {
    cy.visit("/error-async-non-nullable-in-deferred-fragment");
    cy.findByText(/Error :\(/i).should("exist");
    cy.findAllByText(/apollo-federation/i).should("exist");
    cy.findAllByText(/apollo-studio/i).should("exist");
    cy.findAllByText(/apollo-client/i).should("exist");
  });

  it("Renders the entire response from a mutation containing @defer after the last chunk is returned", () => {
    cy.visit("/deferred-mutation");
    cy.findByText(/loading/i).should("not.exist");
    cy.findByRole('button', {name: /make payment/i}).click();
    cy.findByText(/loading/i).should("exist");
    cy.findByText(/"__typename":"MakePaymentResult"/i).should("exist");
  });
});
