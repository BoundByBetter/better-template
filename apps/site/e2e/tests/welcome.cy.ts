describe('welcome page', () => {
  it('should display the welcome page as the initial page', () => {
    cy.visit('/');
    cy.get('[data-testid="welcome-screen"]').should('exist');
    cy.contains('Welcome to the site!').should('be.visible');
  });
});
