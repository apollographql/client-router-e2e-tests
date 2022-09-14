describe("defer tests", () => {
  it("happy path, non-deferred query", () => {
    cy.visit("/");
    cy.findByTestId("nonDeferred").within(() => {
      // the products are returned by our subgraph with a 5000ms delay
      // we'll wait just under 5 seconds to check that the
      // query is still pending in its entirety:
      // still in its loading state and without even the fast data
      // already rendered by the deferred query
      cy.findByText(/loading/i).should("exist");
      cy.wait(4500);
      cy.findByText(/apollo-federation/i).should("not.exist");
      cy.wait(2000);
      cy.findByText(/apollo-federation/i ).should("exist");
      cy.findByText(/variation: oss - platform/i ).should("exist");
    });
  });
  it("happy path, deferred query", () => {
    cy.visit("/");
    cy.findByTestId("deferred").within(() => {
      // for the deferred query, we can see the sku + id (fast fields)
      // already rendered
      // and after waiting >5s the deferred fields are present
      cy.findByText(/loading/i).should("exist");
      cy.findByText(/apollo-federation/i).should("exist");
      cy.wait(6000);
      cy.findByText(/variation: oss - platform/i).should("exist");
    });
  })
});
