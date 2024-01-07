/// <reference types="Cypress" />

describe("Login Page", () => {
  it("should render the logo image", () => {
    // to visit the login page
    cy.visit("/");

    // checks if there is one image in Login page
    cy.get(".roam-logo").should("have.length", 1);
  });

  it("should display - Dont have an account? Sign up to Roam", () => {
    // to visit the login page
    cy.visit("/");

    // checking if it contains the text
    cy.get(".text-with-link").contains("Don't have an account?");
    cy.get("p").contains("Sign up to Roam");
  });

  // LOGIN FUNCTIONALITY
  describe("Login functionality", () => {
    it("Logs in and redirects to home page", () => {
      cy.visit("/"); // Visit the login page

      // Enter email in the email input by targeting its class
      cy.get("[class*=MuiInputBase-input]").first().type("user1@gmail.com");

      // Enter password in the password input by targeting its class
      cy.get("[class*=MuiInputBase-input]").last().type("password");

      // Click the Login button
      cy.contains("Login").click();

      // Wait for redirection to the home page
      cy.url().should("include", "/home");
    });
  });
});
