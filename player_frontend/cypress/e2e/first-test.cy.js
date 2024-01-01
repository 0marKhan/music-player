/// <reference types="Cypress" />

describe("Login Page", () => {
  it("should render the logo image", () => {
    // to visit the login page
    cy.visit("http://localhost:3000/");

    // checks if there is one image in Login page
    cy.get("img").should("have.length", 1);
  });
});
