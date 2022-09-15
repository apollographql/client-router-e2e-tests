describe("@defer tests", () => {
  it("Can execute query without @defer", () => {
    cy.visit("/non-deferred");
    // the products are returned by our subgraph with a 2000ms delay
    // we'll wait just under 2000ms to check that the
    // query is still pending in its entirety (since @defer is absent)
    cy.findByText(/loading/i).should("exist");
    cy.wait(2000);
    cy.findByText(/apollo-federation/i).should("not.exist");
    cy.wait(1500);
    cy.findByText(/apollo-federation/i).should("exist");
    cy.findByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L106
  it("Can defer fragments containing scalar types", () => {
    cy.visit("/deferred");
    // for the deferred query, we can see the sku + id (fast fields)
    // already rendered...
    // and after waiting >2s the deferred fields are present
    cy.findByText(/loading/i).should("exist");
    cy.findByText(/apollo-federation/i).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L144
  it("Can disable defer using if argument", () => {
    cy.visit("/disable-defer");
    // defer is disabled so entire query should pend for >2s
    cy.findByText(/loading/i).should("exist");
    cy.wait(2000);
    cy.findByText(/apollo-federation/i).should("not.exist");
    cy.wait(1500);
    cy.findByText(/apollo-federation/i).should("exist");
    cy.findByText(/variation: oss - platform/i).should("exist");
  });

  // currently failing
  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L167
  it.skip("Does not disable defer with null if argument", () => {
    cy.visit("/disable-defer-null-if");
    // for the deferred query, we can see the sku + id (fast fields)
    // already rendered...
    // and after waiting >2s the deferred fields are present
    // for the deferred query, we can see the sku + id (fast fields)
    // already rendered...
    // and after waiting >2s the deferred fields are present
    cy.findByText(/loading/i).should("exist");
    cy.findByText(/apollo-federation/i).should("exist");
    cy.findByText(/variation: oss - platform/i).should("not.exist");
    cy.wait(3000);
    cy.findByText(/variation: oss - platform/i).should("exist");
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L196
  it.skip("Can defer fragments on the top level Query field", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L230
  it.skip("Can defer fragments with errors on the top level Query field", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L271
  it.skip("Can defer a fragment within an already deferred fragment", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L321
  it.skip("Can defer a fragment that is also not deferred, deferred fragment is first", () => {
    // TODO
  });
  
  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L359
  it.skip("Can defer a fragment that is also not deferred, non-deferred fragment is first", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L398
  it.skip("Can defer an inline fragment", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L424
  it.skip("Handles errors thrown in deferred fragments", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L460
  it.skip("Handles non-nullable errors thrown in deferred fragments", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L497
  it.skip("Handles non-nullable errors thrown outside deferred fragments", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L529
  it.skip("Handles async non-nullable errors thrown in deferred fragments", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L566
  it.skip("Returns payloads in correct order", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L566
  it.skip("Returns payloads from synchronous data in correct order", () => {
    // TODO
  });

  // TODO: do we need these last 2?
  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L660
  it.skip("original execute function throws error if anything is deferred and everything else is sync", () => {
    // TODO
  });

  // https://github.com/graphql/graphql-js/blob/a24a9f35b876bdd0d5050eca34d3020bd0db9a29/src/execution/__tests__/defer-test.ts#L677
  it.skip("original execute function resolves to error if anything is deferred and something else is async", () => {
    // TODO
  });
});
