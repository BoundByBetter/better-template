describe('log-in', () => {
  it('should display when the user is not logged in and allow them to log in', () => {
    cy.visit('/');
    cy.get('[data-testid="app-log-in"]').should('exist');
    cy.get('button').contains('Microsoft').should('exist');
    cy.get('button').contains('Google').should('exist');
    cy.get('button').contains('Facebook').should('exist');
    cy.get('button').contains('Microsoft').click();
    cy.get('posts-list').should('exist');
  });
});
