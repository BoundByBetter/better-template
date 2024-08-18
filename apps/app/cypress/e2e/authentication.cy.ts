describe('authentication', () => {
  it('log in and log out', () => {
    cy.visit('/');
    cy.get('[data-testid="app-log-in"]').should('exist');
    cy.get('button').contains('Microsoft').should('exist');
    cy.get('button').contains('Google').should('exist');
    cy.get('button').contains('Facebook').should('exist');
    // Log in and out using Microsoft.
    cy.get('button').contains('Microsoft').click();
    cy.get('[data-testid="home-screen"]').should('exist');
    cy.get('[data-testid="tab-settings"]').click();
    cy.get('button').contains('Sign Out').click();
    cy.get('[data-testid="app-log-in"]').should('exist');
    // Log in and out using Google.
    cy.get('button').contains('Google').click();
    cy.get('[data-testid="home-screen"]').should('exist');
    cy.get('[data-testid="tab-settings"]').click();
    cy.get('button').contains('Sign Out').click();
    cy.get('[data-testid="app-log-in"]').should('exist');
    // Log in and out using Facebook.
    cy.get('button').contains('Google').click();
    cy.get('[data-testid="home-screen"]').should('exist');
    cy.get('[data-testid="tab-settings"]').click();
    cy.get('button').contains('Sign Out').click();
    cy.get('[data-testid="app-log-in"]').should('exist');
  });
});
