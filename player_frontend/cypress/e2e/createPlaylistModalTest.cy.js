/// <reference types="Cypress" />

// CHECKING IF THE MODAL POPS UP
describe("create playlist modal", () => {
  it("opens the modal when clicking on create playlist", () => {
    cy.visit("/"); // Visit the login page

    // Enter email in the email input by targeting its class
    cy.get("[class*=MuiInputBase-input]").first().type("user1@gmail.com");

    // Enter password in the password input by targeting its class
    cy.get("[class*=MuiInputBase-input]").last().type("password");

    // Click the Login button
    cy.contains("Login").click();

    // Wait for redirection to the home page
    cy.url().should("include", "/home");

    // Check if the 'New Playlist' link exists in the side navigation and click it
    cy.contains("New Playlist").click();

    // Assert that the modal for creating a new playlist opens
    cy.get(".modal-background").should("be.visible");
  });

  it("creates a new playlist when you enter a playlist name and URL", () => {
    cy.visit("/"); // Visit the login page

    // Enter email in the email input by targeting its class
    cy.get("[class*=MuiInputBase-input]").first().type("user1@gmail.com");

    // Enter password in the password input by targeting its class
    cy.get("[class*=MuiInputBase-input]").last().type("password");

    // Click the Login button
    cy.contains("Login").click();

    // Wait for redirection to the home page
    cy.url().should("include", "/home");

    // Check if the 'New Playlist' link exists in the side navigation and click it
    cy.contains("New Playlist").click();

    // Assert that the modal for creating a new playlist opens
    cy.get(".modal-background").should("be.visible");
    // Click the 'Create Playlist' button
    cy.get(".create-playlist-button").click();

    // Type text into the Playlist Name input by targeting its value directly
    cy.get('input[value=""]').eq(0).type("CypressTestPlaylist");

    cy.get('input[type="text"]')
      .eq(1)
      .type(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZ41lkJNNdulkWmdPRq6EOlM2sEI08i59jA&usqp=CAU"
      );

    // Click the 'CREATE PLAYLIST' button
    cy.contains("CREATE PLAYLIST").click();

    // Wait for the playlist card to appear in the UI
    cy.contains("CypressTestPlaylist").should("be.visible");
  });
});
