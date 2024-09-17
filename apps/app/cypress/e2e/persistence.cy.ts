/// <reference types="cypress" />

describe('persistence', () => {
  beforeEach(() => {
    // Nothing here yet.
  });

  it('posts are persisted across sessions', () => {
    // We'll store our item text in a variable so we can reuse it
    cy.clearLocalStorage();
    cy.login();

    const newPost = 'This is a test';
    cy.get('[data-testid=new-post-name]').type(`${newPost}{enter}`);

    cy.get('[data-testid=post-item]')
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newPost);
    // Close browser and then reopen it to verify post still visible.
    cy.reload();
    // Wait for up to 10 seconds for the post to appear.
    cy.get('[data-testid=post-item]', { timeout: 10000 })
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newPost);
  });
});
