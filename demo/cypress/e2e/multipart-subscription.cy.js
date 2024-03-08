describe("subscriptions over multipart http tests", () => {
  it("Can execute subscription", () => {
    cy.visit("/multipart-subscription");
    // the products are returned by our subgraph with a 2000ms delay
    // we'll wait just under 2000ms to check that the
    // query is still pending in its entirety (since @defer is absent)
    cy.findByText(/loading/i).should("exist");
    cy.wait(1000);
    cy.findByText(/Countdown: 9/i).should("exist");
    cy.wait(1000);
    cy.findByText(/Countdown: 8/i).should("exist");
  });
});
